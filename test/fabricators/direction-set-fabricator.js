import { Factory } from 'rosie';
import faker from 'faker';
import sequelizeFixtures from 'sequelize-fixtures';

import db from '../../src/models';
import DirectionFabricator from './direction-fabricator';

Factory.define('directionSet').attrs({
  displayOrder: undefined,
  title: faker.commerce.department,
});

export default function DirectionSetFabricator (features = {}) {
  const fixture = {
    model: 'DirectionSet',
    buildOptions: { isNewRecord: true },
    data: Factory.build('directionSet', features),
  };

  return sequelizeFixtures.loadFixtures([fixture], db);
}

DirectionSetFabricator.build = function (features = {}) {
  return Factory.build('directionSet', features);
};
