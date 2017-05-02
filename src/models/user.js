import ApplicationModel from './application';

export default class User extends ApplicationModel {
  tableName = 'Users'

  static findByGoogleId(googleId) {
    return super.find({ Key: { googleId } }).then((data) => new User(data));
  }
}

export default (sequelize) => {
  const User = sequelize.define('users', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      field: 'first_name',
      type: Sequelize.TEXT,
    }
    lastName: {
      field: 'last_name',
      type: Sequelize.TEXT,
    },
    email: Sequelize.TEXT,
    googleId: {
      field: 'google_id',
      type: Sequelize.TEXT,
    },
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

      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      first_name: Sequelize.TEXT,
      last_name: Sequelize.TEXT,
      email: Sequelize.TEXT,
      google_id: Sequelize.TEXT,

