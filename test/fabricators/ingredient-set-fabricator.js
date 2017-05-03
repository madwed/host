import { Factory } from 'rosie';
import faker from 'faker';

import create from './create';
import IngredientSet from '../../src/models/ingredient-set';

Factory.define('ingredientSet').attrs({
  displayOrder: undefined,
  title: faker.commerce.department,
});

export default function IngredientSetFabricator (features = {}) {
  const ingredientSet = Factory.build('ingredientSet', features);
  return create({
    Class: IngredientSet,
    table: 'IngredientSets',
    record: ingredientSet,
  });
}

IngredientSetFabricator.build = function (features = {}) {
  return Factory.build('ingredientSet', features);
};
