import React,{  useState, useEffect } from 'react';
import Header from './components/Header/Header';
import ListView from './components/ListView/ListView';
import { retrieveBusinessInfo, retrieveBusinessData } from './utilities';


function AppHooks (props){
  const [state, setState] = useState({
    stockInput: '',
    value: '10',
    socialValue: "twitter",
    stockName: null,
    stockData: [],
    stockFull: [],
    stockInitial: '',
    isLoading: false
  });

 const handleChange = event => {
    const { name,value } = event.target;
    setState({ ...state, [name]: value }); //pas de merge, donc reconstruit le state.
  };

//remplace cdm
useEffect(async() => {
  const stockName = await retrieveBusinessInfo();
  setState({ ...state,stockName });
 },[])

  //va chercher le data qui viendrait d un backend au lieu d un api gratuit.
  //2 situations, on veut 1 seul call par entreprise. donc si present on garde.
  const stockPriceGenerator = async (e) => {
    e.preventDefault();

     const {stockInput, value, stockInitial, stockFull } =  state;

    //SI PREMIERE RECHERCHE
    if (stockInitial !== stockInput) {
      // console.log('full')
      const stockFull = await retrieveBusinessData(stockInput);
      const stockData = [...stockFull].slice(0, value);
        //prend tout et qui vaut le nom
        setState({ ...state, stockFull, stockData, stockInitial: stockInput });

    } else {  //SI DEJA UNE ENTREPRISE AU TABLEAU
      // console.log('actuelle')
      const stockData = [...stockFull].slice(0, value);
      setState({ ...state, stockData });
    }
  }

    return (
      <div className="App">
        {/* Header component*/}
        <Header stockName={state.stockName} />


        {/* main app*/}
        <div className="mainApp">
          <h3 className="mission">Validating the effects of social media on brand valuation</h3>
          <h5>- in 3 simple steps -</h5>

          {/* form */}
          <form onSubmit={stockPriceGenerator} >
            <div className="cover">
              <h2 className="num">01/ <span> enter the symbol</span></h2>
              <div className="search">
                <label htmlFor="stockInput" className="inp">
                  <input type="text" name="stockInput" value={state.stockInput} onChange={handleChange}
                  id="stockInput" className="searchInput" autoComplete="off" spellCheck="false" tabIndex="1" />
                  <span className="label" style={state.stockInput ? { opacity: 0 } : null}>search...</span>
                </label>
                <div className="wrapSelect">
                  <h2 className="num">02/ <span> days reviewed</span></h2>
                  <select name="value" value={state.value} onChange={handleChange} tabIndex="2">
                    <option value="10">10 days</option>
                    <option value="20">20 days</option>
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                  </select>
                </div>
                <div className="wrapSelectSocial">
                  <h2 className="num">03/ <span> by social Media</span></h2>
                  <select name="socialValue" value={state.socialValue} onChange={handleChange} tabIndex="3">
                    <option value="twitter">twitter</option>
                    <option value="facebook">facebook</option>
                  </select>
                </div>
              </div>
            </div>
            <button type="submit" className="btnProjet" disabled={!state.stockInput} tabIndex="4">Go !</button>
          </form>
        </div>

        {/* list component*/}

       	  {state.stockData.length > 0 && <ListView data={state.stockData} socialValue={state.socialValue}/>}


      </div>
    );
  }

export default AppHooks;

