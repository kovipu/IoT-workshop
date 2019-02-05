import sqlite from 'sqlite';

// initialize database
const dbPromise = Promise.resolve()
  .then(() => sqlite.open('database.db'))
  .then(db => db.migrate({ force: 'last' }));
