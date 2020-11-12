import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input, IInputProps, InputSize } from './input';

const defaultProps: IInputProps = {
	onChange: jest.fn(),
	placeholder: 'test-input'
};

describe('test Input component', () => {
	it('should render the correct default Input', () => {
		const renderResult = render(<Input {...defaultProps} />);
		const inputElement = renderResult.getByPlaceholderText(
			'test-input'
		) as HTMLInputElement;

		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toHaveClass('input-inner');

		fireEvent.change(inputElement, { target: { value: '23' } });

		expect(defaultProps.onChange).toHaveBeenCalled();
		expect(inputElement.value).toEqual('23');
	});

	it('should render the disabled Input correctly', () => {
		const renderResult = render(<Input disabled placeholder="disabled" />);
		const inputElement = renderResult.getByPlaceholderText(
			'disabled'
		) as HTMLInputElement;

		expect(inputElement.disabled).toBeTruthy();
	});

	it('should render different input sizes on size property', () => {
		const renderResult = render(
			<Input placeholder="sizes" size={InputSize.Large} />
		);
		const testContainer = renderResult.container.querySelector(
			'.input-wrapper'
		);

		expect(testContainer).toHaveClass('input-size-lg');
	});

	it('should render prepend and append element on prepend/append property', () => {
		const renderResult = render(<Input prepend="https://" append=".com" />);
		const testContainer = renderResult.container.querySelector(
			'.input-wrapper'
		);

		expect(testContainer).toHaveClass(
			'input-group input-group-append input-group-prepend'
		);
		expect(renderResult.queryByText('https://')).toBeInTheDocument();
		expect(renderResult.queryByText('.com')).toBeInTheDocument();
	});
});
