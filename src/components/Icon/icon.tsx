import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

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

export interface IconProps extends FontAwesomeIconProps {
	theme?: ThemeType;
}

const Icon: React.FC<IconProps> = props => {
	const { className, theme, ...restProps } = props;

	const classes = classNames(className, {
		[`icon-${theme}`]: theme
	});

	return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
