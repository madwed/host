import { fromGlobalId, nodeDefinitions } from 'graphql-relay';

import db from '../models';

let types = {};

export const { nodeField, nodeInterface } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    return db[type].findById(id);
  },
  (obj) => types[obj.getClassName()],
);

export function addType (update) {
  types = { ...types, ...update };
};
