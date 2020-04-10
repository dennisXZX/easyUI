import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface IMenuItemProps {
	className?: string;
	disabled?: boolean;
	index?: string;
	style?: React.CSSProperties;
}

const MenuItem: React.FC<IMenuItemProps> = props => {
	const { children, className, disabled, index, style } = props;

	const menuContext = useContext(MenuContext);

	const classes = classNames('menu-item', className, {
		'is-disabled': disabled,
		'is-active': menuContext.index === index
	});

	const handleClick = () => {
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

MenuItem.displayName = 'MenuItem';

export default MenuItem;
