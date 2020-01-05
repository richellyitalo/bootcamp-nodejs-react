import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        // const hashedPassword = await new Promise((resolve, reject) => {
        //   bcrypt.hash('1222233', 8, (err, hash) => {
        //     if (err) reject(err);
        //     resolve(hash);
        //   });
        // });
        user.password_hash = await bcrypt.hash(`${user.password}`, 8);
      }
    });

    return this;
  }
}

export default User;
