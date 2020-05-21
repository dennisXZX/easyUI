import { FC } from 'react';

import Menu, { IMenuProps } from './menu';
import SubMenu, { ISubMenuProps } from './sub-menu';
import MenuItem, { IMenuItemProps } from './menu-item';

export type IMenuComponent = FC<IMenuProps> & {
	Item: FC<IMenuItemProps>;
	SubMenu: FC<ISubMenuProps>;
};

const EnhancedMenu = Menu as IMenuComponent;

EnhancedMenu.SubMenu = SubMenu;
EnhancedMenu.Item = MenuItem;

export default EnhancedMenu;
