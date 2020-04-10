import React, { FunctionComponentElement, useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext, MenuMode } from './menu';
import { IMenuItemProps } from './menu-item';

export interface ISubMenuProps {
	title: string;
	className?: string;
	index?: string;
}

const SubMenu: React.FC<ISubMenuProps> = props => {
	const { children, className, index, title } = props;
	const menuContext = useContext(MenuContext);
	const openedSubMenus = menuContext.defaultOpenedVerticalSubMenus as Array<
		string
	>;
	const isSubmenuOpened =
		index && menuContext.mode === MenuMode.Vertical
			? openedSubMenus.includes(index)
			: false;

	const [isMenuOpen, setIsMenuOpen] = useState(isSubmenuOpened);

	const classes = classNames('menu-item submenu-item', className, {
		'is-active': menuContext.index === index
	});

	const handleClick = (event: React.MouseEvent) => {
		event.preventDefault();

		setIsMenuOpen(!isMenuOpen);
	};

	let timer: any;
	const handleMouse = (event: React.MouseEvent, toggle: boolean) => {
		clearTimeout(timer);
		event.preventDefault();

		timer = setTimeout(() => {
			setIsMenuOpen(toggle);
		}, 300);
	};

	const clickEvents =
		menuContext.mode === MenuMode.Vertical
			? {
					onClick: handleClick
			  }
			: {};

	const hoverEvents =
		menuContext.mode !== MenuMode.Vertical
			? {
					onMouseEnter: (event: React.MouseEvent) => {
						handleMouse(event, true);
					},
					onMouseLeave: (event: React.MouseEvent) => {
						handleMouse(event, false);
					}
			  }
			: {};

	const renderChildren = () => {
		const subMenuClasses = classNames('submenu', {
			'menu-opened': isMenuOpen
		});

		const childrenComponent = React.Children.map(
			children,
			(child, submenuIndex) => {
				const childElement = child as FunctionComponentElement<
					IMenuItemProps
				>;

				const { displayName } = childElement.type;

				if (displayName === 'MenuItem') {
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

		return <ul className={subMenuClasses}>{childrenComponent}</ul>;
	};

	return (
		<li key={index} className={classes} {...hoverEvents}>
			<div className="submenu-title" {...clickEvents}>
				{title}
			</div>
			{renderChildren()}
		</li>
	);
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
