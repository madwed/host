import { Factory } from 'rosie';
import faker from 'faker';
import sequelizeFixtures from 'sequelize-fixtures';

import db from '../../src/models';

Factory.define('ingredientSet').attrs({
  displayOrder: undefined,
  title: faker.commerce.department,
});

export default function IngredientSetFabricator (features = {}) {
  const fixture = {
    model: 'IngredientSet',
    buildOptions: { isNewRecord: true },
    data: Factory.build('ingredientSet', features),
  };

  return sequelizeFixtures.loadFixtures([fixture], db);
}

IngredientSetFabricator.build = function (features = {}) {
  return Factory.build('ingredientSet', features);
};
