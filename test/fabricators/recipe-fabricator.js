import { Factory } from 'rosie';
import faker from 'faker';
import random from 'lodash.random';
import sample from 'lodash.sample';

import create from './create';
import Recipe from '../../src/models/recipe';

Factory.define('recipe').attrs({
  activeTime: '1.5 hours',
  description: () => {
    if (random(0, 5)) { return faker.lorem.paragraph(); }
  },
  favorite: false,
  imageUrl: () => {
    if (random(0, 5)) { return faker.image.food(640, 480, true); }
  },
  note: () => {
    if (!random(0, 5)) { return faker.lorem.paragraph(); }
  },
  servings: () => `${random(1, 32)} servings`,
  source: () => sample(['New York Times', 'Bon Appetit', 'All Recipes', undefined]),
  title: () => `${faker.commerce.productAdjective()} ${faker.commerce.productName()}`,
  totalTime: '3 hours',
});

export default function RecipeFabricator (features = {}) {
  const recipe = Factory.build('recipe', features);
  return create({ Class: Recipe, table: 'Recipes', record: recipe });
}

RecipeFabricator.build = function (features = {}) {
  return Factory.build('recipe', features);
}
