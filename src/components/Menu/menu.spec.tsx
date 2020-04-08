import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Menu, { IMenuProps, MenuMode } from './menu';
import MenuItem from './menu-item';

const generateMenu = (props: IMenuProps) => {
	return (
		<Menu {...props}>
			<MenuItem index={0}>active</MenuItem>
			<MenuItem index={1} disabled>
				disabled
			</MenuItem>
			<MenuItem index={2}>link</MenuItem>
		</Menu>
	);
};

describe('Menu and MenuItem component', () => {
	let defaultProps: IMenuProps;

	beforeEach(() => {
		defaultProps = {
			defaultIndex: 0,
			onSelect: jest.fn(),
			className: 'test',
		};
	});

	it('should render correct Menu and MenuItem based on default props', () => {
		const menuProps = {
			...defaultProps,
		};

		const wrapper = render(generateMenu(menuProps));
		const menuElement = wrapper.getByTestId('test-menu');
		const activeElement = wrapper.getByText('active');
		const disabledElement = wrapper.getByText('disabled');

		expect(menuElement).toBeInTheDocument();
		expect(menuElement).toHaveClass('menu test');
		expect(menuElement.getElementsByTagName('li').length).toEqual(3);
		expect(activeElement).toHaveClass('menu-item is-active');
		expect(disabledElement).toHaveClass('menu-item is-disabled');
	});

	it('should change active state and call the callback', () => {
		const menuProps = {
			...defaultProps,
		};

		const wrapper = render(generateMenu(menuProps));
		const activeElement = wrapper.getByText('active');
		const thirdItem = wrapper.getByText('link');

		fireEvent.click(thirdItem);
		expect(thirdItem).toHaveClass('menu-item is-active');
		expect(activeElement).not.toHaveClass('is-active');
		expect(defaultProps.onSelect).toHaveBeenCalledWith(2);
	});

	it('should not change active state and call the callback when a disabled button is clicked', () => {
		const menuProps = {
			...defaultProps,
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
			mode: MenuMode.Vertical,
		};

		const wrapper = render(generateMenu(menuProps));
		const menuElement = wrapper.getByTestId('test-menu');

		expect(menuElement).toHaveClass('menu-vertical');
	});
});
