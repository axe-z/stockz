import React from 'react';
import buy from '../../images/buy.svg';
import neutral from '../../images/neutral.svg';
import sell from '../../images/sell.svg';
import {recommendationAlgorithm  } from '../../utilities';


const ListItem = ({ date,opened,high,close,posts,verdict }) => {
	// const buy = (<p>{verdict} % Buy!</p> )
	// const createVerdict = verdict > 0.8 ? return buy
	return (

		<>
			<td className="column1">{date}</td>
			<td className="column2">{opened}</td>
			<td className="column3">{high}</td>
			<td className="column4">{close}</td>
			<td className="column5">{posts}</td>
			<td className="column6" style={{opacity: 0.65}}>{recommendationAlgorithm(verdict, posts, buy, neutral, sell )}</td>
		</>

	);
};

export default ListItem;

