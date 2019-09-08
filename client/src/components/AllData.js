import React, {Component} from 'react';
import './App.css';
import { Random, Wave } from 'react-animated-text';
import FadeIn from 'react-fade-in';
import { Button, Icon } from 'antd';

class AllData extends Component {

  render() {
    return (
        <div className="AllData">
        <header className="AllData-header">
          <h1 className="main">
          <Wave
            text={"hey, Sarthak"}
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
              <span
              className="accent"
              >
              We collected all your personal data you've put on the web.
            </span>
            <br/>
            <br/>
            <br/>
            </div>
            <div>
              If you want, you can download all of your raw data.
              <br/>
              <Button
              type="primary"
              shape="round"
              icon="download"
              size="default"
              onClick={() => fetch('http://localhost:5000/user-api/raw-data')
                .then(function(response) {
                  return response.json();
                })
                .then(function(responseValue) {
                  var data = JSON.stringify(responseValue);
                  var fileDownload = require('js-file-download');
                  fileDownload(data, 'data.txt');
                }).catch(e => {
                  console.log(e);
                })}
              >
                Download
              </Button>
              <br/>
              <br/>
              <br/>
            </div>
            <div className="accent">
            Now, let's take a deeper look.
            <br/>
            <Button
            type="primary"
            shape="round"
            size="large"
            onClick={() => this.props.history.push('/analyze')}
            >
              Analyze my data <Icon type="right" />
            </Button>
            </div>
          </FadeIn>
        </header>
        </div>
    );
  }

}

export default AllData;
