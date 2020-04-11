import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import Icon from './components/Icon/icon';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

function App() {
	return (
		<div className="App">
			<Icon icon="coffee" theme="primary" size="10x" />
		</div>
	);
}

export default App;
