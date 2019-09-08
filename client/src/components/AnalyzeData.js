import React, {Component} from 'react';
import './App.css';
import FadeIn from 'react-fade-in';
import { Card, Col, Row, Skeleton, Icon, Avatar } from 'antd';

const { Meta } = Card;

class AnalyzeData extends Component {

  constructor() {
    super();
    this.state = {
        topSites: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/user-api/top-sites')
      .then(function(response) {
        return response.json();
      })
      .then(function(responseValue) {
        this.setState({topSites: JSON.stringify(responseValue)});
      }).catch(e => {
        console.log(e);
      })
  }

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
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title="Card title"
                        description={
                          <div>
                            {
                              this.state.topSites.map((site, number) => (
                                <p>{site}</p>
                              ))
                            }
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
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title="Card title"
                        description={
                          <div>
                            <p>Bullet 1</p>
                            <p>Bullet 2</p>
                            <p>Bullet 3</p>
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
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title="Card title"
                        description={
                          <div>
                            <p>Bullet 1</p>
                            <p>Bullet 2</p>
                            <p>Bullet 3</p>
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
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title="Card title"
                        description={
                          <div>
                            <p>Bullet 1</p>
                            <p>Bullet 2</p>
                            <p>Bullet 3</p>
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
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title="Card title"
                        description={
                          <div>
                            <p>Bullet 1</p>
                            <p>Bullet 2</p>
                            <p>Bullet 3</p>
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
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title="Card title"
                        description={
                          <div>
                            <p>Bullet 1</p>
                            <p>Bullet 2</p>
                            <p>Bullet 3</p>
                          </div>
                        }
                      />
                    </Skeleton>
                  </Card>
                </Col>
              </Row>
            </div>
        </FadeIn>
      </header>
      </div>
    );
  }

}

export default AnalyzeData;
