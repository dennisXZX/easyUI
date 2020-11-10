import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface IMenuItemProps {
	className?: string;
	disabled?: boolean;
	index?: string;
	style?: React.CSSProperties;
}

export const MENU_ITEM = 'MenuItem';

const MenuItem: React.FC<IMenuItemProps> = props => {
	const { children, className, disabled, index, style } = props;

	// Retrieve context passed down from Menu component
	const menuContext = useContext(MenuContext);

	// Prepare CSS classes
	const classes = classNames('menu-item', className, {
		'is-disabled': disabled,
		'is-active': menuContext.currentActiveIndex === index
	});

	// Click handler
	const handleClick = () => {
		// Execute onSelect method passed down from Context if the menu item is not disabled
		if (menuContext.onSelect && !disabled && typeof index === 'string') {
			menuContext.onSelect(index);
		}
	};

	return (
		<li className={classes} style={style} onClick={handleClick}>
			{children}
		</li>
	);
};

// Define a displayName for menu item component
// So in React.Children.map, we can identify through 'displayName' whether it's a valid child element
MenuItem.displayName = MENU_ITEM;

export default MenuItem;
