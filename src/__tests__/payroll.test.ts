import request from "supertest";
import app from "../index";
import { EnumUsersRole } from "../generated/prisma";
import { generateTokenPair } from "../utils/jwt";
import { createTestUser, createTestEmployer } from "./utils/testUtils";
import userService from "../db/services/user";
import fs from "fs";
import path from "path";

let employerUser: any;
let employer: any;
let accessToken: any;

beforeEach(async () => {
  employer = await createTestEmployer(
    `employer-${Date.now()}@example.com`,
    "TestPassword123",
    `Company-${Date.now()}`,
  );
  employerUser = await userService.get({ id: employer.userId });
  const tokens = await generateTokenPair(employerUser);
  accessToken = tokens.accessToken;
});

describe("Payroll Upload Tests", () => {
  beforeAll(() => {
    // Ensure uploads directory exists
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads", { recursive: true });
    }
  });

  describe("POST /api/v1/employer/payroll/upload", () => {
    it("should upload Excel payroll file successfully", async () => {
      const response = await request(app)
        .post("/api/v1/employer/payroll/upload")
        .set("Authorization", `Bearer ${accessToken}`)
        .field("employerId", employer.id)
        .attach("payrollFile", "src/__tests__/templates/payroll.xlsx");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "Payroll file uploaded, parsed, and saved successfully!",
      );
      expect(response.body.data.recordsCount).toBeDefined();
      expect(typeof response.body.data.recordsCount).toBe("number");
    });

    it("should upload CSV payroll file successfully", async () => {
      // Create a test CSV file
      const csvContent = `Employee Name,Email,Monthly Salary,Department,Employee ID
John Doe,john.doe@company.com,5000,Engineering,EMP001
Jane Smith,jane.smith@company.com,6000,Marketing,EMP002
Bob Johnson,bob.johnson@company.com,5500,Sales,EMP003`;

      const testCsvPath = path.join(__dirname, "templates", "test-payroll.csv");
      fs.writeFileSync(testCsvPath, csvContent);

      const response = await request(app)
        .post("/api/v1/employer/payroll/upload")
        .set("Authorization", `Bearer ${accessToken}`)
        .field("employerId", employer.id)
        .attach("payrollFile", testCsvPath);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "Payroll file uploaded, parsed, and saved successfully!",
      );
      expect(response.body.data.recordsCount).toBeGreaterThan(0);

      // Clean up test file
      fs.unlinkSync(testCsvPath);
    });

    it("should upload JSON payroll file successfully", async () => {
      // Create a test JSON file
      const jsonContent = JSON.stringify([
        {
          name: "John Doe",
          email: "john.doe@company.com",
          salary: 5000,
          department: "Engineering",
          employeeId: "EMP001",
        },
        {
          name: "Jane Smith",
          email: "jane.smith@company.com",
          salary: 6000,
          department: "Marketing",
          employeeId: "EMP002",
        },
      ]);

      const testJsonPath = path.join(
        __dirname,
        "templates",
        "test-payroll.json",
      );
      fs.writeFileSync(testJsonPath, jsonContent);

      const response = await request(app)
        .post("/api/v1/employer/payroll/upload")
        .set("Authorization", `Bearer ${accessToken}`)
        .field("employerId", employer.id)
        .attach("payrollFile", testJsonPath);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "Payroll file uploaded, parsed, and saved successfully!",
      );
      expect(response.body.data.recordsCount).toBe(2);

      // Clean up test file
      fs.unlinkSync(testJsonPath);
    });

    it("should return error when no file is uploaded", async () => {
      const response = await request(app)
        .post("/api/v1/employer/payroll/upload")
        .set("Authorization", `Bearer ${accessToken}`)
        .field("employerId", employer.id);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("No file uploaded.");
    });

    it("should return error when employerId is missing", async () => {
      const testCsvPath = path.join(__dirname, "templates", "temp.csv");
      fs.writeFileSync(testCsvPath, "name,email\nTest,test@example.com");

      const response = await request(app)
        .post("/api/v1/employer/payroll/upload")
        .set("Authorization", `Bearer ${accessToken}`)
        .attach("payrollFile", testCsvPath);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Employer ID is required.");

      // Clean up test file
      fs.unlinkSync(testCsvPath);
    });

    it("should reject unsupported file types", async () => {
      // Create a test text file
      const txtContent = "This is not a valid payroll file";
      const testTxtPath = path.join(__dirname, "templates", "test-file.txt");
      fs.writeFileSync(testTxtPath, txtContent);

      const response = await request(app)
        .post("/api/v1/employer/payroll/upload")
        .set("Authorization", `Bearer ${accessToken}`)
        .field("employerId", employer.id)
        .attach("payrollFile", testTxtPath);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Unsupported file type");

      // Clean up test file
      fs.unlinkSync(testTxtPath);
    });

    it("should require authentication", async () => {
      const testCsvPath = path.join(__dirname, "templates", "temp-auth.csv");
      fs.writeFileSync(testCsvPath, "name,email\nTest,test@example.com");

      const response = await request(app)
        .post("/api/v1/employer/payroll/upload")
        .field("employerId", employer.id)
        .attach("payrollFile", testCsvPath);

      expect(response.status).toBe(401);

      // Clean up test file
      fs.unlinkSync(testCsvPath);
    });

    it("should require employer role authorization", async () => {
      // Create a user with employee role
      const employeeUser = await createTestUser(
        `employee-${Date.now()}@example.com`,
        "TestPassword123",
        EnumUsersRole.EMPLOYEE,
      );
      const employeeTokens = await generateTokenPair(employeeUser);

      const testCsvPath = path.join(__dirname, "templates", "temp-role.csv");
      fs.writeFileSync(testCsvPath, "name,email\nTest,test@example.com");

      const response = await request(app)
        .post("/api/v1/employer/payroll/upload")
        .set("Authorization", `Bearer ${employeeTokens.accessToken}`)
        .field("employerId", employer.id)
        .attach("payrollFile", testCsvPath);

      expect(response.status).toBe(403);

      // Clean up test file
      fs.unlinkSync(testCsvPath);
    });

    it("should handle large CSV files", async () => {
      // Create a larger CSV file
      let csvContent =
        "Employee Name,Email,Monthly Salary,Department,Employee ID\n";
      for (let i = 1; i <= 100; i++) {
        csvContent += `Employee ${i},employee${i}@company.com,${5000 + i * 100},Department ${(i % 5) + 1},EMP${i.toString().padStart(3, "0")}\n`;
      }

      const testLargeCsvPath = path.join(
        __dirname,
        "templates",
        "large-payroll.csv",
      );
      fs.writeFileSync(testLargeCsvPath, csvContent);

      const response = await request(app)
        .post("/api/v1/employer/payroll/upload")
        .set("Authorization", `Bearer ${accessToken}`)
        .field("employerId", employer.id)
        .attach("payrollFile", testLargeCsvPath);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "Payroll file uploaded, parsed, and saved successfully!",
      );
      expect(response.body.data.recordsCount).toBe(100);

      // Clean up test file
      fs.unlinkSync(testLargeCsvPath);
    });

    it("should handle CSV files with special characters", async () => {
      const csvContent = `Employee Name,Email,Monthly Salary,Department
"John O'Reilly",john.oreilly@company.com,5000,"R&D Department"
"María González",maria.gonzalez@company.com,6000,"Sales & Marketing"
"李小明",li.xiaoming@company.com,5500,"IT Department"`;

      const testSpecialCsvPath = path.join(
        __dirname,
        "templates",
        "special-chars.csv",
      );
      fs.writeFileSync(testSpecialCsvPath, csvContent);

      const response = await request(app)
        .post("/api/v1/employer/payroll/upload")
        .set("Authorization", `Bearer ${accessToken}`)
        .field("employerId", employer.id)
        .attach("payrollFile", testSpecialCsvPath);

      expect(response.status).toBe(200);
      expect(response.body.data.recordsCount).toBe(3);

      // Clean up test file
      fs.unlinkSync(testSpecialCsvPath);
    });
  });

  describe("POST /api/v1/employer/extract", () => {
    it("should extract payroll data from Excel file successfully", async () => {
      const response = await request(app)
        .post("/api/v1/employer/extract")
        .set("Authorization", `Bearer ${accessToken}`)
        .attach("payrollFile", "src/__tests__/templates/payroll.xlsx");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.employees).toBeDefined();
      expect(response.body.data.metadata).toBeDefined();
      expect(response.body.message).toContain("Extracted");
      expect(response.body.message).toContain("employees");
      expect(response.body.message).toContain("confidence");
    });

    it("should extract payroll data from CSV file successfully", async () => {
      const csvContent = `Employee Name,Email,Monthly Salary,Department
John Doe,john@example.com,5000,Engineering
Jane Smith,jane@example.com,6000,Marketing
Bob Johnson,bob@example.com,5500,Sales`;

      const testCsvPath = path.join(__dirname, "templates", "test-extract.csv");
      fs.writeFileSync(testCsvPath, csvContent);

      const response = await request(app)
        .post("/api/v1/employer/extract")
        .set("Authorization", `Bearer ${accessToken}`)
        .attach("payrollFile", testCsvPath);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.employees).toBeDefined();
      expect(response.body.data.metadata).toBeDefined();

      // Clean up test file
      fs.unlinkSync(testCsvPath);
    });

    it("should return error when no file is uploaded for extraction", async () => {
      const response = await request(app)
        .post("/api/v1/employer/extract")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("No file uploaded");
    });

    it("should return error for unsupported file format in extraction", async () => {
      const txtContent = "This is not a valid payroll file";
      const testTxtPath = path.join(__dirname, "templates", "test-extract.txt");
      fs.writeFileSync(testTxtPath, txtContent);

      const response = await request(app)
        .post("/api/v1/employer/extract")
        .set("Authorization", `Bearer ${accessToken}`)
        .attach("payrollFile", testTxtPath);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Unsupported file format");

      // Clean up test file
      fs.unlinkSync(testTxtPath);
    });

    it("should handle extraction errors gracefully", async () => {
      // Create a CSV file with invalid content to trigger parsing error
      const invalidCsvContent =
        "invalid,csv,content\nwithout,proper,formatting";
      const testInvalidPath = path.join(__dirname, "templates", "invalid.csv");
      fs.writeFileSync(testInvalidPath, invalidCsvContent);

      const response = await request(app)
        .post("/api/v1/employer/extract")
        .set("Authorization", `Bearer ${accessToken}`)
        .attach("payrollFile", testInvalidPath);

      // This should still succeed as the CSV parser is quite lenient
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      // Clean up test file
      fs.unlinkSync(testInvalidPath);
    });

    it("should handle empty CSV files", async () => {
      const emptyCsvPath = path.join(__dirname, "templates", "empty.csv");
      fs.writeFileSync(emptyCsvPath, "");

      const response = await request(app)
        .post("/api/v1/employer/extract")
        .set("Authorization", `Bearer ${accessToken}`)
        .attach("payrollFile", emptyCsvPath);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.employees).toHaveLength(0);

      // Clean up test file
      fs.unlinkSync(emptyCsvPath);
    });

    it("should handle CSV files with headers only", async () => {
      const headerOnlyCsvPath = path.join(
        __dirname,
        "templates",
        "headers-only.csv",
      );
      fs.writeFileSync(
        headerOnlyCsvPath,
        "Employee Name,Email,Monthly Salary,Department",
      );

      const response = await request(app)
        .post("/api/v1/employer/extract")
        .set("Authorization", `Bearer ${accessToken}`)
        .attach("payrollFile", headerOnlyCsvPath);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.employees).toHaveLength(0);

      // Clean up test file
      fs.unlinkSync(headerOnlyCsvPath);
    });
  });

  describe("POST /api/v1/employer/bulk-extract", () => {
    let testFiles: string[] = [];

    beforeAll(() => {
      // Create test files for bulk processing
      const csvContent1 = `name,email,salary
John Doe,john@example.com,50000
Jane Smith,jane@example.com,60000`;

      const csvContent2 = `Employee Name,Email,Monthly Salary
Bob Johnson,bob@example.com,55000
Alice Brown,alice@example.com,65000`;

      const jsonContent = JSON.stringify([
        { name: "Charlie Wilson", email: "charlie@example.com", salary: 70000 },
        { name: "Diana Prince", email: "diana@example.com", salary: 75000 },
      ]);

      const csvPath1 = path.join(__dirname, "templates", "bulk1.csv");
      const csvPath2 = path.join(__dirname, "templates", "bulk2.csv");
      const jsonPath = path.join(__dirname, "templates", "bulk.json");

      fs.writeFileSync(csvPath1, csvContent1);
      fs.writeFileSync(csvPath2, csvContent2);
      fs.writeFileSync(jsonPath, jsonContent);

      testFiles = [csvPath1, csvPath2, jsonPath];
    });

    afterAll(() => {
      // Clean up test files
      testFiles.forEach((filePath) => {
        try {
          fs.unlinkSync(filePath);
        } catch (error) {
          // Files might not exist, ignore errors
        }
      });
    });

    it("should process bulk payroll files successfully", async () => {
      const response = await request(app)
        .post("/api/v1/employer/bulk-extract")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ filePaths: testFiles });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.employees).toBeDefined();
      expect(response.body.data.metadata).toBeDefined();
      expect(response.body.data.metadata.filesProcessed).toBeGreaterThan(0);
      expect(response.body.data.metadata.totalEmployees).toBeGreaterThan(0);
      expect(response.body.data.metadata.averageConfidence).toBeDefined();
    });

    it("should return error when no file paths are provided", async () => {
      const response = await request(app)
        .post("/api/v1/employer/bulk-extract")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("No file paths provided");
    });

    it("should return error when empty file paths array is provided", async () => {
      const response = await request(app)
        .post("/api/v1/employer/bulk-extract")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ filePaths: [] });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("No file paths provided");
    });

    it("should handle mixed valid and invalid files", async () => {
      const mixedFilePaths = [
        testFiles[0], // valid CSV
        path.join(__dirname, "templates", "nonexistent.csv"), // invalid
        testFiles[1], // valid CSV
      ];

      const response = await request(app)
        .post("/api/v1/employer/bulk-extract")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ filePaths: mixedFilePaths });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.metadata.filesProcessed).toBeGreaterThan(0);
      // Should process valid files even if some are invalid
    });

    it("should handle bulk processing with invalid filePaths parameter", async () => {
      const response = await request(app)
        .post("/api/v1/employer/bulk-extract")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ filePaths: "not an array" });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("No file paths provided");
    });

    it("should handle bulk processing with all invalid files", async () => {
      const invalidFilePaths = [
        path.join(__dirname, "templates", "nonexistent1.csv"),
        path.join(__dirname, "templates", "nonexistent2.xlsx"),
      ];

      const response = await request(app)
        .post("/api/v1/employer/bulk-extract")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ filePaths: invalidFilePaths });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.metadata.filesProcessed).toBe(0);
      expect(response.body.data.metadata.totalEmployees).toBe(0);
    });

    it("should process single file in bulk endpoint", async () => {
      const response = await request(app)
        .post("/api/v1/employer/bulk-extract")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ filePaths: [testFiles[0]] });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.metadata.filesProcessed).toBe(1);
      expect(response.body.data.metadata.totalEmployees).toBeGreaterThan(0);
    });
  });

  describe("File Upload Edge Cases", () => {
    it("should handle very small CSV files", async () => {
      const smallCsvContent = "name,email\nJohn,john@test.com";
      const smallCsvPath = path.join(__dirname, "templates", "small.csv");
      fs.writeFileSync(smallCsvPath, smallCsvContent);

      const response = await request(app)
        .post("/api/v1/employer/payroll/upload")
        .set("Authorization", `Bearer ${accessToken}`)
        .field("employerId", employer.id)
        .attach("payrollFile", smallCsvPath);

      expect(response.status).toBe(200);
      expect(response.body.data.recordsCount).toBe(1);

      // Clean up test file
      fs.unlinkSync(smallCsvPath);
    });

    it("should handle CSV files with missing columns", async () => {
      const incompleteCsvContent = `name,email
John Doe,john@example.com
Jane Smith,
Bob Johnson,bob@example.com`;

      const incompleteCsvPath = path.join(
        __dirname,
        "templates",
        "incomplete.csv",
      );
      fs.writeFileSync(incompleteCsvPath, incompleteCsvContent);

      const response = await request(app)
        .post("/api/v1/employer/payroll/upload")
        .set("Authorization", `Bearer ${accessToken}`)
        .field("employerId", employer.id)
        .attach("payrollFile", incompleteCsvPath);

      expect(response.status).toBe(200);
      expect(response.body.data.recordsCount).toBe(3);

      // Clean up test file
      fs.unlinkSync(incompleteCsvPath);
    });

    it("should handle malformed JSON files gracefully", async () => {
      const malformedJsonContent = `{
        "employees": [
          {"name": "John", "email": "john@test.com"},
          {"name": "Jane", "email": "jane@test.com"
        ]
      }`; // Missing closing bracket

      const malformedJsonPath = path.join(
        __dirname,
        "templates",
        "malformed.json",
      );
      fs.writeFileSync(malformedJsonPath, malformedJsonContent);

      const response = await request(app)
        .post("/api/v1/employer/payroll/upload")
        .set("Authorization", `Bearer ${accessToken}`)
        .field("employerId", employer.id)
        .attach("payrollFile", malformedJsonPath);

      expect(response.status).toBe(500);
      expect(response.body.message).toContain("Error processing payroll file");

      // Clean up test file
      fs.unlinkSync(malformedJsonPath);
    });
  });
});
