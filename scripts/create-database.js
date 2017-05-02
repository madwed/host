const fs = require('fs');
const path = require('path');

const migrationDirectory = path.join(__dirname, '../db/migrations');
const migrations = fs.readdirSync(migrationDirectory);

migrations.sort().forEach((migration) => {
  require(path.join(migrationDirectory, migration));
});
