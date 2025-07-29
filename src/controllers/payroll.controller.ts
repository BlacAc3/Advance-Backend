import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { ExtractionResult, PayrollExtractor } from "../utils/payroll"; // Import PayrollExtractor and ExtractionResult

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    cb(null, allowedTypes.includes(file.mimetype));
  },
});

export class PayrollController {
  static uploadMiddleware = upload.single("payrollFile");

  static async extractPayrollData(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      const filePath = req.file.path;
      const fileExtension = path.extname(req.file.originalname).toLowerCase();
      let result: ExtractionResult;

      // Route to appropriate extractor based on file type
      switch (fileExtension) {
        case ".pdf":
          result = await PayrollExtractor.extractFromPDF(filePath);
          break;
        case ".xlsx":
        case ".xls":
          result = await PayrollExtractor.extractFromExcel(filePath);
          break;
        case ".csv":
          result = await PayrollExtractor.extractFromCSV(filePath);
          break;
        default:
          res.status(400).json({ error: "Unsupported file format" });
          return;
      }

      // Clean up uploaded file
      fs.unlinkSync(filePath);

      // Return results
      res.json({
        success: true,
        data: result,
        message: `Extracted ${result.metadata.totalEmployees} employees with ${Math.round(result.metadata.confidence * 100)}% confidence`,
      });
    } catch (error: any) {
      // Add explicit 'any' type to 'error' for demonstration if not configured globally
      // Clean up file if it exists
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
        error: "Extraction failed",
        message: error.message,
      });
    }
  }

  // Endpoint for bulk processing
  static async processBulkPayroll(req: Request, res: Response): Promise<void> {
    try {
      const { filePaths } = req.body;

      if (!Array.isArray(filePaths) || filePaths.length === 0) {
        res.status(400).json({ error: "No file paths provided" });
        return;
      }

      const results: ExtractionResult[] = [];

      for (const filePath of filePaths) {
        try {
          const extension = path.extname(filePath).toLowerCase();
          let result: ExtractionResult;

          switch (extension) {
            case ".pdf":
              result = await PayrollExtractor.extractFromPDF(filePath);
              break;
            case ".xlsx":
            case ".xls":
              result = await PayrollExtractor.extractFromExcel(filePath);
              break;
            case ".csv":
              result = await PayrollExtractor.extractFromCSV(filePath);
              break;
            default:
              continue;
          }

          results.push(result);
        } catch (error) {
          console.error(`Failed to process ${filePath}:`, error);
        }
      }

      // Combine all results
      const combinedEmployees = results.flatMap((r) => r.employees);
      const totalConfidence =
        results.reduce((sum, r) => sum + r.metadata.confidence, 0) /
        results.length;

      res.json({
        success: true,
        data: {
          employees: combinedEmployees,
          metadata: {
            totalEmployees: combinedEmployees.length,
            filesProcessed: results.length,
            averageConfidence: totalConfidence,
            errors: results.flatMap((r) => r.metadata.errors),
          },
        },
      });
    } catch (error: any) {
      // Add explicit 'any' type to 'error' for demonstration if not configured globally
      res.status(500).json({
        error: "Bulk processing failed",
        message: error.message,
      });
    }
  }
}
