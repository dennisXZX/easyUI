import React from 'react';
import Menu, { MenuMode } from './components/Menu/menu';
import MenuItem from './components/Menu/menu-item';
import SubMenu from './components/Menu/sub-menu';

function App() {
	return (
		<div className="App">
			<Menu
				onSelect={index => console.log(index)}
				mode={MenuMode.Horizontal}
			>
				<MenuItem>link 1</MenuItem>
				<MenuItem>link 2</MenuItem>
				<SubMenu title="Submenu">
					<MenuItem>link 1</MenuItem>
					<MenuItem>link 2</MenuItem>
				</SubMenu>
				<MenuItem>link 3</MenuItem>
			</Menu>

			<hr />

			<Menu
				onSelect={index => console.log(index)}
				mode={MenuMode.Vertical}
				defaultExpandedVerticalSubMenus={['2']}
			>
				<MenuItem>link 1</MenuItem>
				<MenuItem>link 2</MenuItem>
				<SubMenu title="Submenu">
					<MenuItem>link 1</MenuItem>
					<MenuItem>link 2</MenuItem>
				</SubMenu>
				<MenuItem>link 3</MenuItem>
			</Menu>
		</div>
	);
}

export default App;
