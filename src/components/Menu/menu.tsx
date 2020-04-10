import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import { MENU_ITEM, IMenuItemProps } from './menu-item';
import { SUBMENU } from './sub-menu';

export enum MenuMode {
	Horizontal = 'horizontal',
	Vertical = 'vertical'
}

type SelectCallback = (selectedIndex: string) => void;

export interface IMenuProps {
	className?: string;
	defaultIndex?: string;
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

export const MenuContext = createContext<IMenuContext>({
	currentActiveIndex: '0'
});

const Menu: React.FC<IMenuProps> = props => {
	const {
		children,
		className,
		defaultIndex,
		defaultExpandedVerticalSubMenus,
		mode,
		onSelect,
		style
	} = props;

	const [currentActiveIndex, setCurrentActiveIndex] = useState(defaultIndex);

	const classes = classNames('menu', className, {
		'menu-vertical': mode === MenuMode.Vertical,
		'menu-horizontal': mode === MenuMode.Horizontal
	});

	const handleClick = (index: string) => {
		setCurrentActiveIndex(index);

		onSelect && onSelect(index);
	};

	const menuContext: IMenuContext = {
		defaultExpandedVerticalSubMenus,
		currentActiveIndex: currentActiveIndex ? currentActiveIndex : '0',
		mode,
		onSelect: handleClick
	};

	const renderMenuItems = () => {
		return React.Children.map(children, (child, index) => {
			const childElement = child as React.FunctionComponentElement<
				IMenuItemProps
			>;

			const { displayName } = childElement.type;

			if (displayName === MENU_ITEM || displayName === SUBMENU) {
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
				{renderMenuItems()}
			</MenuContext.Provider>
		</ul>
	);
};

Menu.defaultProps = {
	defaultIndex: '0',
	defaultExpandedVerticalSubMenus: [],
	mode: MenuMode.Horizontal
};

export default Menu;
