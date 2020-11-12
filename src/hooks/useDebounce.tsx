import { useEffect, useState } from 'react';

/**
 * Debounce a value with the provided delay
 *
 * @param {any} value - The value that need to be debounced
 * @param {number} delay - The time to delay
 *
 * @returns {T} - The debounced value
 */
function useDebounce<T>(value: T, delay = 300): T {
	const [debouncedValue, setDebouncedValue] = useState(value);

	// Use a setTimeout() to update the debounced value after the provided delay,
	// If new `value` or `delay` values passed in the function, setTimeoutHandler will first be cleared before the next useEffect() is called,
	// so setDebouncedValue() will be not be executed as the timer has been cleared
	// Next timer will start again, and if there is no `value` changes after the provided delay, setDebouncedValue() will be execute
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
