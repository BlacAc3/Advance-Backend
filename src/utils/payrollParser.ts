import { parse } from "csv-parse";
import * as xlsx from "xlsx";
import moment from "moment"; // For robust date parsing
import * as fs from "fs";
import * as fsPromises from "fs/promises";

// Define the shape of a raw data record, accounting for different casing and types
interface RawPayrollData {
  employee_id?: string | number;
  "Employee ID"?: string | number;
  first_name?: string;
  "First Name"?: string;
  last_name?: string;
  "Last Name"?: string;
  job_title?: string;
  "Job Title"?: string;
  department?: string;
  pay_period_start_date?: string | number;
  "Pay Period Start"?: string | number;
  pay_period_end_date?: string | number;
  "Pay Period End"?: string | number;
  payment_date?: string | number;
  "Payment Date"?: string | number;
  gross_pay?: string | number;
  "Gross Pay"?: string | number;
  base_salary_or_hourly_rate?: string | number;
  "Base Salary/Rate"?: string | number;
  hours_worked?: string | number;
  "Hours Worked"?: string | number;
  overtime_hours?: string | number;
  "Overtime Hours"?: string | number;
  bonus_pay?: string | number;
  "Bonus Pay"?: string | number;
  commission_pay?: string | number;
  "Commission Pay"?: string | number;
  total_taxes_withheld?: string | number;
  "Total Taxes Withheld"?: string | number;
  federal_tax?: string | number;
  "Federal Tax"?: string | number;
  state_tax?: string | number;
  "State Tax"?: string | number;
  local_tax?: string | number;
  "Local Tax"?: string | number;
  social_security_tax?: string | number;
  "Social Security Tax"?: string | number;
  medicare_tax?: string | number;
  "Medicare Tax"?: string | number;
  pre_tax_deductions?: string | number;
  "Pre-Tax Deductions"?: string | number;
  health_insurance_deduction?: string | number;
  "Health Insurance"?: string | number;
  retirement_401k_deduction?: string | number;
  "401K Deduction"?: string | number;
  post_tax_deductions?: string | number;
  "Post-Tax Deductions"?: string | number;
  net_pay?: string | number;
  "Net Pay"?: string | number;
  bank_account_number?: string | number;
  "Bank Account Number"?: string | number;
  bank_routing_number?: string | number;
  "Bank Routing Number"?: string | number;
  [key: string]: string | number | undefined; // Allow for other unexpected properties, though explicit is better
}

// Define the structure of a sanitized and validated payroll record
interface PayrollRecord {
  employeeId: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  payPeriodStartDate: string; // YYYY-MM-DD format
  payPeriodEndDate: string; // YYYY-MM-DD format
  paymentDate: string; // YYYY-MM-DD format
  grossPay: number;
  baseSalaryOrHourlyRate: number;
  hoursWorked: number;
  overtimeHours: number;
  bonusPay: number;
  commissionPay: number;
  totalTaxesWithheld: number;
  federalTax: number;
  stateTax: number;
  localTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  preTaxDeductions: number;
  healthInsuranceDeduction: number;
  retirement401kDeduction: number;
  postTaxDeductions: number;
  netPay: number;
  bankAccountNumber: string;
  bankRoutingNumber: string;
}

// Helper to sanitize and validate data types
const sanitizeAndValidate = (data: RawPayrollData): PayrollRecord => {
  // Basic type conversions (add more robust validation with libraries like Joi or Zod)
  const employeeId = String(
    data.employee_id || data["Employee ID"] || "",
  ).trim();
  const firstName = String(data.first_name || data["First Name"] || "").trim();
  const lastName = String(data.last_name || data["Last Name"] || "").trim();
  const jobTitle = String(data.job_title || data["Job Title"] || "").trim();
  const department = String(data.department || "").trim();

  // Date parsing: Use moment for flexibility
  // Ensure input to moment is always a string
  const payPeriodStartDate = moment(
    String(data.pay_period_start_date || data["Pay Period Start"] || ""),
    ["YYYY-MM-DD", "MM/DD/YYYY", "DD-MM-YYYY"],
  ).format("YYYY-MM-DD");
  const payPeriodEndDate = moment(
    String(data.pay_period_end_date || data["Pay Period End"] || ""),
    ["YYYY-MM-DD", "MM/DD/YYYY", "DD-MM-YYYY"],
  ).format("YYYY-MM-DD");
  const paymentDate = moment(
    String(data.payment_date || data["Payment Date"] || ""),
    ["YYYY-MM-DD", "MM/DD/YYYY", "DD-MM-YYYY"],
  ).format("YYYY-MM-DD");

  // Numeric conversions: Use parseFloat and handle NaN
  // Ensure input to parseFloat is always a string
  const grossPay =
    parseFloat(String(data.gross_pay || data["Gross Pay"] || 0)) || 0;
  const baseSalaryOrHourlyRate =
    parseFloat(
      String(data.base_salary_or_hourly_rate || data["Base Salary/Rate"] || 0),
    ) || 0;
  const hoursWorked =
    parseFloat(String(data.hours_worked || data["Hours Worked"] || 0)) || 0;
  const overtimeHours =
    parseFloat(String(data.overtime_hours || data["Overtime Hours"] || 0)) || 0;
  const bonusPay =
    parseFloat(String(data.bonus_pay || data["Bonus Pay"] || 0)) || 0;
  const commissionPay =
    parseFloat(String(data.commission_pay || data["Commission Pay"] || 0)) || 0;
  const totalTaxesWithheld =
    parseFloat(
      String(data.total_taxes_withheld || data["Total Taxes Withheld"] || 0),
    ) || 0;
  const federalTax =
    parseFloat(String(data.federal_tax || data["Federal Tax"] || 0)) || 0;
  const stateTax =
    parseFloat(String(data.state_tax || data["State Tax"] || 0)) || 0;
  const localTax =
    parseFloat(String(data.local_tax || data["Local Tax"] || 0)) || 0;
  const socialSecurityTax =
    parseFloat(
      String(data.social_security_tax || data["Social Security Tax"] || 0),
    ) || 0;
  const medicareTax =
    parseFloat(String(data.medicare_tax || data["Medicare Tax"] || 0)) || 0;
  const preTaxDeductions =
    parseFloat(
      String(data.pre_tax_deductions || data["Pre-Tax Deductions"] || 0),
    ) || 0;
  const healthInsuranceDeduction =
    parseFloat(
      String(data.health_insurance_deduction || data["Health Insurance"] || 0),
    ) || 0;
  const retirement401kDeduction =
    parseFloat(
      String(data.retirement_401k_deduction || data["401K Deduction"] || 0),
    ) || 0;
  const postTaxDeductions =
    parseFloat(
      String(data.post_tax_deductions || data["Post-Tax Deductions"] || 0),
    ) || 0;
  const netPay = parseFloat(String(data.net_pay || data["Net Pay"] || 0)) || 0;

  // Sensitive data: Mask or hash immediately. For this example, we're just accepting.
  // In a real app, implement robust hashing/encryption and temporary storage.
  const bankAccountNumber = String(
    data.bank_account_number || data["Bank Account Number"] || "",
  ).trim();
  const bankRoutingNumber = String(
    data.bank_routing_number || data["Bank Routing Number"] || "",
  ).trim();

  const parsedRecord: PayrollRecord = {
    employeeId,
    firstName,
    lastName,
    jobTitle,
    department,
    payPeriodStartDate,
    payPeriodEndDate,
    paymentDate,
    grossPay,
    baseSalaryOrHourlyRate,
    hoursWorked,
    overtimeHours,
    bonusPay,
    commissionPay,
    totalTaxesWithheld,
    federalTax,
    stateTax,
    localTax,
    socialSecurityTax,
    medicareTax,
    preTaxDeductions,
    healthInsuranceDeduction,
    retirement401kDeduction,
    postTaxDeductions,
    netPay,
    bankAccountNumber,
    bankRoutingNumber,
  };

  return parsedRecord;
};

// Parse CSV file
const parseCsvFile = async (filePath: string): Promise<PayrollRecord[]> => {
  return new Promise((resolve, reject) => {
    const records: PayrollRecord[] = [];

    fs.createReadStream(filePath)
      .pipe(
        parse({
          columns: true, // Treat first row as column headers
          skip_empty_lines: true,
          trim: true, // Trim whitespace from values
        }),
      )
      .on("data", (row: RawPayrollData) => {
        // Type row as RawPayrollData
        try {
          records.push(sanitizeAndValidate(row));
        } catch (error: unknown) {
          // Type error as unknown
          if (error instanceof Error) {
            console.error(
              `Error processing CSV row: ${JSON.stringify(row)} - ${error.message}`,
            );
          } else {
            console.error(
              `Unknown error processing CSV row: ${JSON.stringify(row)} - ${error}`,
            );
          }
          // Optionally push an error object or skip
        }
      })
      .on("end", () => {
        resolve(records);
      })
      .on("error", (err: Error) => {
        // Type err as Error
        console.error("Error parsing CSV:", err);
        reject(err);
      });
  });
};

// Parse Excel (XLSX) file
const parseExcelFile = async (filePath: string): Promise<PayrollRecord[]> => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
    const sheet = workbook.Sheets[sheetName];
    const jsonData: RawPayrollData[] = xlsx.utils.sheet_to_json(sheet);

    return jsonData.map((row: RawPayrollData) => sanitizeAndValidate(row));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error parsing Excel:", error);
    } else {
      console.error("Unknown error parsing Excel:", error);
    }
    throw error;
  }
};

// Parse JSON file (assuming it's an array of payroll objects)
const parseJsonFile = async (filePath: string): Promise<PayrollRecord[]> => {
  try {
    const data = await fsPromises.readFile(filePath, "utf8");
    const jsonData: unknown = JSON.parse(data);

    if (!Array.isArray(jsonData)) {
      throw new Error("JSON file must contain an array of payroll records.");
    }

    // Type assertion as we've checked it's an array and expect RawPayrollData
    return (jsonData as RawPayrollData[]).map((row: RawPayrollData) =>
      sanitizeAndValidate(row),
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error parsing JSON:", error);
    } else {
      console.error("Unknown error parsing JSON:", error);
    }
    throw error;
  }
};

export {
  parseCsvFile,
  parseExcelFile,
  parseJsonFile,
  PayrollRecord, // Exporting the interface for external use if needed
  RawPayrollData, // Exporting the interface for external use if needed
};
