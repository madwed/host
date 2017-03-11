import { Factory } from 'rosie';
import faker from 'faker';
import sequelizeFixtures from 'sequelize-fixtures';

import db from '../../src/models';

Factory.define('direction').attrs({
  displayOrder: undefined,
  text: faker.lorem.paragraph,
});

export default function DirectionFabricator (features = {}) {
  const fixture = {
    model: 'Direction',
    buildOptions: { isNewRecord: true },
    data: Factory.build('direction', features),
  };

  return sequelizeFixtures.loadFixtures([fixture], db);
}

DirectionFabricator.build = function (features = {}) {
  return Factory.build('direction', features);
};
