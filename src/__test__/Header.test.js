import React from 'react';
import { mount, shallow, render } from 'enzyme';

import Header from '../components/Header/Header'



describe('Header va loader', () => {
  it('devrait partir en debug', () => {
    const component = shallow(<Header debug />);

    expect(component).toMatchSnapshot();
	});

	it('devrait renderer sans props', () => {
		const component = shallow(<Header/>);

		expect(component).toMatchSnapshot();
	});
});