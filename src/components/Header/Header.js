import React from 'react';
import './header.scss';

const transHead = {
	transform: 'translateX(0)'
}
const transBack = {
	transform: 'translateX(150px)'
}

const Header = ({stockName}) => {
	// console.log(stockName)
	return (
		<div>
			<div className="header">
				<h1>stockz <span>®</span></h1>

				<div className="current" style={stockName ? transHead : transBack }>
					<div className="headerInfo">
					 <h6 className="name">{stockName && stockName[0]}</h6>
					 <p>LogMeIn</p>
					 <h6 className="valeur">{stockName && stockName[1] + ' $'}</h6>
					 <p>last updated:</p>
					 <h6 className="date">{stockName && stockName[3]}</h6>
				  </div>
				</div>
			</div>
		</div>
	);
};

export default Header;