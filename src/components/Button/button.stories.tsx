import React from 'react';
import { action } from '@storybook/addon-actions';
import Button, { ButtonSize, ButtonType } from './button';
import '../../styles/index.scss';

export default {
	component: Button,
	title: 'Button'
};

// Default Button
export const defaultButton = () => <Button onClick={action('clicked')}>Default</Button>;

// Button with Size
export const buttonWithSize = () => (
	<>
		<Button onClick={action('clicked')} size={ButtonSize.Large}>
			Large
		</Button>

		<Button onClick={action('clicked')} size={ButtonSize.Small}>
			Small
		</Button>
	</>
);

// Button with Type
export const buttonWithType = () => (
	<>
		<Button onClick={action('clicked')} btnType={ButtonType.Primary}>
			Primary
		</Button>

		<Button onClick={action('clicked')} btnType={ButtonType.Danger}>
			Danger
		</Button>

		<Button onClick={action('clicked')} btnType={ButtonType.Link} href="">
			Link
		</Button>
	</>
);
