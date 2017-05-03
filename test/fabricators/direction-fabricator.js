import { Factory } from 'rosie';
import faker from 'faker';

import create from './create';
import Direction from '../../src/models/direction';

Factory.define('direction').attrs({
  displayOrder: undefined,
  text: faker.lorem.paragraph,
});

export default function DirectionFabricator (features = {}) {
  const direction = Factory.build('direction', features);
  return create({ Class: Direction, table: 'Directions', record: direction });
}

DirectionFabricator.build = function (features = {}) {
  return Factory.build('direction', features);
};
