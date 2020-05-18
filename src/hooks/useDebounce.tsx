import { useEffect, useState } from 'react';

/**
 * Debounce a value with the provided delay
 *
 * @param {any} value - The value that need to be debounced
 * @param {number} delay - The time to delay
 *
 * @returns {T} - The debounced value
 *  */
function useDebounce<T>(value: T, delay = 300): T {
	const [debouncedValue, setDebouncedValue] = useState(value);

	// Use a setTimeout() to set the debouced value after the provided delay,
	// If the `value` changes, the setTimeoutHandler will first be cleared,
	// so setDebouncedValue() will be not be executed
	useEffect(() => {
		const setTimeoutHandler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(setTimeoutHandler);
		};
	}, [value, delay]);

	return debouncedValue;
}

export default useDebounce;
