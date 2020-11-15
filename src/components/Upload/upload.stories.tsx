import React from 'react';
import { action } from '@storybook/addon-actions';
import Upload, { UploadFile, UploadFileStatus } from './upload';
import '../../styles/index.scss';
import { Icon } from '../..';
import { ThemeType } from '../Icon/icon';

export default {
	component: Upload,
	title: 'Upload'
};

const defaultFileList: UploadFile[] = [
	{
		uid: '123',
		size: 1234,
		name: 'hello.md',
		status: UploadFileStatus.UPLOADING,
		percent: 30
	},
	{
		uid: '122',
		size: 1234,
		name: 'xyz.md',
		status: UploadFileStatus.SUCCESS,
		percent: 100
	},
	{
		uid: '121',
		size: 1234,
		name: 'eye.md',
		status: UploadFileStatus.ERROR,
		percent: 100
	}
];

// In beforeUpload lifecycle, check whether the file size is valid
// const checkFileSize = (file: File) => {
// 	if (Math.round(file.size / 1024) > 50) {
// 		console.log('File too large');

// 		return false;
// 	}

// 	return true;
// };

// In beforeUpload lifecycle, rename the file before upload
// const renameFile = (file: File) => {
// 	const newFile = new File([file], 'newName.doc', { type: file.type });

// 	return Promise.resolve(newFile);
// };

// Simple Upload
export const SimpleUpload = () => (
	<Upload
		action="https://jsonplaceholder.typicode.com/posts"
		// beforeUpload={checkFileSize}
		defaultFileList={defaultFileList}
		onChange={action('change')}
		onProgress={action('progress')}
		onSuccess={action('success')}
		onRemove={action('removed')}
		onError={action('error')}
		name="newFileName"
		data={{ 'super-key': 'nice' }}
		multiple={true}
		isDraggable={true}
	>
		<Icon icon="upload" size="5x" theme={ThemeType.Primary} />
		<h3>Drag file over to upload</h3>
	</Upload>
);
