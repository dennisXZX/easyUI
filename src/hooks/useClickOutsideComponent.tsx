import { RefObject, useEffect } from 'react';

/**
 * Detect whether user clicks outside of a component
 *
 * @param {RefObject} componentRef - Reference to a component
 * @param {Function} handler - Function to be executed when user clicks outside of a component
 */
function useClickOutsideComponent(
	componentRef: RefObject<HTMLElement>,
	handler: Function
) {
	useEffect(() => {
		// Check whether user clicks outside of the provided component
		const listener = (event: MouseEvent) => {
			// We does nothing if the click happens within the component
			if (
				!componentRef.current ||
				componentRef.current.contains(event.target as HTMLElement)
			) {
				return;
			}

			// Execute the handler function if the click happens outside of the component
			handler();
		};

		// Add the listener to document click event
		document.addEventListener('click', listener);

		return () => {
			document.removeEventListener('click', listener);
		};
	}, [componentRef, handler]);
}

export default useClickOutsideComponent;
