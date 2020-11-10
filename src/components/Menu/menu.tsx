import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import { MENU_ITEM, IMenuItemProps } from './menu-item';
import { SUBMENU } from './sub-menu';

// There are two modes for this menu component, the menu can be displayed either horizontally or vertically
export enum MenuMode {
	Horizontal = 'horizontal',
	Vertical = 'vertical'
}

// Define a callback type for type reusability
type SelectCallback = (selectedIndex: string) => void;

export interface IMenuProps {
	className?: string;
	defaultActiveIndex?: string;
	defaultExpandedVerticalSubMenus?: string[];
	mode?: MenuMode;
	onSelect?: SelectCallback;
	style?: React.CSSProperties;
}

export interface IMenuContext {
	currentActiveIndex: string;
	defaultExpandedVerticalSubMenus?: string[];
	mode?: MenuMode;
	onSelect?: SelectCallback;
}

// Create a Context as a way to pass props to children
// Because we use React.Children.map() to map over all child elements, so we cannot simply pass props to each child
export const MenuContext = createContext<IMenuContext>({
	currentActiveIndex: '0'
});

const Menu: React.FC<IMenuProps> = props => {
	const { children, className, defaultActiveIndex, defaultExpandedVerticalSubMenus, mode, onSelect, style } = props;

	const [currentActiveIndex, setCurrentActiveIndex] = useState(defaultActiveIndex);

	// Prepare CSS classes
	const classes = classNames('menu', className, {
		'menu-vertical': mode === MenuMode.Vertical,
		'menu-horizontal': mode === MenuMode.Horizontal
	});

	// Click handler passed to menu item component
	const handleClick = (index: string) => {
		// Set currentActiveIndex to the index associated with the clicked menu item
		setCurrentActiveIndex(index);

		// Execute the onSelect callback
		onSelect && onSelect(index);
	};

	// Provide Context values which can be accessed in children
	const menuContext: IMenuContext = {
		currentActiveIndex: currentActiveIndex ? currentActiveIndex : '0',
		defaultExpandedVerticalSubMenus,
		mode,
		onSelect: handleClick
	};

	// Generate menu items
	const renderMenuItems = () => {
		// Use React.Children to map over children element
		return React.Children.map(children, (child, index) => {
			// Convert each child element into FunctionComponentElement so Typescript can recognise its properties
			const childElement = child as React.FunctionComponentElement<IMenuItemProps>;

			const { displayName } = childElement.type;

			// Check whether it's a valid child nested inside <MENU> component
			if (displayName === MENU_ITEM || displayName === SUBMENU) {
				// Use cloneElement() to add new property to the component
				// Here we pass 'index' property to each child element of <MENU>
				// We use toString() here because 'index' property is a string type
				return React.cloneElement(childElement, {
					index: index.toString()
				});
			} else {
				console.error('Error: Menu has a child that is not a MenuItem component.');
			}
		});
	};

	return (
		<ul className={classes} style={style} data-testid="test-menu">
			{/* Provide props to children elements through Context */}
			<MenuContext.Provider value={menuContext}>{renderMenuItems()}</MenuContext.Provider>
		</ul>
	);
};

// Define default props for Menu component
Menu.defaultProps = {
	defaultActiveIndex: '0',
	defaultExpandedVerticalSubMenus: [],
	mode: MenuMode.Horizontal
};

export default Menu;
