import React, { FunctionComponentElement, useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext, MenuMode } from './menu';
import { IMenuItemProps, MENU_ITEM } from './menu-item';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';

export interface ISubMenuProps {
	title: string;
	className?: string;
	index?: string;
}

export const SUBMENU = 'SubMenu';

const SubMenu: React.FC<ISubMenuProps> = props => {
	const { children, className, index, title } = props;
	const menuContext = useContext(MenuContext);
	const expandedSubMenus = menuContext.defaultExpandedVerticalSubMenus as Array<
		string
	>;
	const isMenuExpandedByDefault =
		index && menuContext.mode === MenuMode.Vertical
			? expandedSubMenus.includes(index)
			: false;

	const [isMenuExpanded, setIsMenuExpanded] = useState(
		isMenuExpandedByDefault
	);

	const classes = classNames('menu-item submenu-item', className, {
		'is-active': menuContext.currentActiveIndex === index,
		'is-expanded': isMenuExpanded,
		'is-vertical': menuContext.mode === MenuMode.Vertical
	});

	const handleClick = (event: React.MouseEvent) => {
		event.preventDefault();

		setIsMenuExpanded(!isMenuExpanded);
	};

	let timer: ReturnType<typeof setTimeout>;
	const handleMouse = (event: React.MouseEvent, toggle: boolean) => {
		clearTimeout(timer);
		event.preventDefault();

		timer = setTimeout(() => {
			setIsMenuExpanded(toggle);
		}, 300);
	};

	const clickEvents =
		menuContext.mode === MenuMode.Vertical
			? {
					onClick: handleClick
			  }
			: {};

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

	const renderSubmenuItems = () => {
		const subMenuClasses = classNames('submenu', {
			'menu-expanded': isMenuExpanded
		});

		const childrenComponent = React.Children.map(
			children,
			(child, submenuIndex) => {
				const childElement = child as FunctionComponentElement<
					IMenuItemProps
				>;

				const { displayName } = childElement.type;

				if (displayName === MENU_ITEM) {
					return React.cloneElement(childElement, {
						index: `${index}-${submenuIndex}`
					});
				} else {
					console.error(
						'Error: Menu has a child that is not a MenuItem component.'
					);
				}
			}
		);

		return (
			<Transition
				in={isMenuExpanded}
				timeout={300}
				animation="zoom-in-top"
			>
				<ul className={subMenuClasses}>{childrenComponent}</ul>
			</Transition>
		);
	};

	return (
		<li key={index} className={classes} {...hoverEvents}>
			<div className="submenu-title" {...clickEvents}>
				{title}
				<Icon icon="angle-down" className="arrow-icon" />
			</div>
			{renderSubmenuItems()}
		</li>
	);
};

SubMenu.displayName = SUBMENU;

export default SubMenu;
