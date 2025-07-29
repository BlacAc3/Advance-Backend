import multer from "multer";
import * as pdf from "pdf-parse";
import * as XLSX from "xlsx";
import * as Papa from "papaparse";
import fs from "fs";
import path from "path";

// Configure multer for file uploads
// Employee data interface
interface EmployeeData {
  id: string;
  name: string;
  email?: string;
  department?: string;
  position?: string;
  salary?: number;
  grossPay?: number;
  netPay?: number;
  deductions?: number;
  hoursWorked?: number;
  payPeriod?: string;
  confidence: number; // Confidence score for extracted data
}

// Extraction result interface
export interface ExtractionResult {
  employees: EmployeeData[];
  metadata: {
    totalEmployees: number;
    extractionMethod: string;
    confidence: number;
    errors: string[];
  };
}

export class PayrollExtractor {
  // Common field patterns for identification
  private static readonly FIELD_PATTERNS = {
    employeeId:
      /(?:emp(?:loyee)?\s*(?:id|#|number)|id|employee\s*number|staff\s*id)/i,
    name: /(?:name|employee\s*name|full\s*name|worker|staff)/i,
    email: /(?:email|e-mail|mail)/i,
    department: /(?:dept|department|division|team)/i,
    position: /(?:position|title|role|job\s*title)/i,
    salary: /(?:salary|base\s*pay|annual)/i,
    grossPay: /(?:gross\s*pay|gross\s*amount|total\s*pay)/i,
    netPay: /(?:net\s*pay|take\s*home|final\s*pay)/i,
    deductions: /(?:deductions|taxes|withholding)/i,
    hoursWorked: /(?:hours\s*worked|total\s*hours|hrs)/i,
    payPeriod: /(?:pay\s*period|period|date)/i,
  };

  // Extract data from PDF
  static async extractFromPDF(filePath: string): Promise<ExtractionResult> {
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdf(dataBuffer);
      const text = pdfData.text;

      // Try different extraction strategies
      const strategies = [
        this.extractTabularDataFromText,
        this.extractLineByLineData,
        this.extractPatternBasedData,
      ];

      let bestResult: ExtractionResult | null = null;
      let highestConfidence = 0;

      for (const strategy of strategies) {
        const result = strategy(text);
        if (result.metadata.confidence > highestConfidence) {
          highestConfidence = result.metadata.confidence;
          bestResult = result;
        }
      }

      return (
        bestResult || {
          employees: [],
          metadata: {
            totalEmployees: 0,
            extractionMethod: "pdf-fallback",
            confidence: 0,
            errors: ["No suitable extraction pattern found"],
          },
        }
      );
    } catch (error: any) {
      // Explicitly mark error as any for now
      throw new Error(`PDF extraction failed: ${error.message}`);
    }
  }

  // Extract data from Excel files
  static async extractFromExcel(filePath: string): Promise<ExtractionResult> {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      return this.processSpreadsheetData(jsonData as string[][], "excel");
    } catch (error: any) {
      // Explicitly mark error as any for now
      throw new Error(`Excel extraction failed: ${error.message}`);
    }
  }

  // Extract data from CSV files
  static async extractFromCSV(filePath: string): Promise<ExtractionResult> {
    try {
      const csvContent = fs.readFileSync(filePath, "utf8");
      const parsed = Papa.parse(csvContent, {
        skipEmptyLines: true,
        dynamicTyping: true,
      });

      return this.processSpreadsheetData(parsed.data as string[][], "csv");
    } catch (error: any) {
      // Explicitly mark error as any for now
      throw new Error(`CSV extraction failed: ${error.message}`);
    }
  }

  // Process spreadsheet data (Excel/CSV)
  private static processSpreadsheetData(
    data: string[][],
    method: string,
  ): ExtractionResult {
    if (data.length < 2) {
      return {
        employees: [],
        metadata: {
          totalEmployees: 0,
          extractionMethod: method,
          confidence: 0,
          errors: ["Insufficient data rows"],
        },
      };
    }

    const headers = data[0].map((h) => String(h).toLowerCase().trim());
    const fieldMapping = this.mapHeaders(headers);
    const employees: EmployeeData[] = [];
    const errors: string[] = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (!row || row.length === 0) continue;

      try {
        const employee = this.extractEmployeeFromRow(
          row,
          fieldMapping,
          headers,
        );
        if (employee) {
          employees.push(employee);
        }
      } catch (error: any) {
        // Explicitly mark error as any for now
        errors.push(`Row ${i + 1}: ${error.message}`);
      }
    }

    const confidence = this.calculateConfidence(employees, fieldMapping);

    return {
      employees,
      metadata: {
        totalEmployees: employees.length,
        extractionMethod: method,
        confidence,
        errors,
      },
    };
  }

  // Map headers to field types
  private static mapHeaders(headers: string[]): Record<string, number> {
    const mapping: Record<string, number> = {};

    headers.forEach((header, index) => {
      for (const [fieldName, pattern] of Object.entries(this.FIELD_PATTERNS)) {
        if (pattern.test(header)) {
          mapping[fieldName] = index;
          break;
        }
      }
    });

    return mapping;
  }

  // Extract employee data from a row
  private static extractEmployeeFromRow(
    row: any[],
    fieldMapping: Record<string, number>,
    headers: string[], // This parameter is currently unused, but kept as per instructions
  ): EmployeeData | null {
    const employee: Partial<EmployeeData> = {};

    // Extract mapped fields
    for (const [fieldName, columnIndex] of Object.entries(fieldMapping)) {
      if (columnIndex < row.length && row[columnIndex] != null) {
        const value = String(row[columnIndex]).trim();
        if (value) {
          switch (fieldName) {
            case "employeeId":
              employee.id = value;
              break;
            case "name":
              employee.name = value;
              break;
            case "email":
              employee.email = value;
              break;
            case "department":
              employee.department = value;
              break;
            case "position":
              employee.position = value;
              break;
            case "salary":
            case "grossPay":
            case "netPay":
            case "deductions":
            case "hoursWorked":
              const numericValue = this.parseNumericValue(value);
              if (numericValue !== null) {
                // Type assertion for assignment
                (employee as any)[fieldName] = numericValue;
              }
              break;
            case "payPeriod":
              employee.payPeriod = value;
              break;
          }
        }
      }
    }

    // Fallback: try to find ID and name in first few columns if not mapped
    if (!employee.id || !employee.name) {
      for (let i = 0; i < Math.min(5, row.length); i++) {
        const value = String(row[i] || "").trim();
        if (!value) continue;

        if (!employee.id && this.looksLikeEmployeeId(value)) {
          employee.id = value;
        } else if (!employee.name && this.looksLikeName(value)) {
          employee.name = value;
        }
      }
    }

    // Minimum required fields
    if (!employee.id && !employee.name) {
      return null;
    }

    // Generate missing required fields
    if (!employee.id) {
      employee.id = `AUTO_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }
    if (!employee.name) {
      employee.name = `Employee ${employee.id}`;
    }

    employee.confidence = this.calculateEmployeeConfidence(
      employee,
      fieldMapping,
    );

    return employee as EmployeeData;
  }

  // PDF extraction strategies
  private static extractTabularDataFromText(text: string): ExtractionResult {
    const lines = text.split("\n").filter((line) => line.trim());
    const tableData: string[][] = [];

    // Look for tabular patterns
    for (const line of lines) {
      const cells = line.split(/\s{2,}|\t/).filter((cell) => cell.trim());
      if (cells.length >= 2) {
        tableData.push(cells);
      }
    }

    if (tableData.length < 2) {
      return {
        employees: [],
        metadata: {
          totalEmployees: 0,
          extractionMethod: "pdf-tabular",
          confidence: 0,
          errors: ["No tabular data found"],
        },
      };
    }

    return this.processSpreadsheetData(tableData, "pdf-tabular");
  }

  private static extractLineByLineData(text: string): ExtractionResult {
    const lines = text.split("\n").filter((line) => line.trim());
    const employees: EmployeeData[] = [];
    let currentEmployee: Partial<EmployeeData> = {};

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Check for employee patterns
      for (const [fieldName, pattern] of Object.entries(this.FIELD_PATTERNS)) {
        const match = trimmedLine.match(
          new RegExp(`${pattern.source}[:\\s]*(.+)`, "i"),
        );
        if (match) {
          const value = match[1].trim();

          if (fieldName === "employeeId") {
            // New employee detected
            if (currentEmployee.id || currentEmployee.name) {
              employees.push(this.finalizeEmployee(currentEmployee));
            }
            currentEmployee = { id: value };
          } else if (fieldName === "name") {
            currentEmployee.name = value;
          } else {
            (currentEmployee as any)[fieldName] = value;
          }
          break;
        }
      }
    }

    // Add last employee
    if (currentEmployee.id || currentEmployee.name) {
      employees.push(this.finalizeEmployee(currentEmployee));
    }

    return {
      employees,
      metadata: {
        totalEmployees: employees.length,
        extractionMethod: "pdf-line-by-line",
        confidence: employees.length > 0 ? 0.7 : 0,
        errors: [],
      },
    };
  }

  private static extractPatternBasedData(text: string): ExtractionResult {
    const employees: EmployeeData[] = [];

    // Look for common payroll patterns
    const patterns = [
      /Employee\s+ID[:\s]*(\S+).*?Name[:\s]*([^\n\r]+)/gis,
      /(\d+)\s+([A-Za-z\s,]+)\s+\$?([\d,]+\.?\d*)/g,
      /([A-Z]\d+|\d+[A-Z]|\d{3,})\s+([A-Za-z\s]+(?:[A-Za-z])){2,}/g,
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const employee: Partial<EmployeeData> = {
          id: match[1].trim(),
          name: match[2].trim(),
        };

        if (match[3]) {
          employee.grossPay = this.parseNumericValue(match[3]) as number; // Ensure type is number
        }

        employees.push(this.finalizeEmployee(employee));
      }

      if (employees.length > 0) break;
    }

    return {
      employees,
      metadata: {
        totalEmployees: employees.length,
        extractionMethod: "pdf-pattern-based",
        confidence: employees.length > 0 ? 0.6 : 0,
        errors: [],
      },
    };
  }

  // Helper methods
  private static finalizeEmployee(
    partial: Partial<EmployeeData>,
  ): EmployeeData {
    return {
      id:
        partial.id ||
        `AUTO_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name: partial.name || `Employee ${partial.id}`,
      email: partial.email,
      department: partial.department,
      position: partial.position,
      salary: partial.salary,
      grossPay: partial.grossPay,
      netPay: partial.netPay,
      deductions: partial.deductions,
      hoursWorked: partial.hoursWorked,
      payPeriod: partial.payPeriod,
      confidence: 0.5,
    };
  }

  private static looksLikeEmployeeId(value: string): boolean {
    return /^[A-Z]?\d{3,}[A-Z]?$|^[A-Z]{1,3}\d+$|^\d+$/.test(value);
  }

  private static looksLikeName(value: string): boolean {
    return /^[A-Za-z\s,.''-]{2,}$/.test(value) && value.split(" ").length >= 1;
  }

  private static parseNumericValue(value: string): number | null {
    const cleaned = value.replace(/[$,\s]/g, "");
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
  }

  private static calculateConfidence(
    employees: EmployeeData[],
    fieldMapping: Record<string, number>, // This parameter is currently unused, but kept as per instructions
  ): number {
    if (employees.length === 0) return 0;

    const mappedFields = Object.keys(fieldMapping).length;
    const totalPossibleFields = Object.keys(this.FIELD_PATTERNS).length;
    const mappingScore = mappedFields / totalPossibleFields;

    const dataQualityScore =
      employees.reduce((sum, emp) => sum + emp.confidence, 0) /
      employees.length;

    return Math.min(mappingScore * 0.4 + dataQualityScore * 0.6, 1);
  }

  private static calculateEmployeeConfidence(
    employee: Partial<EmployeeData>,
    fieldMapping: Record<string, number>, // This parameter is currently unused, but kept as per instructions
  ): number {
    let score = 0;
    const weights = {
      id: 0.3,
      name: 0.3,
      email: 0.1,
      grossPay: 0.2,
      department: 0.1,
    };

    for (const [field, weight] of Object.entries(weights)) {
      if (employee[field as keyof EmployeeData]) {
        score += weight;
      }
    }

    return Math.min(score, 1);
  }
}
