import React, { Component } from 'react';

interface State {
  sensors: {
    data: Sensor[],
    error: any
  },
  readings: {
    data: Reading[],
    error: any
  }
}

class App extends Component<{}, State> {
  state = {
    sensors: {
      data: [],
      error: null
    },
    readings: {
      data: [],
      error: null
    }
  };



  async fetchSensors() {
    try {
      const response = await fetch('/api/getsensors');

      if (!response.ok) {
        throw Error(response.statusText)
      }

      const data: Sensor[] = await response.json();

      this.setState({
        sensors: {
          data,
          error: null
        }
      });
    }
    catch (error) {
      this.setState({
        sensors: {
          data: [],
          error: error.toString()
        }
      });
    }
  }

  render() {
    return (
      <div className="App">
        Morjesta!
      </div>
    );
  }
}

export default App;
