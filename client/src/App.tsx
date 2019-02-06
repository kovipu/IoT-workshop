import React, { Component } from 'react';

interface State {
  sensors: {
    isLoading: boolean,
    data: Sensor[],
    error: any
  },
  readings: {
    isLoading: boolean,
    data: Reading[],
    error: any
  }
}

class App extends Component<{}, State> {
  render() {
    return (
      <div className="App">
        Morjesta!
      </div>
    );
  }
}

export default App;
