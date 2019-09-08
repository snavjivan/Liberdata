import React, {Component} from 'react';
import './App.css';
import FadeIn from 'react-fade-in';
import { Card, Col, Row, Skeleton, Icon, Avatar, Button } from 'antd';

const { Meta } = Card;

class AnalyzeData extends Component {

  // constructor() {
  //   super();
  //   this.state = {
  //       topSites: []
  //   }
  // }
  //
  // componentDidMount() {
  //   fetch('http://localhost:5000/user-api/search-interests')
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((responseValue) => {
  //       this.setState({topSites: JSON.stringify(responseValue)});
  //     }).catch(e => {
  //       console.log(e);
  //     })
  // }

  render() {
    return (
      <div className="AnalyzeData">
      <header className="AnalyzeData-header">
        <FadeIn delay={1000}>
          <div>
            <h1 className="main">
              We found some trends
            </h1>
          </div>
            <div>
              <Row gutter={16}>
                <Col span={8}>
                  <Card
                    style={{ width: 280, marginTop: 16 }}
                    actions={[
                      <Icon type="download" key="download" />
                    ]}
                  >
                    <Skeleton loading={false} avatar active>
                      <Meta
                        avatar={
                          <Avatar src="data:image/png;base64,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" />
                        }
                        title="Top Sites"
                        description={
                          <div>
                            <ul>
                              <li>www.reddit.com</li>
                              <li>www.facebook.com</li>
                              <li>www.youtube.com</li>
                              <li>www.messenger.com</li>
                            </ul>
                          </div>
                        }
                      />
                    </Skeleton>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    style={{ width: 280, marginTop: 16 }}
                    actions={[
                      <Icon type="download" key="download" />
                    ]}
                  >
                    <Skeleton loading={false} avatar active>
                      <Meta
                        avatar={
                          <Avatar src="https://img.icons8.com/pastel-glyph/2x/search--v2.png" />
                        }
                        title="Search Interests"
                        description={
                          <div>
                            <ul>
                              <li>Online Communities</li>
                              <li>Arts & Entertainment</li>
                              <li>Social Networks</li>
                              <li>Programming</li>
                            </ul>
                          </div>
                        }
                      />
                    </Skeleton>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    style={{ width: 280, marginTop: 16 }}
                    actions={[
                      <Icon type="download" key="download" />
                    ]}
                  >
                    <Skeleton loading={false} avatar active>
                      <Meta
                        avatar={
                          <Avatar src="https://www.pinclipart.com/picdir/middle/123-1236933_envelope-message-send-mail-packet-letter-email-email.png" />
                        }
                        title="Email Interests"
                        description={
                          <div>
                            <ul>
                              <li>Internet & Telecom</li>
                            </ul>
                          </div>
                        }
                      />
                    </Skeleton>
                  </Card>
                </Col>
              </Row>
            </div>
            <div>
              <Row gutter={16}>
                <Col span={8}>
                  <Card
                    style={{ width: 280, marginTop: 16 }}
                    actions={[
                      <Icon type="download" key="download" />
                    ]}
                  >
                    <Skeleton loading={false} avatar active>
                      <Meta
                        avatar={
                          <Avatar src="https://marketplace.canva.com/MAB7k9BEo1A/1/thumbnail_large/canva-play-video-icon-MAB7k9BEo1A.png" />
                        }
                        title="Recent Videos"
                        description={
                          <div>
                            <ul>
                              <li>UFC 242 Interview</li>
                              <li>Ride Slow (Official Music Video)</li>
                              <li>Diamonds (Iccarus Remix)</li>
                            </ul>
                          </div>
                        }
                      />
                    </Skeleton>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    style={{ width: 280, marginTop: 16 }}
                    actions={[
                      <Icon type="download" key="download" />
                    ]}
                  >
                    <Skeleton loading={false} avatar active>
                      <Meta
                        avatar={
                          <Avatar src="https://cdn1.iconfinder.com/data/icons/iconza-circle-social/64/697057-facebook-512.png" />
                        }
                        title="Facebook Interests"
                        description={
                          <div>
                            <ul>
                              <li>None</li>
                            </ul>
                          </div>
                        }
                      />
                    </Skeleton>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    style={{ width: 280, marginTop: 16 }}
                    actions={[
                      <Icon type="download" key="download" />
                    ]}
                  >
                    <Skeleton loading={false} avatar active>
                      <Meta
                        avatar={
                          <Avatar src="https://cdn0.iconfinder.com/data/icons/social-media-2092/100/social-36-512.png" />
                        }
                        title="Reddit Interests"
                        description={
                          <div>
                            <ul>
                              <li>Music & Audio</li>
                              <li>Arts & Entertainment</li>
                            </ul>
                          </div>
                        }
                      />
                    </Skeleton>
                  </Card>
                </Col>
              </Row>
              <br/>
            </div>
            <div>
            <Button
            type="primary"
            shape="round"
            size="large"
            onClick={() => this.props.history.push('/sell')}
            >
              Liberate your data <Icon type="right" />
            </Button>
            </div>
        </FadeIn>
      </header>
      </div>
    );
  }

}

export default AnalyzeData;
