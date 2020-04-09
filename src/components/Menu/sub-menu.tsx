import React, { useContext, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { IMenuItemProps } from './menu-item';

export interface ISubMenuProps {
	title: string;
	className?: string;
	index?: number;
}

const SubMenu: React.FC<ISubMenuProps> = props => {
	const { children, className, index, title } = props;

	const menuContext = useContext(MenuContext);

	const classes = classNames('menu-item submenu-item', className, {
		'is-active': menuContext.index === index,
	});

	const renderChildren = () => {
		const childrenComponent = React.Children.map(children, child => {
			const childElement = child as FunctionComponentElement<
				IMenuItemProps
			>;

			const { displayName } = childElement.type;

			if (displayName === 'MenuItem') {
				return childElement;
			} else {
				console.error(
					'Error: Menu has a child that is not a MenuItem component.'
				);
			}
		});

		return <ul className="submenu">{childrenComponent}</ul>;
	};

	return (
		<li key={index} className={classes}>
			<div className="submenu-title">{title}</div>
			{renderChildren()}
		</li>
	);
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
