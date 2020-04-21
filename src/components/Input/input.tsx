import React, { CSSProperties, FC, ReactElement } from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/icon';

export enum InputSize {
	Large = 'lg',
	Small = 'sm'
}

export interface IInputProps
	extends Omit<React.InputHTMLAttributes<HTMLElement>, 'size'> {
	disabled?: boolean;
	size?: InputSize;
	icon?: IconProp;
	prepend?: string | ReactElement;
	append?: string | ReactElement;
	style: CSSProperties;
}

const Input: FC<IInputProps> = props => {
	const {
		disabled,
		size,
		icon,
		prepend,
		append,
		style,
		...restProps
	} = props;

	const classes = classNames('input-wrapper', classNames, {
		[`input-size-${size}`]: size,
		'is-disabled': disabled,
		'input-group': prepend || append,
		'input-group-append': !!append,
		'input-group-prepend': !!prepend
	});

	return (
		<div className={classes} style={style}>
			{prepend && <div className="input-group-prepend">{prepend}</div>}
			{icon && (
				<div className="icon-wrapper">
					<Icon icon={icon} title={`${icon}`} />
				</div>
			)}
			<input className="input-inner" disabled={disabled} {...restProps} />
			{append && <div className="input-group-append">{append}</div>}
		</div>
	);
};

export default Input;
