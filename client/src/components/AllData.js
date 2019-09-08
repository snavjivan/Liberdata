import React, {Component} from 'react';
import './App.css';
import { Random, Wave } from 'react-animated-text';
import FadeIn from 'react-fade-in';

class AllData extends Component {

  componentDidMount() {
    fetch('http://localhost:5000/user-api/raw-data')
    .then(function(response) {
      return response.json();
    })
    .then(function(responseValue) {
      console.log(JSON.stringify(responseValue));
    }).catch(e => {
      console.log(e);
    })
  }

  render() {
    return (
        <div className="AllData">
        <header className="AllData-header">
          <h1>
          <Wave
            text={"hey, Shark"}
            paused={false}
            iterations={1}
            effect="verticalFadeIn"
            effectChange={2}
            effectDirection="up"
            effectDuration={0.5}
          />
          </h1>
          <FadeIn delay={2000}>
            <div>
              <a
              className="accent"
              >
              We found some data on you
            </a>
            </div>
          </FadeIn>
        </header>
        </div>
    );
  }

}

export default AllData;
