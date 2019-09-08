import React, {Component} from 'react';
import './App.css';
import FadeIn from 'react-fade-in';
import { Button, Icon, Tag } from 'antd';

class Sell extends Component {

  render() {
    return (
        <div className="Sell">
        <header className="Sell-header">
          <FadeIn delay={750}>
            <div>
            <h1 className="main">
              Take back your data
            </h1>
            </div>
            <div className="accent">
            We estimated the its monetary worth.
            <br/>
            <br/>
            </div>
            <div>
            <Tag color="red">Youtube - $14.99</Tag>
            <Tag>Facebook - $21.15</Tag>
            <Tag color="orange">Google - $80.04</Tag>
            <Tag color="volcano">Reddit - $1.20</Tag>
            <br/>
            This data could earn you <b>$96.59</b> per year.
            <br/>
            <br/>
            </div>
            <div className="accent">
              <p>Your top interest was "Arts" - here are related data brokers:</p>
              <div className="main">
              <p>Walmart Photo Center - <Button type="primary">
        Connect
        <Icon type="right" />
      </Button></p>
              <p>TOPS Friendly Markets - <Button type="primary">
        Connect
        <Icon type="right" />
      </Button></p>
              <p>Purdue University Galleries - <Button type="primary">
        Connect
        <Icon type="right" />
      </Button></p>
              </div>
            </div>
          </FadeIn>
        </header>
        </div>
    );
  }

}

export default Sell;
