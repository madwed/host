import Sequelize from 'sequelize';

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
    },
    instanceMethods: {
      getClassName: () => 'User',
    },
  });

  return User;
};

