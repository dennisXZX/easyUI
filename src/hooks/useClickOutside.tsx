import { RefObject, useEffect, useState } from 'react';

function useClickOutside(componentRef: RefObject<HTMLElement>, handler: Function) {
	useEffect(() => {
		// Check whether user clicks outside of the provided element
		const listener = (event: MouseEvent) => {
			// We does nothing if the click happens within the component
			if (!componentRef.current || componentRef.current.contains(event.target as HTMLElement)) {
				return;
			}

			handler(event);
		};

		// Add the listener to document click event
		document.addEventListener('click', listener);

		return () => {
			document.removeEventListener('click', listener);
		};
	}, [componentRef, handler]);
}

export default useClickOutside;
