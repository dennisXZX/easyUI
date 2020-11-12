import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react';
import Input, { IInputProps } from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import classNames from 'classnames';
import useClickOutsideComponent from '../../hooks/useClickOutsideComponent';
import Transition from '../Transition/transition';

interface IDataSourceObject {
	value: string;
}

// DataSourceType type must have a value property, it would also have all the properties from the generic type
export type DataSourceType<T = {}> = T & IDataSourceObject;

export interface IAutoCompleteProps extends Omit<IInputProps, 'onSelect'> {
	fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
	onSelect?: (item: DataSourceType) => void;
	renderOption?: (item: DataSourceType) => ReactElement;
}

const AutoComplete: FC<IAutoCompleteProps> = props => {
	const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props;

	// Value of the Input
	const [inputValue, setInputValue] = useState((value as string) || '');

	// Suggestions displayed based on the value of the Input
	const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);

	// Indicate whether asynchronous data is being loaded
	const [isLoadingData, setIsLoadingData] = useState(false);

	// Indicate whether suggestion list should be shown
	const [isShowingList, setIsShowingList] = useState(false);

	// Indicate which suggestion item should be highlighted
	const [highlightIndex, setHighlightIndex] = useState(-1);

	// Create a debounced value for input value,
	// so we fire backend call only when user stop typing
	const debouncedValue = useDebounce<string>(inputValue, 500);

	// Indicate whether a new search should be triggered
	// We do not want to trigger a search when user selects an item from suggestion list
	const triggerSearchRef = useRef(false);

	// Reference to AutoCompleteComponent
	const autoCompleteComponentRef = useRef<HTMLDivElement>(null);

	/** Hide the suggestion list when user clicks outside of the component */
	useClickOutsideComponent(autoCompleteComponentRef, () => {
		setSuggestions([]);
	});

	useEffect(() => {
		// Use useRef to keep track of whether a search should be performed
		// Any change to Input value should trigger a search
		// Select an item from the suggestion list should not trigger a search
		const shouldTriggerSearch = triggerSearchRef.current;

		if (debouncedValue && shouldTriggerSearch) {
			setSuggestions([]);

			const results = fetchSuggestions(debouncedValue);

			// Handle asynchronously if the results is a Promise
			if (results instanceof Promise) {
				setIsLoadingData(true);

				results.then(data => {
					setSuggestions(data);
					setIsLoadingData(false);

					if (data.length > 0) {
						setIsShowingList(true);
					}
				});
			} else {
				setSuggestions(results);

				if (results.length > 0) {
					setIsShowingList(true);
				}
			}
		} else {
			setIsShowingList(false);
		}

		// Reset highlight item every time AutoComplete component is re-rendered
		setHighlightIndex(-1);
	}, [debouncedValue, fetchSuggestions]);

	/** Change handler for input */
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		// trim off all the spaces
		const inputValue = event.target.value.trim();

		setInputValue(inputValue);

		// Any change to the input value should trigger a search
		triggerSearchRef.current = true;
	};

	/** Calculate which item should be highlighted */
	const highlightItem = (index: number) => {
		// Press up key should remain on the first item if it's already on the first item in suggestion list
		if (index < 0) {
			index = 0;
		}

		// Press down key should not go beyond the last item in suggestion list
		if (index >= suggestions.length) {
			index = suggestions.length - 1;
		}

		// Update highlight index
		setHighlightIndex(index);
	};

	/** Keydown handler for Input component */
	const handleKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
		switch (event.keyCode) {
			case 13: // Enter key
				// Check to see if the highlighted item exist first
				// Because user might hit 'enter' key when async data is still being fetched
				if (suggestions[highlightIndex]) {
					// Select the highlighted item
					handleItemSelect(suggestions[highlightIndex]);
				}

				break;
			case 38: // Up key
				highlightItem(highlightIndex - 1);
				break;
			case 40: // Down key
				highlightItem(highlightIndex + 1);
				break;
			case 27: // ESC key
				setIsShowingList(false);
				break;
			default:
				break;
		}
	};

	/** Click handler for suggestion list item */
	const handleItemSelect = (item: DataSourceType) => {
		// Set selected item value to be input value
		setInputValue(item.value);

		// Hide the suggestion list
		setIsShowingList(false);

		// Execute onSelect function if it's provided
		if (onSelect) {
			onSelect(item);
		}

		// Select an item from the suggestion list should not trigger a search
		triggerSearchRef.current = false;
	};

	/** Render a custom template if it's provided, otherwise, plain value will be rendered */
	const renderTemplate = (item: DataSourceType) => {
		return renderOption ? renderOption(item) : item.value;
	};

	/** Generate suggestion list */
	const generateSuggestionList = (): ReactElement => {
		return (
			<Transition
				in={isShowingList || isLoadingData}
				animation="zoom-in-top"
				timeout={300}
				onExited={() => {
					setSuggestions([]);
				}}
			>
				<ul className="suggestion-list">
					{suggestions.map((item, index) => {
						// Prepare CSS for suggestion list item
						const classes = classNames('suggestion-item', {
							'is-highlighted': index === highlightIndex
						});

						return (
							<li key={index} className={classes} onClick={() => handleItemSelect(item)}>
								{renderTemplate(item)}
							</li>
						);
					})}
				</ul>
			</Transition>
		);
	};

	return (
		<div className="auto-complete" ref={autoCompleteComponentRef}>
			{/* Use an Input component to get input from user */}
			<Input value={inputValue} onChange={handleInputChange} onKeyDown={handleKeydown} {...restProps} />

			{/* Display a loading spinner if data is being loaded */}
			{isLoadingData && (
				<div className="suggestions-loading-icon">
					<Icon icon="spinner" spin />
				</div>
			)}

			{/* Display suggestion list if the list is not empty */}
			{suggestions.length > 0 && generateSuggestionList()}
		</div>
	);
};

export default AutoComplete;
