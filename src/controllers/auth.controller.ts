import { Request, Response } from 'express';
import { User } from '../models/User';
import { generateTokenPair } from '../utils/jwt';
import { hashPassword, comparePassword } from '../utils/password';
import { UserRole } from '../types';
import { CreationAttributes } from 'sequelize';

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password, role = 'USER' } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await hashPassword(password);
      const user = await User.create({
        email,
        password: hashedPassword,
        role: role as UserRole,
        isActive: true
      } as CreationAttributes<User>);

      const { accessToken, refreshToken } = generateTokenPair({ userId: user.id, role: user.role });
      res.status(201).json({ 
        accessToken, 
        refreshToken,
        user: { id: user.id, email: user.email, role: user.role } 
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      if (!user.isActive) {
        return res.status(403).json({ message: 'Account is deactivated' });
      }

      const { accessToken, refreshToken } = generateTokenPair({ userId: user.id, role: user.role });
      res.json({ 
        accessToken, 
        refreshToken,
        user: { id: user.id, email: user.email, role: user.role } 
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  },

  async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const user = await User.findByPk(userId, {
        attributes: ['id', 'email', 'role', 'walletAddress', 'createdAt']
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Error fetching profile' });
    }
  },

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { email, password } = req.body;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (email) {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser && existingUser.id !== userId) {
          return res.status(400).json({ message: 'Email already in use' });
        }
        user.email = email;
      }

      if (password) {
        user.password = await hashPassword(password);
      }

      await user.save();
      res.json({ id: user.id, email: user.email, role: user.role });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Error updating profile' });
    }
  },

  async logout(req: Request, res: Response) {
    // Since we're using JWT tokens, we don't need to do anything on the server side
    // The client should remove the token
    res.json({ message: 'Logged out successfully' });
  },

  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'email', 'role', 'walletAddress', 'createdAt'],
        order: [['createdAt', 'DESC']]
      });
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  }
}; 