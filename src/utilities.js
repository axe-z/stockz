import React from 'react';
const key = 'F41ON15LGCFM4PR7'; //cle a ne pas securiser.



//Va chercher en direct la valeur boursiere de logmein
export const retrieveBusinessInfo = async () => {

	const urlIntro = `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=LOGM&apikey=${key}`;
	const resultName = await fetch(urlIntro);
	const name = await resultName.json();
	const flatName = name['Stock Quotes'][0]; //api retourne du tres mauvais code
	if (flatName && Object.keys(flatName).length > 0) { //verifie si existe
		const stockName = Object.values(flatName); //refait un array des values
		return stockName //retourne le data pour montrer les info de logmein realtime
	}

}


//Ici on aurait l entre du Backend - dans mon cas un api pas super, sans query de limit , mais gratuit.
//prend seulement le symbol , retourne promesse.
export const retrieveBusinessData = async (stock) => {
	const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${key}`

	const results = await fetch(url);
	const response = await results.json();
	const output = response["Time Series (Daily)"]
	//flatten en gardant date et le reste et ajoutant posts
	let stockDataHolder = [];
	for (let key in output) {
		stockDataHolder.push({
			date: key,
			posts: socialMediaCountGenerator(), // inserer le nombre post Ramdom
			...output[key] //value
		});
	}
	 if (stockDataHolder.length > 0) return stockDataHolder // retourne async
		//si call depasse le max alloué. je n ai pas le temps pour batir un systeme de blocage.
		//c'est complex quand un systeme block par par acces denied.
		else {
	 	 alert(`${stock.toUpperCase()} might not exist on the markets - try again`)
		}

}


//jsx icon et % profit
const returnText = (taux,imageSvg) => (<>
	<span className="verdict">{taux} %</span> <span className="logoVerdict"><img src={imageSvg} alt="logo" width="90px" /></span>
</>)

//differents scenarios
export const recommendationAlgorithm = (percent,posts,buyImage,neutralImage,sellImage) => {
	// console.log(percent)
	if (percent >= 0.3 && posts > 3) return returnText(percent,buyImage)
	else if (percent >= 0.3 && posts <= 3) return returnText(percent,neutralImage)
	else if (percent <= 0.3 && percent >= 0 && posts > 6) return returnText(percent,buyImage)
	else if (percent <= 0.3 && percent >= 0 && posts <= 6) return returnText(percent,neutralImage)
	else if (percent <= 0 && percent > -0.5 && posts > 4) return returnText(percent,neutralImage)
	else if (percent <= 0 && percent > -0.5 && posts <= 4) return returnText(percent,sellImage)
	else if (percent <= -0.5 && posts > 8) return returnText(percent,neutralImage)
	else if (percent <= -0.5 && posts <= 8) return returnText(percent,sellImage)
	return true
}

//genere un nombre de post d une entreprise
export const socialMediaCountGenerator = () => Number.parseInt(Math.random() * 10);

//calcule a 3 decimals le stock price
export const percentageCalculator = (open, close) => Number((open - close) / open * -100.0).toFixed(3);;