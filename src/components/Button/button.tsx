import React from 'react';
import classNames from 'classnames';

export enum ButtonSize {
	Large = 'lg',
	Small = 'sm'
}

export enum ButtonType {
	Danger = 'danger',
	Default = 'default',
	Link = 'link',
	Primary = 'primary'
}

interface IBaseButtonProps {
	children: React.ReactNode;
	btnType?: ButtonType;
	className?: string;
	disabled?: boolean;
	href?: string;
	size?: ButtonSize;
}

// Button component expects all native button and anchor HTML attributes
// We use intersection type to combine multiple types into one
// Partial makes all these native props optional, because <button> and <a> have different attributes
type INativeButtonProps = IBaseButtonProps &
	React.ButtonHTMLAttributes<HTMLElement>;
type IAnchorButtonProps = IBaseButtonProps &
	React.AnchorHTMLAttributes<HTMLElement>;
export type IButtonProps = Partial<INativeButtonProps> &
	Partial<IAnchorButtonProps>;

const Button: React.FC<IButtonProps> = props => {
	const {
		btnType,
		children,
		className,
		disabled,
		href,
		size,
		...restProps
	} = props;

	// Dynamically generate class names, e.g. 'btn btn-primary btn-lg'
	// Add 'disabled' class name only for link button
	const classes = classNames('btn', className, {
		[`btn-${btnType}`]: btnType,
		[`btn-${size}`]: size,
		disabled: btnType === ButtonType.Link && disabled
	});

	// Determine whether a link or a button should be rendered
	const isLinkButton = btnType === ButtonType.Link && href;

	if (isLinkButton) {
		return (
			<a className={classes} href={href} {...restProps}>
				{children}
			</a>
		);
	} else {
		return (
			<button className={classes} disabled={disabled} {...restProps}>
				{children}
			</button>
		);
	}
};

Button.defaultProps = {
	disabled: false,
	btnType: ButtonType.Default
};

export default Button;
