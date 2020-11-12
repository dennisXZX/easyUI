import React from 'react';
import { config } from 'react-transition-group';
import { render, RenderResult, fireEvent, wait } from '@testing-library/react';
import AutoComplete, { IAutoCompleteProps } from './auto-complete';

// Disable waits in Transition
// http://reactcommunity.org/react-transition-group/testing/
config.disabled = true;

const testArray = [
	{ value: 'ab', number: 11 },
	{ value: 'abc', number: 1 },
	{ value: 'b', number: 4 },
	{ value: 'c', number: 15 }
];

const testRenderOption = (item: any) => {
	return (
		<>
			<h2 data-testid="custom-render-option">Name: {item.value}</h2>
			<h2 data-testid="custom-render-option">Number: {item.number}</h2>
		</>
	);
};

const baseTestProps: IAutoCompleteProps = {
	fetchSuggestions: query => testArray.filter(item => item.value.includes(query)),
	onSelect: jest.fn(),
	placeholder: 'auto-complete'
};

let wrapper: RenderResult, inputNode: HTMLInputElement;

describe('AutoComplete component', () => {
	it('test basic AutoComplete behavior', async () => {
		wrapper = render(<AutoComplete {...baseTestProps} />);
		inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement;

		// Change input value
		fireEvent.change(inputNode, { target: { value: 'a' } });

		// Suggestion items should show in the list after debounced time
		await wait(() => {
			expect(wrapper.queryByText('ab')).toBeInTheDocument();
		});

		// Should have two suggestion items
		expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2);

		// Select one of the suggestion items
		fireEvent.click(wrapper.getByText('ab'));
		expect(baseTestProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });

		// Suggestion item should not show in the list after being selected
		expect(wrapper.queryByText('ab')).not.toBeInTheDocument();

		// Select a suggestion item value should populate the Input value
		expect(inputNode.value).toBe('ab');
	});

	it('should provide keyboard support', async () => {
		wrapper = render(<AutoComplete {...baseTestProps} />);
		inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement;

		// Change input value
		fireEvent.change(inputNode, { target: { value: 'a' } });

		// Suggestion items should show in the list after debounced time
		await wait(() => {
			expect(wrapper.queryByText('ab')).toBeInTheDocument();
		});

		const firstSuggestionItem = wrapper.queryByText('ab');
		const secondSuggestionItem = wrapper.queryByText('abc');

		// Press arrow down
		fireEvent.keyDown(inputNode, { keyCode: 40 });
		expect(firstSuggestionItem).toHaveClass('is-highlighted');

		// Press arrow down again
		fireEvent.keyDown(inputNode, { keyCode: 40 });
		expect(secondSuggestionItem).toHaveClass('is-highlighted');

		// Press arrow up
		fireEvent.keyDown(inputNode, { keyCode: 38 });
		expect(firstSuggestionItem).toHaveClass('is-highlighted');

		// Press enter
		fireEvent.keyDown(inputNode, { keyCode: 13 });
		expect(baseTestProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });

		// Suggestion list should not show after pressing enter
		expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
	});

	it('click outside of component should hide suggestion list', async () => {
		wrapper = render(<AutoComplete {...baseTestProps} />);
		inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement;

		// Change input value
		fireEvent.change(inputNode, { target: { value: 'a' } });

		// Suggestion items should show in the list after debounced time
		await wait(() => {
			expect(wrapper.queryByText('ab')).toBeInTheDocument();
		});

		// Click outside the component
		fireEvent.click(document);

		// Suggestion list should not show after clicking outside of the component
		expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
	});

	it('renderOption should generate the right template', async () => {
		wrapper = render(<AutoComplete {...baseTestProps} renderOption={testRenderOption} />);
		inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement;

		// Change input value
		fireEvent.change(inputNode, { target: { value: 'a' } });

		// Suggestion items with custom render template should show in the list after debounced time
		await wait(() => {
			expect(wrapper.getAllByTestId('custom-render-option').length).toEqual(4);
		});
	});
});
