import React from 'react';
import ListItem from '../ListItem/ListItem';
import { percentageCalculator } from '../../utilities';


const ListView = ({ data }) => {
	return data && (
		<div className="listLimiter">
			<div className="container-table100">
				<div className="wrap-table100">
					<div className="table100">
						<table>
							<thead>
								<tr className="table100-head">
									<th className="column1">date</th>
									<th className="column2">opened</th>
									<th className="column3">day high</th>
									<th className="column4">closed</th>
									<th className="column5">social posts</th>
									<th className="column6">verdict</th>
								</tr>
							</thead>
							<tbody>

								{data && data.map(l => {
									return (
										<tr key={l.date}>

											<ListItem
												date={l.date}
												opened={l['1. open']}
												high={l['2. high']}
												close={l['4. close']}
												posts={l.posts}
												verdict={percentageCalculator(l['1. open'],l['4. close'])} //%de profits / pertes
											/>

										</tr>
									)
								})}

							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)

}




export default ListView;

