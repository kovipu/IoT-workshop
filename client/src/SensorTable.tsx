import React from 'react';
import { Table } from 'react-bootstrap';

interface Props {
  data: Sensor[],
  error: any
}

const SensorTable = ({ data, error }: Props) => (
  <div>Sensorit</div>
);

export default SensorTable;
