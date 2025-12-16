import request from 'supertest';
import express from 'express';
import { authRouter } from '../transport/http/routes/auth.routes';
import { setupTestDatabase, teardownTestDatabase, clearDatabase, getTestDb } from './helpers/testDb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-local';
const app = express();
app.use(express.json());
app.use('/admin/auth', authRouter);

// Mock getDb
jest.mock('../storage/mongo', () => ({
  getDb: () => getTestDb(),
}));

describe('Auth Routes', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  afterAll(async () => {
    await teardownTestDatabase();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  describe('POST /admin/auth/login', () => {
    it('should login with valid credentials and return token', async () => {
      const db = getTestDb();
      const passwordHash = await bcrypt.hash('password123', 10);
      await db.collection('users').insertOne({
        name: 'Test User',
        email: 'test@example.com',
        passwordHash,
        roles: ['admin'],
        active: true,
      });

      const response = await request(app)
        .post('/admin/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBeDefined();
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.user.email).toBe('test@example.com');
      expect(response.body.data.user.roles).toEqual(['admin']);

      // Verify token is valid
      const decoded = jwt.verify(response.body.data.token, JWT_SECRET) as any;
      expect(decoded.email).toBe('test@example.com');
      expect(decoded.roles).toEqual(['admin']);
    });

    it('should reject login with invalid email format', async () => {
      const response = await request(app)
        .post('/admin/auth/login')
        .send({ email: 'not-an-email', password: 'password123' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid payload');
    });

    it('should reject login with short password', async () => {
      const response = await request(app)
        .post('/admin/auth/login')
        .send({ email: 'test@example.com', password: '12345' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should reject login with non-existent user', async () => {
      const response = await request(app)
        .post('/admin/auth/login')
        .send({ email: 'nonexistent@example.com', password: 'password123' });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should reject login with inactive user', async () => {
      const db = getTestDb();
      const passwordHash = await bcrypt.hash('password123', 10);
      await db.collection('users').insertOne({
        name: 'Inactive User',
        email: 'inactive@example.com',
        passwordHash,
        roles: ['admin'],
        active: false,
      });

      const response = await request(app)
        .post('/admin/auth/login')
        .send({ email: 'inactive@example.com', password: 'password123' });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should reject login with wrong password', async () => {
      const db = getTestDb();
      const passwordHash = await bcrypt.hash('correctpassword', 10);
      await db.collection('users').insertOne({
        name: 'Test User',
        email: 'test@example.com',
        passwordHash,
        roles: ['admin'],
        active: true,
      });

      const response = await request(app)
        .post('/admin/auth/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should include all user roles in token', async () => {
      const db = getTestDb();
      const passwordHash = await bcrypt.hash('password123', 10);
      await db.collection('users').insertOne({
        name: 'Multi-Role User',
        email: 'multirole@example.com',
        passwordHash,
        roles: ['admin', 'waiter', 'cook'],
        active: true,
      });

      const response = await request(app)
        .post('/admin/auth/login')
        .send({ email: 'multirole@example.com', password: 'password123' });

      expect(response.status).toBe(200);
      const decoded = jwt.verify(response.body.data.token, JWT_SECRET) as any;
      expect(decoded.roles).toEqual(['admin', 'waiter', 'cook']);
    });

    it('should not include passwordHash in response', async () => {
      const db = getTestDb();
      const passwordHash = await bcrypt.hash('password123', 10);
      await db.collection('users').insertOne({
        name: 'Test User',
        email: 'test@example.com',
        passwordHash,
        roles: ['admin'],
        active: true,
      });

      const response = await request(app)
        .post('/admin/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body.data.user.passwordHash).toBeUndefined();
    });

    it('should reject missing email', async () => {
      const response = await request(app)
        .post('/admin/auth/login')
        .send({ password: 'password123' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should reject missing password', async () => {
      const response = await request(app)
        .post('/admin/auth/login')
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should handle case-sensitive email correctly', async () => {
      const db = getTestDb();
      const passwordHash = await bcrypt.hash('password123', 10);
      await db.collection('users').insertOne({
        name: 'Test User',
        email: 'test@example.com',
        passwordHash,
        roles: ['admin'],
        active: true,
      });

      // MongoDB es case-sensitive por defecto
      const response = await request(app)
        .post('/admin/auth/login')
        .send({ email: 'TEST@EXAMPLE.COM', password: 'password123' });

      expect(response.status).toBe(401); // No coincide exactamente
    });
  });
});
