import sqlite from 'sqlite';
import SQL from 'sql-template-strings';

// initialize database
const dbPromise = Promise.resolve()
  .then(() => sqlite.open('database.db'))
  .then(db => db.migrate({ force: 'last' }));

/**
 * Insert a reading into the table 'reading'
 * and update 'sensor' table accordingly
 */
const insertReading = (reading: NewReading) => {
  const { name, temperature, pressure, humidity } = reading;
  const timestamp = new Date().toISOString();

  // if the sensor is not in the 'sensor' table insert it
  const insertSensorQuery = SQL`
    INSERT OR IGNORE INTO sensor (name, firstonline, lastonline)
    VALUES (${name}, ${timestamp}, ${timestamp})
  `;

  // update the sensor's last online time
  const updateSensorQuery = SQL`
    UPDATE sensor
    SET lastonline = ${timestamp} WHERE name = ${name}
  `;

  // insert a reading into the table 'reading'
  const insertReadingQuery = SQL`
    INSERT INTO Reading (sensorname, temperature, pressure, humidity, timestamp)
    VALUES (${name}, ${temperature}, ${pressure}, ${humidity}, ${timestamp})
  `;

  return dbPromise
    .then(db => Promise.all([
      db.run(insertSensorQuery),
      db.run(updateSensorQuery),
      db.run(insertReadingQuery)
    ]))
    .then(() => console.log('Succesfully inserted reading into database,'))
};

export { insertReading };
