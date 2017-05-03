import { Factory } from 'rosie';
import faker from 'faker';

import create from './create';
import Ingredient from '../../src/models/ingredient';

Factory.define('ingredient').attrs({
  displayOrder: undefined,
  quantity: () => `${(Math.random() * 10).toFixed(1)} cups`,
  text: faker.company.catchPhrase,
});

export default function IngredientFabricator (features = {}) {
  const ingredient = Factory.build('ingredient', features);

  return create({
    Class: Ingredient,
    table: 'Ingredients',
    record: ingredient,
  });
}

IngredientFabricator.build = function (features = {}) {
  return Factory.build('ingredient', features);
};
