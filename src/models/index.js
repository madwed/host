'use strict';

import Sequelize from 'sequelize';
import path from 'path';

import configOptions from '../config/config.json';

import Direction from './models/direction';
import DirectionSet from './models/direction-set';
import Ingredient from './models/ingredient';
import IngredientSet from './models/ingredient-set';
import Recipe from './models/recipe';

const env = process.env.NODE_ENV || 'development';
const config = configOptions[env];

let db = {
  sequelize: new Sequelize(config.database, config.username, config.password, config),
};

const models = {
  Direction,
  DirectionSet,
  Ingredient,
  IngredientSet,
  Recipe,
};

Object.keys(models).forEach(modelName => {
  db[modelName] = models[modelName](db.sequelize);
});

Object.keys(models).forEach(modelName => {
  if (db[modelName].associate) { db[modelName].associate(db); }
});

export default db;
