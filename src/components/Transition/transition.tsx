import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

// Support four different animation types
type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

type TransitionProps = CSSTransitionProps & {
	animation?: AnimationName;
	shouldCreateWrapper?: boolean;
};

const Transition: React.FC<TransitionProps> = props => {
	const { animation, children, classNames, shouldCreateWrapper, ...restProps } = props;

	return (
		<CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
			{/* Sometimes we need a wrapper to perform the animation correctly */}
			{shouldCreateWrapper ? <div>{children}</div> : children}
		</CSSTransition>
	);
};

// Set unmountOnExit if you'd prefer to unmount the component after it finishes exiting
// Documentation on these props: http://reactcommunity.org/react-transition-group/transition
Transition.defaultProps = {
	unmountOnExit: true,
	appear: true
};

export default Transition;
