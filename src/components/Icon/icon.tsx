import React from 'react';
import classNames from 'classnames';
import {
	FontAwesomeIcon,
	FontAwesomeIconProps
} from '@fortawesome/react-fontawesome';

// Define themes for Icon component
export enum ThemeType {
	Primary = 'primary',
	Secondary = 'secondary',
	Success = 'success',
	Info = 'info',
	Warning = 'warning',
	Danger = 'danger',
	Light = 'light',
	Dark = 'dark'
}

// Extend FontAwesomeIconProps in this interface so our Icon component can accept all FontAwesomeIcon props
export interface IconProps extends FontAwesomeIconProps {
	theme?: ThemeType;
}

const Icon: React.FC<IconProps> = props => {
	const { className, theme, ...restProps } = props;

	// Prepare CSS classes based on the theme prop, e.g. icon-primary, icon-secondary...etc
	const classes = classNames(className, {
		[`icon-${theme}`]: theme
	});

	// We take advantage of FontAwesomeIcon, only adding a theme class to it
	return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
