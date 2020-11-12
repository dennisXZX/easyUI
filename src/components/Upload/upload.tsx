import React from 'react';
import axios from 'axios';
import Button, { ButtonType } from '../Button/button';
import { useRef } from '@storybook/addons';

export interface UploadProps {
	action: string;
	onProgress?: (percentage: number, file: File) => void;
	onSuccess?: (data: any, file: File) => void;
	onError?: (err: any, file: File) => void;
}

const Upload: React.FC<UploadProps> = props => {
	const { action, onProgress, onSuccess, onError } = props;

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<div className="upload-component">
			<Button btnType={ButtonType.Primary} onClick={handleClick}>
				Upload a File
			</Button>

			<input
				className="file-input"
				type="file"
				style={{ display: 'none' }}
				ref={fileInputRef}
			/>
		</div>
	);
};

export default Upload;
