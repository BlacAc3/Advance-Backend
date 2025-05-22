import { Request, Response } from 'express';
import { User } from '../models/User';
import { UserRole } from '../types';

export const adminController = {
  async getUsers(_req: Request, res: Response) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'email', 'role', 'isActive', 'createdAt'],
        order: [['createdAt', 'DESC']]
      });
      return res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Error fetching users' });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { role, isActive } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (role && !Object.values(UserRole).includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }

      await user.update({
        role: role || user.role,
        isActive: isActive !== undefined ? isActive : user.isActive
      });

      return res.json({
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Error updating user' });
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Error deleting user' });
    }
  }
}; 