import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react';
import Input, { IInputProps } from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';

interface IDataSourceObject {
	value: string;
}

export type DataSourceType<T = {}> = T & IDataSourceObject;

export interface IAutoCompleteProps extends Omit<IInputProps, 'onSelect'> {
	fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
	onSelect?: (item: DataSourceType) => void;
	renderOption?: (item: DataSourceType) => ReactElement;
}

const AutoComplete: FC<IAutoCompleteProps> = props => {
	const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props;

	const [inputValue, setInputValue] = useState((value as string) || '');
	const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const debouncedValue = useDebounce(inputValue, 500);
	const [highlightIndex, setHighlightIndex] = useState(-1);
	const triggerSearch = useRef(false);
	const componentRef = useRef<HTMLDivElement>(null);
	useClickOutside(componentRef, () => {
		setSuggestions([]);
	});

	useEffect(() => {
		if (debouncedValue && triggerSearch.current) {
			const results = fetchSuggestions(debouncedValue);

			if (results instanceof Promise) {
				setIsLoading(true);

				results.then(data => {
					setSuggestions(data);
					setIsLoading(false);
				});
			} else {
				setSuggestions(results);
			}
		} else {
			setSuggestions([]);
		}

		setHighlightIndex(-1);
	}, [debouncedValue, fetchSuggestions]);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value.trim();

		setInputValue(inputValue);
		triggerSearch.current = true;
	};

	const highlight = (index: number) => {
		if (index < 0) {
			index = 0;
		}

		if (index >= suggestions.length) {
			index = suggestions.length - 1;
		}

		setHighlightIndex(index);
	};

	const handleKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
		switch (event.keyCode) {
			case 13: // Enter key
				if (suggestions[highlightIndex]) {
					handleItemSelect(suggestions[highlightIndex]);
				}

				break;
			case 38: // Up key
				highlight(highlightIndex - 1);
				break;
			case 40: // Down key
				highlight(highlightIndex + 1);
				break;
			case 27: // ESC key
				setSuggestions([]);
				break;
			default:
				break;
		}
	};

	const handleItemSelect = (item: DataSourceType) => {
		setInputValue(item.value);

		setSuggestions([]);

		if (onSelect) {
			onSelect(item);
		}

		triggerSearch.current = false;
	};

	const renderTemplate = (item: DataSourceType) => {
		return renderOption ? renderOption(item) : item.value;
	};

	const generateDropdown = () => {
		return (
			<ul>
				{suggestions.map((item, index) => {
					const classes = classNames('suggestion-item', {
						'item-highlighted': index === highlightIndex
					});

					return (
						<li key={index} className={classes} onClick={() => handleItemSelect(item)}>
							{renderTemplate(item)}
						</li>
					);
				})}
			</ul>
		);
	};

	return (
		<div className="auto-complete" ref={componentRef}>
			<Input value={inputValue} onChange={handleInputChange} onKeyDown={handleKeydown} {...restProps} />

			{isLoading && (
				<ul>
					<Icon icon="spinner" spin />
				</ul>
			)}
			{suggestions.length > 0 && generateDropdown()}
		</div>
	);
};

export default AutoComplete;
