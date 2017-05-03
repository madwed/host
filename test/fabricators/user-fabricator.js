import { Factory } from 'rosie';
import faker from 'faker';

import create from './create';
import User from '../../src/models/user';

Factory.define('user').attrs({
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  email: faker.internet.exampleEmail,
  googleId: '',
});

export default function UserFabricator (features = {}) {
  const user = Factory.build('user', features);
  return create({ Class: User, table: 'Users', record: user });
}
