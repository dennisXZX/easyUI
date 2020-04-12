import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import Menu, { IMenuProps, MenuMode } from './menu';
import MenuItem from './menu-item';
import SubMenu from './sub-menu';

jest.mock('../Icon/icon', () => {
	return () => {
		return <i className="fa" />;
	};
});

jest.mock('react-transition-group', () => {
	return {
		CSSTransition: (props: any) => {
			return props.children;
		}
	};
});

const generateMenu = (props: IMenuProps) => {
	return (
		<Menu {...props}>
			<MenuItem>active</MenuItem>
			<MenuItem disabled>disabled</MenuItem>
			<MenuItem>link</MenuItem>
			<SubMenu title="subMenu">
				<MenuItem>submenuOption1</MenuItem>
			</SubMenu>
		</Menu>
	);
};

const createStyleFile = () => {
	const cssFile = `
		.submenu {
			display: none;
		}
		
		.submenu.menu-expanded {
			display: block;
		}
	`;

	const style = document.createElement('style');
	style.innerHTML = cssFile;
	return style;
};

describe('Menu and MenuItem component', () => {
	let defaultProps: IMenuProps;

	beforeEach(() => {
		defaultProps = {
			defaultIndex: '0',
			onSelect: jest.fn(),
			className: 'test'
		};
	});

	it('should render correct Menu and MenuItem based on default props', () => {
		const menuProps = {
			...defaultProps
		};

		const wrapper = render(generateMenu(menuProps));
		const menuElement = wrapper.getByTestId('test-menu');
		const activeElement = wrapper.getByText('active');
		const disabledElement = wrapper.getByText('disabled');

		expect(menuElement).toBeInTheDocument();
		expect(menuElement).toHaveClass('menu test');
		expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
		expect(activeElement).toHaveClass('menu-item is-active');
		expect(disabledElement).toHaveClass('menu-item is-disabled');
	});

	it('should change active state and call the callback', () => {
		const menuProps = {
			...defaultProps
		};

		const wrapper = render(generateMenu(menuProps));
		const activeElement = wrapper.getByText('active');
		const thirdItem = wrapper.getByText('link');

		fireEvent.click(thirdItem);
		expect(thirdItem).toHaveClass('menu-item is-active');
		expect(activeElement).not.toHaveClass('is-active');
		expect(defaultProps.onSelect).toHaveBeenCalledWith('2');
	});

	it('should not change active state and call the callback when a disabled button is clicked', () => {
		const menuProps = {
			...defaultProps
		};

		const wrapper = render(generateMenu(menuProps));
		const disabledElement = wrapper.getByText('disabled');

		fireEvent.click(disabledElement);
		expect(disabledElement).not.toHaveClass('is-active');
		expect(defaultProps.onSelect).not.toHaveBeenCalled();
	});

	it('should render vertical mode when mode is set to vertical', () => {
		const menuProps = {
			...defaultProps,
			mode: MenuMode.Vertical
		};

		const wrapper = render(generateMenu(menuProps));
		const menuElement = wrapper.getByTestId('test-menu');

		expect(menuElement).toHaveClass('menu-vertical');
	});

	it('should show submenu items when hover on subMenu in horizontal mode', async () => {
		const menuProps = {
			...defaultProps,
			mode: MenuMode.Horizontal
		};

		const wrapper = render(generateMenu(menuProps));
		// Add CSS file to menu so we can test its visibility
		wrapper.container.append(createStyleFile());

		// Submenu options are not visible by default
		expect(wrapper.queryByText('submenuOption1')).not.toBeVisible();

		const submenuElement = wrapper.getByText('subMenu');
		fireEvent.mouseEnter(submenuElement);

		// We need to wait here because setTimeout() is used to toggle submenu visibility
		await wait(() => {
			expect(wrapper.queryByText('submenuOption1')).toBeVisible();
		});

		fireEvent.click(wrapper.getByText('submenuOption1'));
		expect(menuProps.onSelect).toHaveBeenCalledWith('3-0');

		fireEvent.mouseLeave(submenuElement);

		await wait(() => {
			expect(wrapper.queryByText('submenuOption1')).not.toBeVisible();
		});
	});

	it('should show submenu items when click on subMenu in vertical mode', () => {
		const menuProps = {
			...defaultProps,
			mode: MenuMode.Vertical
		};

		const wrapper = render(generateMenu(menuProps));
		wrapper.container.append(createStyleFile());

		expect(wrapper.queryByText('submenuOption1')).not.toBeVisible();

		const submenuElement = wrapper.getByText('subMenu');
		fireEvent.click(submenuElement);

		expect(wrapper.getByText('submenuOption1')).toBeVisible();
	});

	it('should expand relevant submenu menu by default if defaultExpandedVerticalSubMenus is provided', () => {
		const menuProps = {
			...defaultProps,
			mode: MenuMode.Vertical,
			defaultExpandedVerticalSubMenus: ['3']
		};

		const wrapper = render(generateMenu(menuProps));

		expect(wrapper.getByText('submenuOption1')).toBeVisible();
	});
});
