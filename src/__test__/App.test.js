import React from 'react';
import { mount, shallow, render } from 'enzyme';

import App from '../App';


describe('App', () => {
  it('devrait partir en debug', () => {
    const component = shallow(<App debug />);

    expect(component).toMatchSnapshot();
	});

	it('devrait renderer sans props', () => {
		const component = shallow(<App/>);

		expect(component).toMatchSnapshot();
	});

	it('devrait etre capable de lancer avec spacebar', () => {
		const component = mount(<App />);
		component
			.find('button')  //si disabled enlevé
			.simulate('keydown', { keyCode: 32 });
		expect(component).toMatchSnapshot();
		component.unmount();
	});
 // j suis rendu a 5h10 selon mon tracker de temps , il me reste a commenter et git hub.
});