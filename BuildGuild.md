# Algorithm of AdvancePay
---
1. **Infrastructure & Core Services**
   1.1. Provision cloud environment, database, message queue, and CI/CD pipelines
   1.2. Implement secure secrets management, logging, and basic monitoring

2. **Authentication & User Management**
   2.1. User model + roles (Employer, Employee, LP)
   2.2. JWT-based auth endpoints (`/auth/register`, `/auth/login`)
   2.3. Password reset & session management

3. **KYC & Bank-Linking**
   3.1. Employee KYC data model (NIN, BVN)
   3.2. Bank-link service interface (stubbed initially)
   3.3. API endpoints for `POST /employees/:id/kyc` and `POST /employees/:id/bank-link`

4. **Employer Onboarding & Tier Logic**
   4.1. Employer profile model + payroll data stub
   4.2. Tier-calculation service (New/API-Verified/Trusted rules)
   4.3. Endpoints:

   * `POST /employers` (manual CSV upload stub)
   * `POST /employers/:id/setup-api` (Mono/Okra stub)
   * `GET /employers/:id/tiers`

5. **Payroll Ingestion**
   5.1. CSV parser integration (manual mode)
   5.2. Bank-history client integration (Mono/Okra)
   5.3. Persist verified salary records for employees

6. **Core Business Calculations**
   6.1. Earned-salary computation module
   6.2. Advance-limit calculator (10/30/50% based on tier)
   6.3. 3% service-fee calculator

7. **Liquidity Pool Backend**
   7.1. LiquidityPool model and accounting (TVL, utilization)
   7.2. LP-stake service: deposit, lock-up logic, LP-token ledger
   7.3. APY-calculation service (utilization + lock-up bonus)

8. **Advance Request Workflow**
   8.1. Endpoint `POST /employees/:id/advance`
   8.2. Validation pipeline: KYC, bank-link, earned salary, limit, pool balance
   8.3. Approval branch: manual vs. automatic
   8.4. Event emit “advance\_requested”

9. **Smart-Contract Gateway Integration**
   9.1. AdvanceContract interface stub
   9.2. LiquidityPool contract interface stub
   9.3. ReserveFund contract interface stub

10. **Disbursement & Off-Ramp Service**
    10.1. Worker listening to “advance\_requested” → call smart contract → reserve funds
    10.2. Bank-payout client (2–5 min transfer)
    10.3. Update advance status to “Disbursed”

11. **Automated Repayment Processing**
    11.1. Salary-deposit webhook `POST /webhooks/salary`
    11.2. Worker to match deposit → deduct principal + fee → transfer net to employee
    11.3. Mark repayment complete, update employee profile/credit, adjust employer tier

12. **Reserve Fund & Revenue Distribution**
    12.1. Fee-collection service (capture 3% fee)
    12.2. Disburse fee shares: LPs (65–70%), operations (25–30%), reserve (5–10%)
    12.3. ReserveFund auto-payout logic on default thresholds

13. **Risk Management & Automated Triggers**
    13.1. Real-time monitoring of default rates, pool utilization, volatility metrics
    13.2. Automated tier-downgrade/upgrade service
    13.3. Pool-APY adjustment service and emergency top-up hooks

14. **Frontend Skeleton & Basic Flows**
    14.1. Authentication screens
    14.2. Stubs for Employee, Employer, LP dashboards
    14.3. Wire up REST calls to core endpoints

15. **Incremental Frontend Enhancements**
    15.1. Complete Employee flow: invite, KYC, bank-link, dashboard, advance request, status, repayments
    15.2. Complete Employer flow: payroll upload/API, tier/risk view, manual approvals
    15.3. Complete LP flow: wallet-connect, metrics overview, stake/withdraw, compound UI

16. **Testing & Hardening**
    16.1. Expand TDD suites: unit tests for services, integration tests for endpoints, mocks for all external integrations
    16.2. Load tests on pooled services
    16.3. Security audit of KYC data, smart-contract calls, and payment flows

17. **Monitoring, Alerting & Documentation**
    17.1. Dashboards (Prometheus/Grafana) for key metrics
    17.2. Alert rules (Slack/email) for threshold breaches
    17.3. API documentation (OpenAPI/Swagger) and runbooks for operational incidents

---


---

## 1. Employer Onboarding & Tier Assignment

1. **Create Employer Profile**

   * **New Employer**:

     * Upload payroll CSV via UI
     * → Tier = **New** (High risk)
   * **API-Verified Employer**:

     * Enter Mono/Okra API credentials
     * Fetch 6 months’ bank history
     * → Tier = **API-Verified** (Medium risk)
   * **Platform-Trusted Employer**:

     * Must have ≥ 3 months of on-platform payroll verified
     * → Tier = **Trusted** (Low risk)

2. **Tier Characteristics**

   | Tier             | Advance Limit | Default Risk | LP APY |
   | ---------------- | ------------- | ------------ | ------ |
   | New              | 10%           | 40–60%       | 25–30% |
   | API-Verified     | 30%           | 10–20%       | 20–25% |
   | Platform-Trusted | 50%           | 2–5%         | 15–20% |

3. **Dynamic Tier Adjustment**

   * Monitor employer’s default rate.
   * If defaults exceed threshold → downgrade tier, reduce limits, require manual approvals.
   * If performance improves → upgrade after re-verification.

---

## 2. Employee Advance (Loan) Flow

1. **Invitation & Setup**

   * Employer invites employee.
   * Employee completes KYC (NIN & BVN) and links Nigerian bank account.

2. **Advance Request**

   * System computes **earned salary** = Monthly Salary × (Days Worked/Total Working Days).
   * Available limit = tier-based % of earned salary.
   * Employee enters desired advance ≤ limit, sees 3% fee, and confirms.

3. **Approval Branch**

   * **New Employer** → **Manual Approval**
   * **API-Verified / Trusted** → **Automatic Approval**

4. **Liquidity Check**

   * Confirm pool has sufficient stablecoins.
   * If insufficient → request is denied or queued; notify employee.

5. **Advance Execution**

   * Backend calls AdvanceContract → reserves advance + fee in pool.
   * Off-chain “off-ramp” service pushes net funds to employee’s bank in 2–5 minutes.
   * Record request status = “Approved & Disbursed.”

---

## 3. Automated Repayment Flow

1. **Salary Deposit**

   * On next payday, employer pays full salary into platform’s bank account.

2. **Reconciliation & Deduction**

   * Worker service detects incoming deposit.
   * Auto-deducts principal + 3% fee.
   * Transfers remainder to employee’s bank.

3. **Completion & Update**

   * Mark advance request “Repaid.”
   * Update employee profile (advance history, credit-score boost).
   * Potentially adjust employer tier based on repayment performance.

---

## 4. Liquidity Provision & LP Interaction

1. **Onboarding**

   * Web3 user connects wallet (e.g., MetaMask).

2. **Due Diligence**

   * Fetch TVL, historical APY, default rates, reserve-fund status.

3. **Staking**

   * Choose stablecoin (USDT/USDC/DAI) + amount + lock-up (none/3 mo/6 mo).
   * Backend mints LP tokens representing stake.

4. **Yield Accrual**

   * APY computed from pool utilization, tier demand, lock-up bonus.
   * Rewards accumulate on-chain/off-chain.

5. **Exit Options**

   * **Compound**: reinvest accrued yield.
   * **Withdraw**: burn LP tokens, trigger LiquidityPool contract to return principal + yield (respecting lock-up).
   * Optionally list LP tokens on a DEX for secondary liquidity.

---

## 5. Reserve Fund & Revenue Distribution

1. **Fee Stream**

   * 3% service fee on each advance is collected.

2. **Distribution**

   * **65–70%** → Liquidity Providers
   * **25–30%** → Platform operations
   * **5–10%** → Reserve Fund

3. **Reserve Utilization**

   * If monthly defaults > set threshold → trigger ReserveFund contract to cover shortfalls.
   * Replenish reserve from future fees.

---

## 6. Risk Management & Automated Triggers

1. **Default Risk Diversification**

   * Enforce per-employer advance caps.
   * Dynamic tier limits minimize concentration.

2. **Liquidity Pool Health**

   * Real-time monitoring of pool utilization.
   * Auto-adjust APY to incentivize/slow down inflows.
   * Usage caps and multi-stablecoin support hedge volatility.

3. **Automated Responses**

   * **High Employer Defaults** → auto-downgrade tier, reduce limits, require manual approvals.
   * **Pool Depletion Risk** → increase LP rewards, trigger emergency partner top-up.
   * **Economic Volatility** → dynamic fee adjustments, shift stablecoin allocations.

4. **Alerting & Monitoring**

   * Dashboards track default rates, liquidity, fee revenue, and on-chain events.
   * Set alerts to notify ops team on breaches.

---

This mapping covers **all** conceivable flows—invitation, KYC, advance request/approval, disbursement, repayment, staking, yield, reserve usage, and risk rules—exactly as specified in our conversation.
