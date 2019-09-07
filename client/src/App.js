import React, {Component} from 'react';
import logo from './logo.png';
import './App.css';

class App extends Component {
  state = {list: []}

  //grabs json from the /api/list route
  componentDidMount() {
    fetch('/api/list')
      .then(res => res.json())
      .then(list => this.setState({ list }));
  }

  render() {
    return (
        <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>
            Liberdata
            </h1>
            <a
            className="App-link"
            >
            Disrupting personal data
            </a>
        </header>
        <h1>List -- this is grabbing stuff from the back end</h1>
            <div>{this.state.list}</div>
        </div>
    );
  }
}

export default App;
