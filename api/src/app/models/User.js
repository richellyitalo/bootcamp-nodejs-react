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

    this.addHook('beforeSave', async (user, opt) => {
      if (user.password) {
        try {
          const c = await bcrypt.hash('3333', 8);
          console.log(c);
        } catch (err) {
          console.log('deu ruim', err);
        }
      }
    });

    return this;
  }
}

export default User;
