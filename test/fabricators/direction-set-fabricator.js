import { Factory } from 'rosie';
import faker from 'faker';

import create from './create';
import DirectionSet from '../../src/models/direction-set';

Factory.define('directionSet').attrs({
  displayOrder: undefined,
  title: faker.commerce.department,
});

export default function DirectionSetFabricator (features = {}) {
  const directionSet = Factory.build('directionSet', features);
  return create({
    Class: DirectionSet,
    table: 'DirectionSets',
    record: directionSet,
  });
}

DirectionSetFabricator.build = function (features = {}) {
  return Factory.build('directionSet', features);
};
