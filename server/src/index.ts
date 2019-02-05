import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

/**
 * POST /api/newreading
 * Send a new reading from the sensor to the server
 */
app.post('/api/newreading', (req, res) => {
  console.log('received new reading:', req.body);
  res.send(req.body);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
