import React, { ChangeEvent, CSSProperties, FC, ReactElement } from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/icon';

export enum InputSize {
	Large = 'lg',
	Small = 'sm'
}

// Since InputHTMLAttributes already has a 'size' property which is a number type
// Here we omit the number 'size' property from InputHTMLAttributes and use our own 'size' property
export interface IInputProps
	extends Omit<React.InputHTMLAttributes<HTMLElement>, 'size'> {
	// Whether to disable Input element
	disabled?: boolean;
	// Set the size of the Input element, 'lg' or 'sm'
	size?: InputSize;
	// Whether to add icon to the Input element
	icon?: IconProp;
	// Whether to prepend something to Input element
	prepend?: string | ReactElement;
	// Whether to append something to Input element
	append?: string | ReactElement;
	// Inline CSS styling
	style?: CSSProperties;
	// Re-define onChange event to cater for test cases usage
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<IInputProps> = props => {
	const {
		disabled,
		size,
		icon,
		prepend,
		append,
		style,
		...restProps
	} = props;

	// Prepare CSS classes
	const classes = classNames('input-wrapper', classNames, {
		[`input-size-${size}`]: size,
		'is-disabled': disabled,
		'input-group': prepend || append,
		'input-group-append': Boolean(append),
		'input-group-prepend': Boolean(prepend)
	});

	// Since in controlled Input component, you cannot have both 'value' and 'defaultValue' at the same time
	// This logic would remove defaultValue if there's already a 'value' in props
	if ('value' in props) {
		delete restProps.defaultValue;

		// If we doesn't assign an initial value to a controlled Input component,
		// We will get an error when we change an uncontrolled Input to an controlled one
		// This logic assign an initial value to a controlled Input component
		const propsValue = props.value;
		const hasNoInitialValue = typeof propsValue === undefined;
		restProps.value = hasNoInitialValue ? '' : propsValue;
	}

	return (
		<div className={classes} style={style}>
			{/* Prepend string or React element to the beginning of Input element */}
			{prepend && <div className="input-group-prepend">{prepend}</div>}

			{/* FontAwesomeIcon */}
			{icon && (
				<div className="icon-wrapper">
					<Icon icon={icon} title={`${icon}`} />
				</div>
			)}

			{/* Input HTML element */}
			<input className="input-inner" disabled={disabled} {...restProps} />

			{/* Append string or React element to the end of Input element */}
			{append && <div className="input-group-append">{append}</div>}
		</div>
	);
};

export default Input;
