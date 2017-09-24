import React, { Component } from 'react';
import Background from './Components/Background';
import { withScreenSize } from '@vx/responsive';
import styled from 'styled-components';
import Chart from './Components/Chart';
import formatPrice from './Utils/formatPrice';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  //Grab our data from the coindesk api
  componentDidMount() {
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then(res => res.json())
      .then(json => {
        this.setState({
          data: json
        });
      });
  }
  render() {
    const { screenWidth, screenHeight } = this.props;
    const { data } = this.state;

    //Conditional Rendering to ensure the data is loaded when trying to render
    //TODO Bring in nice neat loading component
    if (!data.bpi) return <div>loading...</div>;

    //Format our data to the desired shape
    const prices = Object.keys(data.bpi).map(d => {
      return {
        date: d,
        price: data.bpi[d]
      };
    });

    //Most current price is grabbed from the last element in our dataset
    const currentPrice = prices[prices.length - 1].price;
    const firstPrice = prices[0].price;
    const diffPrice = currentPrice - firstPrice;
    const hasIncreased = diffPrice > 0;

    return (
      <div className={this.props.className}>
        <Background width={screenWidth} height={screenHeight} />
        <Center>
          <ChartContainer>
            <TitleBar>
              <Title>
                <div>Bitcoin Price</div>
                <div>
                  <small style={{ color: '#6086D6', fontSize: '14px' }}>
                    last 30 days
                  </small>
                </div>
              </Title>
              <Prices>
                <div>{formatPrice(currentPrice)}</div>
                <div className={hasIncreased ? 'increased' : 'decreased'}>
                  <small>
                    {hasIncreased ? '+' : '-'}
                    {formatPrice(diffPrice)}
                  </small>
                </div>
              </Prices>
            </TitleBar>
            <Chart data={prices} />
          </ChartContainer>
          <Disclaimer>{data.disclaimer}</Disclaimer>
        </Center>
      </div>
    );
  }
}

//------------Styles-------------

const StyledApp = styled(App)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  flex: 1;
`;

const Center = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  flex: 1;
  font-family: arial;
  flex-direction: column;
`;

const ChartContainer = styled.div`
  width: 600px;
  height: 400px;
  background-color: #27273f;
  border-radius: 8px;
  color: white;
  padding-bottom: 50px;
`;

const Disclaimer = styled.p`
  color: white;
  opacity: 0.4;
  font-size: 11px;
`;

const Title = styled.div``;

const TitleBar = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Prices = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .increased {
    color: #00f1a1;
  }
  .decreased {
    color: red;
  }
`;

//----------------------End Styles--------------------
export default withScreenSize(StyledApp);
