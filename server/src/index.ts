import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { insertReading } from './dbUtils';

const app = express();
app.use(bodyParser.json());

/**
 * POST /api/newreading
 * Send a new reading from the sensor to the server
 */
app.post('/api/newreading', (req: Request, res: Response) => {
  const reading: NewReading = req.body;
  console.log('received new reading:', reading);

  try {
    assertReading(reading);
  }
  catch (error) {
    return res.status(400).send(error); // HTTP 400 Bad Request
  }

  insertReading(reading)
    .then(() => res.send(reading))
    .catch(err => res.status(500).send(err)); // HTTP 500 Internal Server Error

  res.send(reading);
});

const assertReading = (reading: NewReading | null) => {
  if (!reading) {
    throw 'Invalid request body';
  }

  const { name, temperature, pressure, humidity } = reading;

  if (!name || typeof name !== 'string' || name.length < 3) {
    throw 'Invalid or missing parameter "name"';
  }
  else if (!temperature || typeof temperature !== 'number') {
    throw 'Invalid or missing parameter "temperature"';
  }
  else if (!pressure || typeof pressure !== 'number') {
    throw 'Invalid or missing parameter "pressure"';
  }
  else if (!humidity || typeof humidity !== 'number') {
    throw 'Invalid or missing parameter "humidity"';
  }
};

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
