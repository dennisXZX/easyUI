import React from 'react';
import { action } from '@storybook/addon-actions';
import Input, { InputSize } from './input';
import '../../styles/index.scss';

export default {
	component: Input,
	title: 'Input'
};

export const defaultInput = () => <Input style={{ width: '300px' }} placeholder="placeholder" onChange={action('changed')} />;

export const disabledInput = () => <Input style={{ width: '300px' }} placeholder="disabled input" disabled />;

export const inputWithIcon = () => <Input style={{ width: '300px' }} placeholder="input with icon" icon="search" />;

export const InputWithSize = () => (
	<>
		<Input style={{ width: '300px' }} defaultValue="large size" size={InputSize.Large} />

		<Input style={{ width: '300px' }} placeholder="small size" size={InputSize.Small} />
	</>
);

export const prependedInput = () => <Input style={{ width: '300px' }} defaultValue="dennisxiao.com" prepend="https://" />;

export const apprendedInput = () => <Input style={{ width: '300px' }} defaultValue="google" append=".com" />;
