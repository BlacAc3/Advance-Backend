import nodemailer from 'nodemailer';
import { compile } from 'handlebars';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ApiError } from './ApiError';

interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Load and compile email templates
const templates: Record<string, HandlebarsTemplateDelegate> = {};

const loadTemplate = (templateName: string): HandlebarsTemplateDelegate => {
  if (templates[templateName]) {
    return templates[templateName];
  }

  try {
    const templatePath = join(__dirname, '../templates/emails', `${templateName}.hbs`);
    const template = readFileSync(templatePath, 'utf-8');
    templates[templateName] = compile(template);
    return templates[templateName];
  } catch (error) {
    throw new ApiError(500, `Failed to load email template: ${templateName}`);
  }
};

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const template = loadTemplate(options.template);
    const html = template(options.data);

    await transporter.sendMail({
      from: `"AdvancePay" <${process.env.SMTP_FROM}>`,
      to: options.to,
      subject: options.subject,
      html
    });
  } catch (error) {
    throw new ApiError(500, 'Failed to send email');
  }
}; 