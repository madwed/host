import { Factory } from 'rosie';
import faker from 'faker';
import sequelizeFixtures from 'sequelize-fixtures';

import db from '../../src/models';

Factory.define('user').attrs({
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  email: faker.internet.exampleEmail,
  googleId: '',
});

export default function UserFabricator (features = {}) {
  const fixture = {
    model: 'User',
    buildOptions: { isNewRecord: true },
    data: Factory.build('user', features),
  };

  return sequelizeFixtures.loadFixtures([fixture], db);
}
