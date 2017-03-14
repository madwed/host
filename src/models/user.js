import Sequelize from 'sequelize';
import db from './';

export default (sequelize) => {
  const User = sequelize.define('users', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    firstName: Sequelize.TEXT,
    lastName: Sequelize.TEXT,
    email: Sequelize.TEXT,
    googleId: Sequelize.TEXT,
  }, {
    classMethods: {
      associate: (models) => {
        models.User.hasMany(models.Recipe);
      },
      findByGoogleId: (googleId) => {
        return db.User.findOne({ where: { googleId } }).then((user) => {
          if (!user) { return null; }
          return user;
        }).catch((err) => {
          console.log('Error finding User by googleId');
          return null;
        });
      },
    },
    instanceMethods: {
      getClassName: () => 'User',
    },
  });

  return User;
};

