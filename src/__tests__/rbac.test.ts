import request from 'supertest';
import app from '../index';
import { UserRole } from '../models/User';
import { createTestUser, generateTestTokens } from './utils/testUtils';

describe('Role-Based Access Control', () => {
  describe('Admin Routes', () => {
    let adminToken: string;
    let employeeToken: string;

    beforeEach(async () => {
      const admin = await createTestUser(UserRole.ADMIN);
      const employee = await createTestUser(UserRole.EMPLOYEE);
      
      adminToken = generateTestTokens(admin).accessToken;
      employeeToken = generateTestTokens(employee).accessToken;
    });

    describe('GET /api/v1/admin/users', () => {
      it('should allow admin to get all users', async () => {
        const response = await request(app)
          .get('/api/v1/admin/users')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(Array.isArray(response.body.data.users)).toBe(true);
      });

      it('should not allow employee to get all users', async () => {
        const response = await request(app)
          .get('/api/v1/admin/users')
          .set('Authorization', `Bearer ${employeeToken}`);

        expect(response.status).toBe(403);
        expect(response.body.status).toBe('error');
      });
    });

    describe('POST /api/v1/admin/users', () => {
      it('should allow admin to create new user', async () => {
        const newUser = {
          email: 'new.user@example.com',
          password: 'TestPassword123!',
          role: UserRole.EMPLOYEE,
          walletAddress: '0x' + '2'.repeat(40)
        };

        const response = await request(app)
          .post('/api/v1/admin/users')
          .set('Authorization', `Bearer ${adminToken}`)
          .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body.status).toBe('success');
        expect(response.body.data.user.email).toBe(newUser.email);
      });

      it('should not allow employee to create new user', async () => {
        const newUser = {
          email: 'new.user@example.com',
          password: 'TestPassword123!',
          role: UserRole.EMPLOYEE,
          walletAddress: '0x' + '2'.repeat(40)
        };

        const response = await request(app)
          .post('/api/v1/admin/users')
          .set('Authorization', `Bearer ${employeeToken}`)
          .send(newUser);

        expect(response.status).toBe(403);
        expect(response.body.status).toBe('error');
      });
    });
  });

  describe('Employee Routes', () => {
    let employeeToken: string;
    let adminToken: string;

    beforeEach(async () => {
      const employee = await createTestUser(UserRole.EMPLOYEE);
      const admin = await createTestUser(UserRole.ADMIN);
      
      employeeToken = generateTestTokens(employee).accessToken;
      adminToken = generateTestTokens(admin).accessToken;
    });

    describe('GET /api/v1/employee/profile', () => {
      it('should allow employee to get their profile', async () => {
        const response = await request(app)
          .get('/api/v1/employee/profile')
          .set('Authorization', `Bearer ${employeeToken}`);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.user.role).toBe(UserRole.EMPLOYEE);
      });

      it('should not allow admin to access employee profile endpoint', async () => {
        const response = await request(app)
          .get('/api/v1/employee/profile')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(403);
        expect(response.body.status).toBe('error');
      });
    });

    describe('PUT /api/v1/employee/profile', () => {
      it('should allow employee to update their profile', async () => {
        const updateData = {
          name: 'Updated Name',
          phoneNumber: '+1234567890'
        };

        const response = await request(app)
          .put('/api/v1/employee/profile')
          .set('Authorization', `Bearer ${employeeToken}`)
          .send(updateData);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.user.name).toBe(updateData.name);
      });

      it('should not allow admin to update employee profile', async () => {
        const updateData = {
          name: 'Updated Name',
          phoneNumber: '+1234567890'
        };

        const response = await request(app)
          .put('/api/v1/employee/profile')
          .set('Authorization', `Bearer ${adminToken}`)
          .send(updateData);

        expect(response.status).toBe(403);
        expect(response.body.status).toBe('error');
      });
    });
  });

  describe('Public Routes', () => {
    it('should allow access to public endpoints without authentication', async () => {
      const response = await request(app)
        .get('/api/v1/public/health');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
    });
  });
}); 