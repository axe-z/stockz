import React from 'react';
import ReactDOM from 'react-dom';
import './formReset.scss';
import './app.scss';
// import App from './App';
import AppHooks from './AppHooks';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AppHooks />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



// callStockApi = async (e) => {
// 	e.preventDefault();
// 	if (this.state.stockName) {
// 		let stock = this.state.stockName;
// 		const key = 'F41ON15LGCFM4PR7'
// 		const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${key}`
// 		const results = await fetch(url);
// 		const r = await results.json();
// 		const output = r["Time Series (Daily)"]

// 		//flatten en gardant date et le reste
// 		const stockData = [];
// 		for (let key in output) {
// 			stockData.push({
// 			date: key,
// 			...output[key] //value
// 		});
// 	}
// 		// console.log(formElementsArray)
// 		this.setState({ stockData , stockName: ''});
// 	}
// }