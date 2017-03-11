import { Factory } from 'rosie';
import faker from 'faker';
import sequelizeFixtures from 'sequelize-fixtures';

import db from '../../src/models';

Factory.define('ingredient').attrs({
  displayOrder: undefined,
  text: faker.company.catchPhrase,
});

export default function IngredientFabricator (features = {}) {
  const fixture = {
    model: 'Ingredient',
    buildOptions: { isNewRecord: true },
    data: Factory.build('ingredient', features),
  };

  return sequelizeFixtures.loadFixtures([fixture], db);
}

IngredientFabricator.build = function (features = {}) {
  return Factory.build('ingredient', features);
};
