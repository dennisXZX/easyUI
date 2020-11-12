import React from 'react';
import { action } from '@storybook/addon-actions';
import Upload from './upload';
import '../../styles/index.scss';

export default {
	component: Upload,
	title: 'Upload'
};

// Simple Upload
export const SimpleUpload = () => (
	<Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
		Upload a File
	</Upload>
);
