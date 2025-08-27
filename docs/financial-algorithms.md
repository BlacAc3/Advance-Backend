# AdvancePay Financial Algorithms & Calculations Documentation

This document provides a comprehensive overview of all endpoints in the AdvancePay backend that involve financial calculations and algorithms. It explains the logic, formulas, and business rules behind each calculation, making it easy for new developers to understand the financial scope and reasoning within the application.

---

## Table of Contents

1. [Employee Advance Calculations](#employee-advance-calculations)
    - [Get Advance Status](#get-advance-status)
    - [Request Advance](#request-advance)
    - [Advance History](#advance-history)
    - [Cancel Advance Request](#cancel-advance-request)
2. [Employer Advance Management](#employer-advance-management)
    - [Approve/Reject Advance](#approve-reject-advance)
    - [Advance Statistics](#advance-statistics)
    - [Update Advance Settings](#update-advance-settings)
3. [Internal System Financial Algorithms](#internal-system-financial-algorithms)
    - [Payroll Processing & Advance Repayment](#payroll-processing--advance-repayment)
    - [Risk Adjustments](#risk-adjustments)
    - [Tier Upgrades](#tier-upgrades)
    - [Defaulted Advances Processing](#defaulted-advances-processing)
4. [Payroll Extraction (Data, not Calculation)](#payroll-extraction-data-not-calculation)

---

## Employee Advance Calculations

### 1. Get Advance Status

**Endpoint:** `GET /api/v1/employee/advance/status`

**Purpose:**  
Calculates and returns the employee's current financial status regarding salary, advances, and eligibility.

**Key Calculations:**

- **Days Worked:**  
  ```js
  daysWorked = floor((today - startDate) / (1000 * 60 * 60 * 24))
  ```
  - `startDate` is either the employee's start date or registration date.

- **Earned To Date:**  
  ```js
  dailySalary = monthlySalary / 30
  earnedToDate = dailySalary * currentMonthDay
  ```
  - Assumes a 30-day month.

- **Available Advance:**  
  ```js
  availableAdvance = (earnedToDate * availableAdvancePercentage / 100) - currentAdvanceBalance
  ```
  - `availableAdvancePercentage` is determined by employer tier (NEW: 10%, API_VERIFIED: 30%, PLATFORM_TRUSTED: 50% or employer-set limit).
  - `currentAdvanceBalance` is the sum of outstanding advances.

- **Eligibility for Daily Advance:**  
  - Employee must have worked at least 15 days and employer must be verified.

- **Service Fee Percentage:**  
  - Default is 3%, may increase for larger advances (see below).

- **Next Salary Date:**  
  - Last day of the current month.

**Returned Fields:**  
- `monthlySalary`, `daysWorked`, `earnedToDate`, `availableAdvance`, `availableAdvancePercentage`, `employerTier`, `currentAdvanceBalance`, `eligibleForDailyAdvance`, `serviceFeePercentage`, `nextSalaryDate`

---

### 2. Request Advance

**Endpoint:** `POST /api/v1/employee/advance/request`

**Purpose:**  
Processes an employee's request for a salary advance, enforcing business rules and calculating fees.

**Key Calculations:**

- **Eligibility:**  
  - Must have worked at least 15 days.
  - Must have completed KYC and accepted terms.

- **Maximum Available Advance:**  
  ```js
  maxAvailableAdvance = (earnedToDate * availableAdvancePercentage / 100) - currentAdvanceBalance
  ```
  - Same as above.

- **Requested Amount Validation:**  
  - Requested amount must not exceed `maxAvailableAdvance`.

- **Service Fee Calculation:**  
  - Default: 3%
  - If requested amount exceeds daily earnings:
    ```js
    serviceFeePercentage = min(6, 3 + (requestedAmount / monthlySalary * 100) * 0.1)
    ```
    - Capped at 6%.

- **Service Fee & Net Amount:**  
  ```js
  serviceFee = requestedAmount * serviceFeePercentage / 100
  netAmount = requestedAmount - serviceFee
  repaymentAmount = requestedAmount
  ```

- **Repayment Date:**  
  - Last day of the current month.

- **Liquidity Pool Check:**  
  - Ensures employer's liquidity pool has enough funds:
    ```js
    availableLiquidity = totalPoolAmount - totalOutstandingAdvances
    ```
    - If insufficient, request is rejected.

- **Pool Utilization:**  
  ```js
  poolUtilization = ((totalOutstandingAdvances + requestedAmount) / totalPoolAmount) * 100
  ```

- **Risk Score:**  
  - Based on employee credit score and employer tier:
    ```js
    riskScore = round(baseCreditScore * tierMultiplier)
    ```
    - `tierMultiplier`: PLATFORM_TRUSTED=1.2, API_VERIFIED=1.1, NEW=1.0

- **Advance Status:**  
  - If employer requires approval: `PENDING_EMPLOYER_APPROVAL`
  - Else: `APPROVED` (and auto-disbursed)

---

### 3. Advance History

**Endpoint:** `GET /api/v1/employee/advance/history`

**Purpose:**  
Returns a paginated list of all advances for the employee, including financial details.

**Key Calculations:**  
- No new calculations; returns stored values for each advance:
  - `amount`, `serviceFee`, `netAmount`, `repaymentAmount`, `status`, etc.

---

### 4. Cancel Advance Request

**Endpoint:** `DELETE /api/v1/employee/advance/:advanceId/cancel`

**Purpose:**  
Allows an employee to cancel a pending advance request.

**Key Calculations:**

- **Eligibility:**  
  - Only advances with status `PENDING` or `PENDING_EMPLOYER_APPROVAL` can be cancelled.

- **Balance Update:**  
  ```js
  currentAdvanceBalance = currentAdvanceBalance - advance.amount
  ```
  - Updates employee's outstanding advance balance.

---

## Employer Advance Management

### 1. Approve/Reject Advance

**Endpoints:**  
- `POST /api/v1/employer/advance/:requestId/approve`
- `POST /api/v1/employer/advance/:requestId/reject`

**Purpose:**  
Allows employers to approve or reject employee advance requests.

**Key Calculations (Approval):**

- **Liquidity Pool Check:**  
  - Same as above; ensures enough funds.

- **Advance Status Update:**  
  - On approval: `APPROVED` → `DISBURSED`
  - On rejection: `REJECTED`

- **Employer Statistics:**  
  - `totalAdvancesProcessed` incremented on approval.

- **Employee Balance Update (Rejection):**  
  - On rejection, the advance amount is subtracted from the employee's `currentAdvanceBalance`.

---

### 2. Advance Statistics

**Endpoint:** `GET /api/v1/employer/advances/statistics`

**Purpose:**  
Returns aggregate statistics for employer advances.

**Key Calculations:**

- **Counts:**  
  - Total, pending, approved, disbursed, repaid, defaulted advances.

- **Amounts:**  
  - Total advanced, total repaid, total defaulted.

- **Default Rate:**  
  ```js
  defaultRate = totalAdvances > 0 ? (defaultedAdvances / totalAdvances) * 100 : 0
  ```

- **Active Employees:**  
  - Employees with `currentAdvanceBalance > 0`.

---

### 3. Update Advance Settings

**Endpoint:** `PUT /api/v1/employer/advances/settings`

**Purpose:**  
Allows employer to update `autoApproveAdvances` and `advancePercentageLimit`.

**Key Calculations:**

- **Advance Percentage Limit Validation:**  
  - Must be within allowed range for employer tier:
    - NEW: 0–10%
    - API_VERIFIED: 0–30%
    - PLATFORM_TRUSTED: 0–50%

---

## Internal System Financial Algorithms

### 1. Payroll Processing & Advance Repayment

**Endpoint:** `POST /api/v1/internal/payroll/process-payment`

**Purpose:**  
Processes employer payroll, automatically deducting outstanding advances from salaries.

**Key Calculations:**

- **Outstanding Advances:**  
  - For each employee, sum all advances with status `DISBURSED` or `PAID`.

- **Total Deduction:**  
  ```js
  totalDeduction = sum(repaymentAmount for each outstanding advance)
  ```

- **Net Salary:**  
  ```js
  netSalary = grossSalary - totalDeduction
  ```

- **Advance Status Update:**  
  - All repaid advances are marked as `REPAID`.

- **Employee Credit Score Update:**  
  - For each repaid advance:
    ```js
    creditScore = min(850, currentCreditScore + 10 * advancesRepaid)
    ```

- **Employer Statistics:**  
  - `totalAdvancesProcessed` incremented by number of advances repaid.

---

### 2. Risk Adjustments

**Endpoint:** `POST /api/v1/internal/risk/adjustments`

**Purpose:**  
Dynamically adjusts risk parameters based on platform metrics.

**Adjustment Types:**

- **EMPLOYER_DEFAULT_RATE:**  
  - If employer's default rate > 5%:
    - Reduce `advancePercentageLimit` by 5% (min 5%).
    - Set `autoApproveAdvances` to `false`.
    - If default rate > 10%, downgrade tier to `NEW`.

- **POOL_UTILIZATION:**  
  - If overall pool utilization > 85%:
    - Reduce all verified employers' `advancePercentageLimit` by 20% (min 5%).

- **MONTHLY_DEFAULTS:**  
  - If monthly default volume > 2% of total advanced:
    - Deploy reserve fund to cover 50% of defaults.
    - Pause advances for high-risk employers (`defaultRate >= 5%`).

---

### 3. Tier Upgrades

**Endpoint:** `POST /api/v1/internal/risk/tier-upgrade`

**Purpose:**  
Automatically upgrades employer tiers based on historical performance.

**Key Calculations:**

- **Eligibility:**  
  - 3+ months on platform, isVerified.

- **Performance Metrics:**  
  - `repaymentRate = (repaidAdvances / totalAdvances) * 100`
  - `defaultRate = (defaultedAdvances / totalAdvances) * 100`

- **Upgrade Rules:**  
  - NEW → API_VERIFIED: bank history verified, `repaymentRate > 95%`, `defaultRate < 2%`
  - API_VERIFIED → PLATFORM_TRUSTED: 6+ months, `repaymentRate > 98%`, `defaultRate < 1%`, `totalAdvances >= 50`

- **Tier Effects:**  
  - Upgrades increase `advancePercentageLimit` and may enable `autoApproveAdvances`.

---

### 4. Defaulted Advances Processing

**Endpoint:** `POST /api/v1/internal/advances/process-defaults`

**Purpose:**  
Marks overdue advances as defaulted and updates credit scores.

**Key Calculations:**

- **Defaulted Advances:**  
  - Advances with `dueDate < today` and status `DISBURSED` or `PAID`.

- **Status Update:**  
  - Mark as `DEFAULTED`.

- **Employee Credit Score:**  
  - Reduce by 50 points per default (min 300).

- **Employer Default Rate:**  
  - Recalculated as:
    ```js
    defaultRate = totalAdvances > 0 ? (defaultedCount / totalAdvances) * 100 : 0
    ```

---

## Payroll Extraction (Data, not Calculation)

**Endpoints:**  
- `POST /api/v1/employer/payroll/upload`
- `POST /api/v1/employer/extract`
- `POST /api/v1/employer/bulk-extract`

**Purpose:**  
Extracts payroll data from uploaded files (CSV, Excel, PDF) for further processing.  
**Note:** These endpoints do not perform financial calculations but parse and structure payroll data for use in other calculations.

---

## Summary

The AdvancePay backend implements robust, risk-aware financial algorithms for salary advances, employer liquidity, and risk management. All calculations are designed to:

- Protect the platform and liquidity providers from excessive risk.
- Ensure employees can only access a safe, earned portion of their salary.
- Dynamically adjust to employer and platform performance.
- Provide transparency and auditability for all financial operations.

For any new developer, understanding these calculations is key to maintaining, extending, or integrating with the AdvancePay platform.

---