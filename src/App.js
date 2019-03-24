import React,{ Component } from 'react';
import Header from './components/Header/Header';
import ListView from './components/ListView/ListView';
import { retrieveBusinessInfo, retrieveBusinessData } from './utilities';


const iniialState = {
  stockInput: '',
  value: '10',
  socialValue: "twitter",
  stockName: null,
  stockData: [],
  isLoading: false
}
class App extends Component {

  state = {
  ...iniialState
  }

  handleChange = event => {
    const { name,value } = event.target;
    this.setState({ [name]: value });
  };

 componentDidMount = async() =>  {
   //Va chercher en direct la valeur boursiere de logmein
    const stockName = await retrieveBusinessInfo();
    this.setState({ stockName });
  }
  //va chercher le data qui viendrait d un backend au lieu d un api gratuit.
  stockPriceGenerator = async (e) => {
    e.preventDefault();
     const {stockInput, value} = this.state;
    if (stockInput) {
      const stockDataFull = await retrieveBusinessData(stockInput);
      if(stockDataFull){
        const stockData = stockDataFull.slice(0,  value); // retourne selon select le nombre de jour
        this.setState({ stockData,  isLoading: !this.state.isLoading  });
      }
    }
  }


  render () {
    const { stockInput,stockData,stockName,value,socialValue } = this.state;

    return (
      <div className="App">
        {/* Header component*/}
        <Header stockName={stockName} />


        {/* main app*/}
        <div className="mainApp">
          <h3 className="mission">Validating the effects of social media on brand valuation</h3>
          <h5>- in 3 simple steps -</h5>

          {/* form */}
          <form onSubmit={this.stockPriceGenerator} >
            <div className="cover">
              <h2 className="num">01/ <span> enter the symbol</span></h2>
              <div className="search">
                <label htmlFor="stockInput" className="inp">
                  <input type="text" name="stockInput" value={stockInput} onChange={this.handleChange}
                  id="stockInput" className="searchInput" autoComplete="off" spellCheck="false" tabIndex="1" />
                  <span className="label" style={this.state.stockInput ? { opacity: 0 } : null}>search...</span>
                </label>
                <div className="wrapSelect">
                  <h2 className="num">02/ <span> days reviewed</span></h2>
                  <select name="value" value={value} onChange={this.handleChange} tabIndex="2">
                    <option value="10">10 days</option>
                    <option value="20">20 days</option>
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                  </select>
                </div>
                <div className="wrapSelectSocial">
                  <h2 className="num">03/ <span> by social Media</span></h2>
                  <select name="socialValue" value={socialValue} onChange={this.handleChange} tabIndex="3">
                    <option value="twitter">twitter</option>
                    <option value="facebook">facebook</option>
                  </select>
                </div>
              </div>
            </div>
            <button type="submit" className="btnProjet" disabled={!stockInput} tabIndex="4">Go !</button>
          </form>
        </div>

        {/* list component*/}

       	  {stockData.length > 0 && <ListView data={stockData} />}


      </div>
    );
  }
}

export default App;

