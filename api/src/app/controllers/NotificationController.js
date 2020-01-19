import Notification from '../../database/schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });
    if (!checkUserProvider) {
      return res.status(401).json({ error: 'É necessário ser um fornecedor.' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({
        createdAt: 'desc',
      })
      .limit(20);
    return res.json(notifications);
  }

  async update(req, res) {
    const checkUserProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });
    if (!checkUserProvider) {
      return res.status(401).json({ error: 'É necessário ser um fornecedor.' });
    }

    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id },
      {
        read: true,
      },
      {
        new: true,
      }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
