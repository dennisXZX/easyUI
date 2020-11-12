import React from 'react';
import Icon, { ThemeType } from './icon';
import { action } from '@storybook/addon-actions';
import '../../styles/index.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Add all FontAwesomeIcon
library.add(fas);

export default {
	component: Icon,
	title: 'Icon'
};

// Default Icon
export const defaultIcon = () => <Icon icon="ambulance" size="2x" />;

// Icon with Different Themes
export const IconWithTheme = () => (
	<>
		<Icon
			icon="ambulance"
			size="2x"
			theme={ThemeType.Primary}
			onClick={action('Primary Theme')}
		/>
		<Icon
			icon="ambulance"
			size="2x"
			theme={ThemeType.Secondary}
			onClick={action('Secondary Theme')}
		/>
		<Icon
			icon="ambulance"
			size="2x"
			theme={ThemeType.Info}
			onClick={action('Info Theme')}
		/>
		<Icon
			icon="ambulance"
			size="2x"
			theme={ThemeType.Danger}
			onClick={action('Danger Theme')}
		/>
		<Icon
			icon="ambulance"
			size="2x"
			theme={ThemeType.Success}
			onClick={action('Success Theme')}
		/>
		<Icon
			icon="ambulance"
			size="2x"
			theme={ThemeType.Warning}
			onClick={action('Warning Theme')}
		/>
		<Icon
			icon="ambulance"
			size="2x"
			theme={ThemeType.Light}
			onClick={action('Light Theme')}
		/>
		<Icon
			icon="ambulance"
			size="2x"
			theme={ThemeType.Dark}
			onClick={action('Dark Theme')}
		/>
	</>
);
