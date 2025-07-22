const payrollRecordSchema = {
  employeeId: String,
  firstName: String,
  lastName: String,
  jobTitle: String,
  department: String,
  payPeriodStartDate: String, // YYYY-MM-DD
  payPeriodEndDate: String, // YYYY-MM-DD
  paymentDate: String, // YYYY-MM-DD
  grossPay: Number,
  baseSalaryOrHourlyRate: Number,
  hoursWorked: Number,
  overtimeHours: Number,
  bonusPay: Number,
  commissionPay: Number,
  totalTaxesWithheld: Number,
  federalTax: Number,
  stateTax: Number,
  localTax: Number,
  socialSecurityTax: Number,
  medicareTax: Number,
  preTaxDeductions: Number,
  healthInsuranceDeduction: Number,
  retirement401kDeduction: Number,
  postTaxDeductions: Number,
  netPay: Number,
  bankAccountNumber: String, // **Important: Mask/Hash this immediately after use**
  bankRoutingNumber: String, // **Important: Mask/Hash this immediately after use**
  // ... potentially other benefits, allowances, garnishments, etc.
};

export default payrollRecordSchema;
