import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Button, { IButtonProps, ButtonSize, ButtonType } from './button';

describe('Button component', () => {
	let defaultProps: IButtonProps;

	beforeEach(() => {
		defaultProps = {
			disabled: false,
			btnType: ButtonType.Default,
			onClick: jest.fn()
		};
	});

	it('should render correct default button', () => {
		const buttonProps = {
			...defaultProps
		};

		const renderResult = render(<Button {...buttonProps}>Button</Button>);
		const buttonElement = renderResult.getByText(
			'Button'
		) as HTMLButtonElement;

		expect(buttonElement).toBeInTheDocument();
		expect(buttonElement.tagName).toEqual('BUTTON');
		expect(buttonElement).toHaveClass('btn btn-default');
		expect(buttonElement.disabled).toBeFalsy();

		fireEvent.click(buttonElement);

		expect(defaultProps.onClick).toHaveBeenCalled();
	});

	it('should render correct button based on different props', () => {
		const buttonProps = {
			...defaultProps,
			btnType: ButtonType.Primary,
			size: ButtonSize.Large,
			className: 'test-class'
		};

		const renderResult = render(<Button {...buttonProps}>Button</Button>);
		const buttonElement = renderResult.getByText('Button');

		expect(buttonElement).toBeInTheDocument();
		expect(buttonElement).toHaveClass('btn-primary btn-lg test-class');
	});

	it('should render a link when btnType is ButtonType.Link and href attribute is provided', () => {
		const buttonProps = {
			...defaultProps,
			btnType: ButtonType.Link,
			href: 'http://dummyurl'
		};

		const renderResult = render(<Button {...buttonProps}>Link</Button>);
		const linkElement = renderResult.getByText('Link');

		expect(linkElement).toBeInTheDocument();
		expect(linkElement.tagName).toEqual('A');
		expect(linkElement).toHaveClass('btn btn-link');
	});

	it('should render a disabled button when disabled attribute is set to true', () => {
		const buttonProps = {
			...defaultProps,
			disabled: true
		};

		const renderResult = render(<Button {...buttonProps}>Button</Button>);
		const buttonElement = renderResult.getByText(
			'Button'
		) as HTMLButtonElement;

		expect(buttonElement).toBeInTheDocument();
		expect(buttonElement.disabled).toBeTruthy();

		fireEvent.click(buttonElement);

		expect(buttonProps.onClick).not.toHaveBeenCalled();
	});
});
