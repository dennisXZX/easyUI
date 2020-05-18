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

const testProps: IAutoCompleteProps = {
	fetchSuggestions: query => testArray.filter(item => item.value.includes(query)),
	onSelect: jest.fn(),
	placeholder: 'auto-complete'
};

let wrapper: RenderResult, inputNode: HTMLInputElement;

describe('AutoComplete component', () => {
	beforeEach(() => {
		wrapper = render(<AutoComplete {...testProps} />);
		inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement;
	});

	it('test basic AutoComplete behavior', async () => {
		// Change input
		fireEvent.change(inputNode, { target: { value: 'a' } });

		// Suggestion item should show in the list after debounced time
		await wait(() => {
			expect(wrapper.queryByText('ab')).toBeInTheDocument();
		});

		// Should have two suggestion items
		expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2);

		// Select the first item
		fireEvent.click(wrapper.getByText('ab'));
		expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });

		// Suggestion item should not show in the list after being selected
		expect(wrapper.queryByText('ab')).not.toBeInTheDocument();

		// Selected item value should populate the input
		expect(inputNode.value).toBe('ab');
	});

	it('should provide keyboard support', async () => {
		// Change input
		fireEvent.change(inputNode, { target: { value: 'a' } });

		// Suggestion item should show in the list after debounced time
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
		expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });

		// Suggestion list should not show after pressing enter
		expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
	});

	it('click outside of component should hide suggestion list', async () => {
		// Change input
		fireEvent.change(inputNode, { target: { value: 'a' } });

		// Suggestion item should show in the list after debounced time
		await wait(() => {
			expect(wrapper.queryByText('ab')).toBeInTheDocument();
		});

		// Click outside the component
		fireEvent.click(document);

		// Suggestion list should not show after clicking outside of the component
		expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
	});

	// it('renderOption should generate the right template', () => {});

	// it('async fetchSuggestions should works fine', () => {});
});
