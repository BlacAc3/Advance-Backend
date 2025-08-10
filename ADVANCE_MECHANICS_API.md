# Employee Advance Pay Mechanics API Documentation

## Overview

This document describes the API endpoints for the Employee Advance Pay Mechanics system, which enables employees to request salary advances and employers to manage these requests. The system includes automatic risk assessment, tier-based limits, and automated repayment processing.

## Base URL

```
https://api.advancepay.com/api/v1
```

## Authentication

All endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Employer Tiers

The system uses a three-tier classification for employers:

- **NEW**: New employers with basic verification (10% advance limit)
- **API_VERIFIED**: Employers with verified bank history (30% advance limit)
- **PLATFORM_TRUSTED**: Long-term employers with excellent track record (50% advance limit)

---

## Employee Endpoints

### 1. Get Advance Status

**Endpoint:** `GET /api/v1/employee/advance/status`

**Description:** Retrieves the employee's current earned salary status and available advance amount. This endpoint is crucial for the "Daily Advance (After 15 Days Work)" feature.

**Response:**
```json
{
  "monthlySalary": "500000",
  "daysWorked": 18,
  "earnedToDate": "300000",
  "availableAdvance": "30000",
  "availableAdvancePercentage": 10,
  "employerTier": "NEW",
  "currentAdvanceBalance": "0",
  "eligibleForDailyAdvance": true,
  "serviceFeePercentage": 3,
  "nextSalaryDate": "2024-01-31T00:00:00Z"
}
```

**Eligibility Requirements:**
- Employee must have completed at least 15 days of work
- Employer must be verified
- Employee must have completed KYC and accepted terms

---

### 2. Request Advance

**Endpoint:** `POST /api/v1/employee/advance/request`

**Description:** Submit a request for an advance on earned salary.

**Request Body:**
```json
{
  "advanceAmount": 25000
}
```

**Response:**
```json
{
  "advanceId": "uuid-string",
  "advanceAmount": "25000",
  "serviceFee": "750",
  "serviceFeePercentage": 3,
  "netAmount": "24250",
  "repaymentAmount": "25000",
  "repaymentDate": "2024-01-31T00:00:00Z",
  "status": "PENDING_EMPLOYER_APPROVAL",
  "requiresEmployerApproval": true,
  "message": "Advance request submitted and pending employer approval"
}
```

**Validation Rules:**
- Amount must not exceed available advance limit
- Service fee: 3% for standard amounts, 3-6% for amounts exceeding daily limit
- Auto-approval for API_VERIFIED and PLATFORM_TRUSTED employers
- Manual approval required for NEW employers

---

### 3. Get Advance History

**Endpoint:** `GET /api/v1/employee/advance/history`

**Description:** Retrieve the employee's advance request history.

**Query Parameters:**
- `status` (optional): Filter by status (PENDING, APPROVED, DISBURSED, REPAID, etc.)
- `limit` (optional): Number of records to return (default: 10)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "advances": [
    {
      "id": "uuid-string",
      "amount": "25000",
      "serviceFee": "750",
      "netAmount": "24250",
      "repaymentAmount": "25000",
      "requestDate": "2024-01-15T10:00:00Z",
      "approvalDate": "2024-01-15T10:30:00Z",
      "disbursementDate": "2024-01-15T10:35:00Z",
      "repaymentDate": "2024-01-31T00:00:00Z",
      "dueDate": "2024-01-31T00:00:00Z",
      "status": "DISBURSED"
    }
  ],
  "total": 5,
  "limit": 10,
  "offset": 0
}
```

---

### 4. Cancel Advance Request

**Endpoint:** `DELETE /api/v1/employee/advance/:advanceId/cancel`

**Description:** Cancel a pending advance request.

**Response:**
```json
{
  "message": "Advance request cancelled successfully"
}
```

**Restrictions:**
- Can only cancel requests with status PENDING or PENDING_EMPLOYER_APPROVAL

---

## Employer Endpoints

### 1. Get Pending Advances

**Endpoint:** `GET /api/v1/employer/advances/pending`

**Description:** View all pending advance requests from employees that require approval.

**Response:**
```json
{
  "data": [
    {
      "id": "uuid-string",
      "employeeId": "employee-uuid",
      "employeeName": "John Doe",
      "employeeEmail": "john@example.com",
      "amount": "25000",
      "serviceFee": "750",
      "netAmount": "24250",
      "repaymentAmount": "25000",
      "earnedToDate": "300000",
      "availableAdvance": "30000",
      "requestDate": "2024-01-15T10:00:00Z",
      "dueDate": "2024-01-31T00:00:00Z",
      "status": "PENDING_EMPLOYER_APPROVAL",
      "riskScore": 650,
      "creditScore": 600,
      "daysWorked": 18,
      "totalAdvancesTaken": 2,
      "totalAdvancesRepaid": 2
    }
  ]
}
```

---

### 2. Approve Advance Request

**Endpoint:** `POST /api/v1/employer/advance/:requestId/approve`

**Description:** Approve a pending advance request. Triggers automatic disbursement.

**Request Body (optional):**
```json
{
  "approvalNotes": "Approved based on good standing"
}
```

**Response:**
```json
{
  "advanceId": "uuid-string",
  "status": "DISBURSED",
  "approvalDate": "2024-01-15T10:30:00Z",
  "disbursementDate": "2024-01-15T10:35:00Z",
  "message": "Advance approved successfully. Funds will be disbursed within 2-5 minutes."
}
```

**Process:**
1. Validates liquidity pool availability
2. Updates advance status to APPROVED
3. Triggers off-ramp process for bank transfer
4. Updates to DISBURSED status upon successful transfer

---

### 3. Reject Advance Request

**Endpoint:** `POST /api/v1/employer/advance/:requestId/reject`

**Description:** Reject a pending advance request.

**Request Body:**
```json
{
  "rejectionReason": "Insufficient work history"
}
```

**Response:**
```json
{
  "advanceId": "uuid-string",
  "status": "REJECTED",
  "rejectionReason": "Insufficient work history",
  "message": "Advance request rejected successfully"
}
```

---

### 4. Get All Advances

**Endpoint:** `GET /api/v1/employer/advances/all`

**Description:** Retrieve all advance requests for the employer's employees.

**Query Parameters:**
- `status` (optional): Filter by status
- `employeeId` (optional): Filter by specific employee
- `limit` (optional): Number of records (default: 20)
- `offset` (optional): Pagination offset

**Response:**
```json
{
  "advances": [...],
  "total": 150,
  "limit": 20,
  "offset": 0
}
```

---

### 5. Get Advance Statistics

**Endpoint:** `GET /api/v1/employer/advances/statistics`

**Description:** Get comprehensive statistics about advances for the employer.

**Response:**
```json
{
  "summary": {
    "totalAdvances": 150,
    "pendingAdvances": 5,
    "approvedAdvances": 10,
    "disbursedAdvances": 100,
    "repaidAdvances": 130,
    "defaultedAdvances": 5,
    "activeEmployees": 25
  },
  "amounts": {
    "totalAdvanceAmount": "3750000",
    "totalRepaidAmount": "3250000",
    "totalDefaultedAmount": "125000"
  },
  "metrics": {
    "defaultRate": "3.33",
    "employerTier": "API_VERIFIED",
    "advancePercentageLimit": 30,
    "autoApproveAdvances": true,
    "totalAdvancesProcessed": 150
  }
}
```

---

### 6. Update Advance Settings

**Endpoint:** `PUT /api/v1/employer/advances/settings`

**Description:** Update employer's advance configuration settings.

**Request Body:**
```json
{
  "autoApproveAdvances": true,
  "advancePercentageLimit": 25
}
```

**Response:**
```json
{
  "autoApproveAdvances": true,
  "advancePercentageLimit": 25,
  "tier": "API_VERIFIED",
  "message": "Advance settings updated successfully"
}
```

**Validation:**
- Advance percentage limit cannot exceed tier maximum (10%, 30%, or 50%)

---

### 7. Setup API Integration

**Endpoint:** `POST /api/v1/employer/setup-api-integration`

**Description:** Setup bank API integration for automatic verification and tier upgrade.

**Request Body:**
```json
{
  "apiProvider": "mono",
  "apiKey": "your-api-key",
  "accountId": "account-123"
}
```

**Response:**
```json
{
  "employerId": "uuid-string",
  "companyName": "ABC Company Ltd",
  "tier": "API_VERIFIED",
  "advancePercentageLimit": 30,
  "autoApproveAdvances": true,
  "bankHistoryVerified": true,
  "message": "API integration and bank history verification successful"
}
```

**Requirements:**
- Minimum 6 months bank history
- At least 100 transactions
- Active monthly credits

---

## Internal System Endpoints (Admin Only)

### 1. Process Payroll Payment

**Endpoint:** `POST /api/v1/internal/payroll/process-payment`

**Description:** Process employer payroll payment and automatically deduct outstanding advances.

**Request Body:**
```json
{
  "employerId": "employer-uuid",
  "payrollData": [
    {
      "employeeId": "employee-uuid",
      "salary": "500000",
      "paymentDate": "2024-01-31"
    }
  ],
  "totalAmount": "5000000",
  "transactionHash": "0x123..."
}
```

**Response:**
```json
{
  "employerId": "employer-uuid",
  "processedPayments": [
    {
      "employeeId": "employee-uuid",
      "grossSalary": "500000",
      "totalDeduction": "25000",
      "netSalary": "475000",
      "repaidAdvances": [
        {
          "advanceId": "advance-uuid",
          "amount": "25000",
          "repaymentAmount": "25000"
        }
      ]
    }
  ],
  "summary": {
    "totalEmployees": 10,
    "totalAmount": "5000000",
    "totalAdvancesRepaid": 8,
    "transactionHash": "0x123..."
  }
}
```

---

### 2. Process Risk Adjustments

**Endpoint:** `POST /api/v1/internal/risk/adjustments`

**Description:** Trigger dynamic risk adjustment based on various metrics.

**Request Body:**
```json
{
  "type": "EMPLOYER_DEFAULT_RATE",
  "employerId": "employer-uuid",
  "metric": "default_rate",
  "value": 7.5
}
```

**Types:**
- `EMPLOYER_DEFAULT_RATE`: Adjust limits based on employer default rate
- `POOL_UTILIZATION`: Adjust based on liquidity pool utilization
- `MONTHLY_DEFAULTS`: Deploy reserve fund for high monthly defaults

**Response:**
```json
{
  "type": "EMPLOYER_DEFAULT_RATE",
  "adjustments": [
    {
      "type": "ADVANCE_LIMIT_REDUCTION",
      "employerId": "employer-uuid",
      "previousLimit": 30,
      "newLimit": 25,
      "reason": "Default rate: 7.50%"
    }
  ],
  "timestamp": "2024-01-15T12:00:00Z",
  "message": "Risk adjustments processed: 1 adjustments made"
}
```

---

### 3. Process Tier Upgrades

**Endpoint:** `POST /api/v1/internal/risk/tier-upgrade`

**Description:** Evaluate and process employer tier upgrades based on performance history.

**Response:**
```json
{
  "processedEmployers": 25,
  "upgrades": [
    {
      "employerId": "employer-uuid",
      "companyName": "ABC Company",
      "previousTier": "NEW",
      "newTier": "API_VERIFIED",
      "newLimit": 30,
      "metrics": {
        "repaymentRate": "97.50",
        "defaultRate": "1.50",
        "totalAdvances": 75
      }
    }
  ],
  "timestamp": "2024-01-15T12:00:00Z"
}
```

**Upgrade Criteria:**
- NEW → API_VERIFIED: Bank history verified, >95% repayment rate, <2% default rate
- API_VERIFIED → PLATFORM_TRUSTED: 6+ months, >98% repayment rate, <1% default rate, 50+ advances

---

### 4. Process Defaulted Advances

**Endpoint:** `POST /api/v1/internal/advances/process-defaults`

**Description:** Identify and process advances that are past due date.

**Response:**
```json
{
  "processedCount": 3,
  "defaultedAdvances": [
    {
      "advanceId": "advance-uuid",
      "employeeId": "employee-uuid",
      "amount": "25000",
      "dueDate": "2024-01-31T00:00:00Z",
      "daysPastDue": 5
    }
  ],
  "affectedEmployers": 2,
  "timestamp": "2024-02-05T12:00:00Z"
}
```

**Actions Taken:**
- Mark advances as DEFAULTED
- Reduce employee credit score by 50 points
- Update employer default rate
- Trigger risk adjustments if thresholds exceeded

---

## Status Codes

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Additional error information"
  }
}
```

## Rate Limiting

- Employee endpoints: 100 requests per minute
- Employer endpoints: 200 requests per minute
- Internal endpoints: No rate limiting (admin only)

## Webhooks

The system can send webhooks for the following events:
- Advance request created
- Advance approved/rejected
- Advance disbursed
- Advance repaid
- Advance defaulted
- Tier upgrade/downgrade

## Testing

Use the following test credentials in the staging environment:

**Employee:**
- Email: employee@test.com
- Password: Test123!

**Employer:**
- Email: employer@test.com
- Password: Test123!

**Admin:**
- Email: admin@test.com
- Password: Admin123!