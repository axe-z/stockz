import React  from 'react';
import buy from '../../images/buy.svg';
import neutral from '../../images/neutral.svg';
import sell from '../../images/sell.svg';
import {recommendationAlgorithm  } from '../../utilities';


const ListItem = ({ date,opened,high,close, tweets, posts,verdict , socialValue }) => {


	return (

		<>
			<td className="column1">{date}</td>
			<td className="column2">{opened}</td>
			<td className="column3">{high}</td>
			<td className="column4">{close}</td>
			<td className="column5">{socialValue === "twitter" ? tweets : posts }</td>
			<td className="column6" style={{opacity: 0.65}}>{
				socialValue === "twitter" ? recommendationAlgorithm(verdict, posts, tweets, buy, neutral, sell, socialValue ) : recommendationAlgorithm(verdict, posts, tweets, buy, neutral, sell, socialValue )}</td>
		</>

	);
};

export default ListItem;

