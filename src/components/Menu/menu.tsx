import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import { IMenuItemProps } from './menu-item';

export enum MenuMode {
	Horizontal = 'horizontal',
	Vertical = 'vertical'
}

type SelectCallback = (selectedIndex: string) => void;

export interface IMenuProps {
	className?: string;
	defaultIndex?: string;
	defaultOpenedVerticalSubMenus?: string[];
	mode?: MenuMode;
	onSelect?: SelectCallback;
	style?: React.CSSProperties;
}

export interface IMenuContext {
	index: string;
	defaultOpenedVerticalSubMenus?: string[];
	mode?: MenuMode;
	onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({ index: '0' });

const Menu: React.FC<IMenuProps> = props => {
	const {
		children,
		className,
		defaultIndex,
		defaultOpenedVerticalSubMenus,
		mode,
		onSelect,
		style
	} = props;

	const [currentActive, setCurrentActive] = useState(defaultIndex);

	const classes = classNames('menu', className, {
		'menu-vertical': mode === MenuMode.Vertical,
		'menu-horizontal': mode !== MenuMode.Vertical
	});

	const handleClick = (index: string) => {
		setCurrentActive(index);

		if (onSelect) {
			onSelect(index);
		}
	};

	const menuContext: IMenuContext = {
		defaultOpenedVerticalSubMenus,
		index: currentActive ? currentActive : '0',
		mode,
		onSelect: handleClick
	};

	const renderChildren = () => {
		return React.Children.map(children, (child, index) => {
			const childElement = child as React.FunctionComponentElement<
				IMenuItemProps
			>;

			const { displayName } = childElement.type;

			if (displayName === 'MenuItem' || displayName === 'SubMenu') {
				return React.cloneElement(childElement, {
					index: index.toString()
				});
			} else {
				console.error(
					'Error: Menu has a child that is not a MenuItem component.'
				);
			}
		});
	};

	return (
		<ul className={classes} style={style} data-testid="test-menu">
			<MenuContext.Provider value={menuContext}>
				{renderChildren()}
			</MenuContext.Provider>
		</ul>
	);
};

Menu.defaultProps = {
	defaultIndex: '0',
	defaultOpenedVerticalSubMenus: [],
	mode: MenuMode.Horizontal
};

export default Menu;
