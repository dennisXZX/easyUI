import React from 'react';
import { action } from '@storybook/addon-actions';
import Menu, { MenuMode } from './menu';
import '../../styles/index.scss';
import SubMenu from './sub-menu';
import MenuItem from './menu-item';

export default {
	component: Menu,
	title: 'Menu'
};

export const horizontalMenu = () => {
	const menuProps = {
		defaultIndex: '0',
		defaultExpandedVerticalSubMenus: [],
		mode: MenuMode.Horizontal,
		onSelect: action('selected')
	};

	return (
		<Menu {...menuProps}>
			<MenuItem>active</MenuItem>
			<MenuItem disabled>disabled</MenuItem>
			<MenuItem>link</MenuItem>
			<SubMenu title="subMenu">
				<MenuItem>submenuOption1</MenuItem>
				<MenuItem>submenuOption2</MenuItem>
				<MenuItem>submenuOption3</MenuItem>
			</SubMenu>
		</Menu>
	);
};

export const verticalMenu = () => {
	const menuProps = {
		defaultIndex: '0',
		defaultExpandedVerticalSubMenus: [],
		mode: MenuMode.Vertical,
		onSelect: action('selected')
	};

	return (
		<Menu {...menuProps}>
			<MenuItem>active</MenuItem>
			<MenuItem disabled>disabled</MenuItem>
			<MenuItem>link</MenuItem>
			<SubMenu title="subMenu">
				<MenuItem>submenuOption1</MenuItem>
				<MenuItem>submenuOption2</MenuItem>
				<MenuItem>submenuOption3</MenuItem>
			</SubMenu>
		</Menu>
	);
};
