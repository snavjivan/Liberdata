import React, {Component} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Link } from "react-router-dom";
import Login from './components/Login'
import AllData from './components/AllData'

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
      <Router basename="/">
        <Route exact path="/" component={Login}/>
        <Route exact path="/alldata" component={AllData}/>
      </Router>
    );
  }
}

export default App;
