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
// Partial makes all these native props optional
type INativeButtonProps = IBaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type IAnchorButtonProps = IBaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type IButtonProps = Partial<INativeButtonProps> & Partial<IAnchorButtonProps>;

const Button: React.FC<IButtonProps> = props => {
	const { btnType, children, className, disabled, href, size, ...restProps } = props;

	const classes = classNames('btn', className, {
		[`btn-${btnType}`]: btnType,
		[`btn-${size}`]: size,
		disabled: btnType === ButtonType.Link && disabled
	});

	const isLinkButton = btnType === ButtonType.Link && href;

	/** Determine whether a link or a button should be rendered */
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
