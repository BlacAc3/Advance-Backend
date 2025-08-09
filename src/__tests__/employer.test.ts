import request from "supertest";
import app from "../index";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import * as dbConfig from "../db/database";
import { hashPassword } from "../utils/password";
import userService from "../db/services/user";
import invitationService from "../db/services/invitation";
import { generateTokenPair } from "../utils/jwt";
import {
  createTestUser,
  createTestMarketer,
  createTestEmployer,
} from "./utils/testUtils";
import { EnumInvitationsRole, EnumUsersRole } from "../generated/prisma";

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

// beforeEach(async () => {});

describe("Employer Controller", () => {
  beforeAll(async () => {
    // Create a user with employer role
  });

  describe("POST /api/v1/employer/send-invite", () => {
    it("should send an invitation successfully", async () => {
      const mockEmail = "employee@example.com";

      const response = await request(app)
        .post("/api/v1/employer/send-invite")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ email: mockEmail });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Invitation sent successfully");

      // Clean created invitation
      const inviteId = response.body.data.id;
    });

    it("should return an error if an invitation already exists", async () => {
      const mockEmail = "employee@example.com";

      // Create invitation
      const newInvitation = {
        id: uuidv4(),
        targetEmail: mockEmail,
        senderUserId: employerUser.id,
        role: EnumInvitationsRole.EMPLOYEE,
        expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
      };
      await invitationService.create({
        email: newInvitation.targetEmail,
        senderId: newInvitation.senderUserId,
        role: EnumInvitationsRole.EMPLOYEE,
        expiresAt: newInvitation.expiresAt,
      });

      const response = await request(app)
        .post("/api/v1/employer/send-invite")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ email: mockEmail });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Invitation for the target user already exists",
      );
    });
  });

  describe("POST /api/v1/employer/register", () => {
    let marketerUser: any;
    let marketerAccessToken: any;
    beforeAll(async () => {
      marketerUser = await createTestMarketer(
        `marketer-${Date.now()}@example.com`,
        "TestPassword123",
      );
      const tokens = await generateTokenPair(marketerUser);
      marketerAccessToken = tokens.accessToken;
    });

    it("should register an employer successfully", async () => {
      const mockEmail = `new_employer_${Date.now()}@example.com`;
      const mockCompanyName = "New Test Company";
      const mockPassword = "TestPassword123!";

      // Create invitation
      const newInvitation = await invitationService.create({
        email: mockEmail,
        senderId: marketerUser.id,
        role: EnumInvitationsRole.EMPLOYER,
        expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
      });

      const userData = {
        email: mockEmail,
        password: "TestPassword123!",
        role: "EMPLOYER",
        companyName: mockCompanyName,
        invitationId: newInvitation.id,
      };

      const response = await request(app)
        .post("/api/v1/employer/register")
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Employer registered successfully");
    });

    it("should not register an employer with an invalid invitationId", async () => {
      const mockEmail = "invalid_employer@example.com";
      const mockCompanyName = "Invalid Test Company";
      const invalidInvitationId = uuidv4();

      const userData = {
        email: mockEmail,
        password: "TestPassword123!",
        companyName: mockCompanyName,
        role: EnumUsersRole.EMPLOYER,
        invitationId: invalidInvitationId,
      };

      const response = await request(app)
        .post("/api/v1/employer/register")
        .send(userData);

      expect(response.status).toBe(404);
      // expect(response.body).toBe(false);
      // expect(response.body.message).toBe("Invitation not found");
    });
  });

  describe("POST /api/v1/employer/payroll/upload", () => {
    it("should upload payroll file successfully", async () => {
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
      const response = await request(app)
        .post("/api/v1/employer/payroll/upload")
        .set("Authorization", `Bearer ${accessToken}`)
        .attach("payrollFile", "src/__tests__/templates/payroll.xlsx");

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Employer ID is required.");
    });

    it("should handle CSV file upload", async () => {
      // Create a test CSV file
      const csvContent =
        "name,email,salary\nJohn Doe,john@example.com,50000\nJane Smith,jane@example.com,60000";
      const fs = require("fs");
      const path = require("path");
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
      expect(response.body.data.recordsCount).toBeDefined();

      // Clean up test file
      fs.unlinkSync(testCsvPath);
    });

    it("should handle JSON file upload", async () => {
      // Create a test JSON file
      const jsonContent = JSON.stringify([
        { name: "John Doe", email: "john@example.com", salary: 50000 },
        { name: "Jane Smith", email: "jane@example.com", salary: 60000 },
      ]);
      const fs = require("fs");
      const path = require("path");
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
      expect(response.body.data.recordsCount).toBeDefined();

      // Clean up test file
      fs.unlinkSync(testJsonPath);
    });

    it("should reject unsupported file types", async () => {
      // Create a test text file
      const txtContent = "This is not a valid payroll file";
      const fs = require("fs");
      const path = require("path");
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
      expect(response.body.message).toContain("Extracted");
      expect(response.body.message).toContain("employees");
      expect(response.body.message).toContain("confidence");
    });

    it("should extract payroll data from CSV file successfully", async () => {
      // Create a test CSV file
      const csvContent =
        "Employee Name,Email,Monthly Salary,Department\nJohn Doe,john@example.com,5000,Engineering\nJane Smith,jane@example.com,6000,Marketing";
      const fs = require("fs");
      const path = require("path");
      const testCsvPath = path.join(__dirname, "templates", "test-extract.csv");

      fs.writeFileSync(testCsvPath, csvContent);

      const response = await request(app)
        .post("/api/v1/employer/extract")
        .set("Authorization", `Bearer ${accessToken}`)
        .attach("payrollFile", testCsvPath);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();

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
      // Create a test text file
      const txtContent = "This is not a valid payroll file";
      const fs = require("fs");
      const path = require("path");
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
      // Create a corrupted Excel file
      const corruptedContent = "This is not a valid Excel file content";
      const fs = require("fs");
      const path = require("path");
      const testCorruptedPath = path.join(
        __dirname,
        "templates",
        "corrupted.xlsx",
      );

      fs.writeFileSync(testCorruptedPath, corruptedContent);

      const response = await request(app)
        .post("/api/v1/employer/extract")
        .set("Authorization", `Bearer ${accessToken}`)
        .attach("payrollFile", testCorruptedPath);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.employees).toHaveLength(0);
      expect(response.body.data.metadata.errors).toBeDefined();

      // Clean up test file
      fs.unlinkSync(testCorruptedPath);
    });
  });

  describe("POST /api/v1/employer/bulk-extract", () => {
    beforeAll(() => {
      // Create test files for bulk processing
      const fs = require("fs");
      const path = require("path");

      // Create CSV file
      const csvContent =
        "name,email,salary\nJohn Doe,john@example.com,50000\nJane Smith,jane@example.com,60000";
      fs.writeFileSync(
        path.join(__dirname, "templates", "bulk1.csv"),
        csvContent,
      );

      // Create JSON file
      const jsonContent = JSON.stringify([
        { name: "Bob Johnson", email: "bob@example.com", salary: 55000 },
        { name: "Alice Brown", email: "alice@example.com", salary: 65000 },
      ]);
      fs.writeFileSync(
        path.join(__dirname, "templates", "bulk2.json"),
        jsonContent,
      );
    });

    afterAll(() => {
      // Clean up test files
      const fs = require("fs");
      const path = require("path");

      try {
        fs.unlinkSync(path.join(__dirname, "templates", "bulk1.csv"));
        fs.unlinkSync(path.join(__dirname, "templates", "bulk2.json"));
      } catch (error) {
        // Files might not exist, ignore errors
      }
    });

    it("should process bulk payroll files successfully", async () => {
      const path = require("path");
      const filePaths = [
        path.join(__dirname, "templates", "bulk1.csv"),
        path.join(__dirname, "templates", "bulk2.json"),
      ];

      const response = await request(app)
        .post("/api/v1/employer/bulk-extract")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ filePaths });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.employees).toBeDefined();
      expect(response.body.data.metadata).toBeDefined();
      expect(response.body.data.metadata.filesProcessed).toBeGreaterThan(0);
      expect(response.body.data.metadata.totalEmployees).toBeGreaterThan(0);
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
      const path = require("path");
      const filePaths = [
        path.join(__dirname, "templates", "bulk1.csv"),
        path.join(__dirname, "templates", "nonexistent.xlsx"),
        path.join(__dirname, "templates", "bulk2.json"),
      ];

      const response = await request(app)
        .post("/api/v1/employer/bulk-extract")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ filePaths });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.metadata.filesProcessed).toBeGreaterThan(0);
      // Should process valid files even if some are invalid
    });

    it("should handle bulk processing errors gracefully", async () => {
      const invalidFilePaths = "not an array";

      const response = await request(app)
        .post("/api/v1/employer/bulk-extract")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ filePaths: invalidFilePaths });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("No file paths provided");
    });
  });

  describe("GET /api/v1/employer/get-employees", () => {
    it("should retrieve the employees for the employer", async () => {
      const response = await request(app)
        .get("/api/v1/employer/get-employees")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      // Add more specific assertions based on the expected response structure
      expect(response.body.data).toBeDefined();
      // You can add more assertions here to validate the response data
      // For example, if you expect the response to be an array of employees:
      // expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should return 401 if not authenticated", async () => {
      const response = await request(app).get("/api/v1/employer/get-employees");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });

    it("should return 403 if the user is not an employer", async () => {
      // Create a user with employee role
      const employeeUser = await createTestUser(
        `employee-${Date.now()}@example.com`,
        "TestPassword123",
        EnumUsersRole.EMPLOYEE,
      );
      const employeeTokens = await generateTokenPair(employeeUser);

      const response = await request(app)
        .get("/api/v1/employer/get-employees")
        .set("Authorization", `Bearer ${employeeTokens.accessToken}`);

      expect(response.status).toBe(403);
      expect(response.body.message).toBeDefined();
    });
  });
});
