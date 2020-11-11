import React, { ChangeEvent, useState } from 'react';
import { action } from '@storybook/addon-actions';
import Input, { InputSize } from './input';
import '../../styles/index.scss';

export default {
	component: Input,
	title: 'Input'
};

export const ControlledInput = () => {
	const [inputValue, setInputValue] = useState('');

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(`Input value: ${e.target.value}`);

		setInputValue(e.target.value);
	};

	return <Input style={{ width: '300px' }} value={inputValue} onChange={changeHandler} />;
};

export const DefaultInput = () => <Input style={{ width: '300px' }} placeholder="placeholder" onChange={action('changed')} />;

export const DisabledInput = () => <Input style={{ width: '300px' }} placeholder="disabled input" disabled />;

export const InputWithIcon = () => <Input style={{ width: '300px' }} placeholder="input with icon" icon="search" />;

export const InputWithSize = () => (
	<>
		<Input style={{ width: '300px' }} defaultValue="large size" size={InputSize.Large} />

		<Input style={{ width: '300px' }} placeholder="small size" size={InputSize.Small} />
	</>
);

export const PrependedInput = () => <Input style={{ width: '300px' }} defaultValue="dennisxiao.com" prepend="https://" />;

export const AppendedInput = () => <Input style={{ width: '300px' }} defaultValue="google" append=".com" />;
