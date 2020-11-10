import React, { FunctionComponentElement, useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext, MenuMode } from './menu';
import { IMenuItemProps, MENU_ITEM } from './menu-item';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';

export interface ISubMenuProps {
	className?: string;
	index?: string;
	title: string;
}

export const SUBMENU = 'SubMenu';

const SubMenu: React.FC<ISubMenuProps> = props => {
	const { children, className, index, title } = props;

	// Retrieve context passed down from Menu component
	const menuContext = useContext(MenuContext);

	// Cast defaultExpandedVerticalSubMenus property as an array of strings, so later we can apply array methods on it
	const expandedVerticalSubMenus = menuContext.defaultExpandedVerticalSubMenus as Array<string>;

	// Check if the vertical menu should be expanded
	const isMenuExpandedByDefault = index && menuContext.mode === MenuMode.Vertical ? expandedVerticalSubMenus.includes(index) : false;

	// This piece of state is used to control whether menu should be expanded or not
	const [isMenuExpanded, setIsMenuExpanded] = useState(isMenuExpandedByDefault);

	// Prepare CSS classes
	const classes = classNames('menu-item submenu-item', className, {
		'is-active': menuContext.currentActiveIndex === index,
		'is-expanded': isMenuExpanded,
		'is-vertical': menuContext.mode === MenuMode.Vertical
	});

	// Click handler for menu item
	const handleClick = (event: React.MouseEvent) => {
		event.preventDefault();

		setIsMenuExpanded(!isMenuExpanded);
	};

	// Mouse event handler for expanding or collapsing submenu
	// setTimeout() is used to add some delay in expanding or collapsing submenu
	let timer: ReturnType<typeof setTimeout>;
	const handleMouse = (event: React.MouseEvent, menuToggle: boolean) => {
		clearTimeout(timer);
		event.preventDefault();

		timer = setTimeout(() => {
			setIsMenuExpanded(menuToggle);
		}, 300);
	};

	// Create a click event for submenu if it's in vertical mode, otherwise, no click event is required
	const clickEvents =
		menuContext.mode === MenuMode.Vertical
			? {
					onClick: handleClick
			  }
			: {};

	// Create mouse events for submenu if it's in horizontal mode, otherwise, no mouse event is required
	const hoverEvents =
		menuContext.mode === MenuMode.Horizontal
			? {
					onMouseEnter: (event: React.MouseEvent) => {
						handleMouse(event, true);
					},
					onMouseLeave: (event: React.MouseEvent) => {
						handleMouse(event, false);
					}
			  }
			: {};

	// Generate submenu items
	const renderSubmenuItems = () => {
		const subMenuClasses = classNames('submenu', {
			'menu-expanded': isMenuExpanded
		});

		// Use React.Children to map over children element
		const childrenComponent = React.Children.map(children, (child, submenuIndex) => {
			// Convert each child element into FunctionComponentElement so Typescript can recognise its properties
			const childElement = child as FunctionComponentElement<IMenuItemProps>;

			const { displayName } = childElement.type;

			// Check whether it's a valid child nested inside <SUBMENU> component
			if (displayName === MENU_ITEM) {
				// Use cloneElement() to add new property to the component
				// Here we pass 'index' property to each child element of <SUBMENU>
				return React.cloneElement(childElement, {
					index: `${index}-${submenuIndex}`
				});
			} else {
				console.error('Error: Menu has a child that is not a MenuItem component.');
			}
		});

		return (
			<Transition in={isMenuExpanded} timeout={300} animation="zoom-in-top">
				<ul className={subMenuClasses}>{childrenComponent}</ul>
			</Transition>
		);
	};

	return (
		// Add hover events and click events according to different menu modes
		<li key={index} className={classes} {...hoverEvents}>
			{/* Submenu title section */}
			<div className="submenu-title" {...clickEvents}>
				{title}
				<Icon icon="angle-down" className="arrow-icon" />
			</div>

			{/* Submenu items */}
			{renderSubmenuItems()}
		</li>
	);
};

// Define a displayName for submenu component
// So in React.Children.map, we can identify through 'displayName' whether it's a valid child element
SubMenu.displayName = SUBMENU;

export default SubMenu;
