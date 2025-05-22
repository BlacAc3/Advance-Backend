import { User } from '../../models/User';
import { UserRole } from '../../types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Optional } from 'sequelize';

export const createTestUser = async (role: UserRole = UserRole.EMPLOYEE) => {
  const email = `test.${role.toLowerCase()}@example.com`;
  const password = 'testPassword123';
  const hashedPassword = await bcrypt.hash(password, 10);
  const walletAddress = '0x' + '1'.repeat(40);

  const user = await User.create({
    email,
    password: hashedPassword,
    role,
    walletAddress,
    isActive: true
  });

  return user;
};

export const generateTestTokens = (user: User) => {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
}; 