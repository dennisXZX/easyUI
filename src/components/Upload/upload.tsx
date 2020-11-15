import axios from 'axios';
import React, { ChangeEvent, useRef, useState } from 'react';
import Dragger from './dragger';
import UploadList from './uploadList';

const DEFAULT_FILE_NAME = 'file';

export enum UploadFileStatus {
	READY = 'ready',
	UPLOADING = 'uploading',
	SUCCESS = 'success',
	ERROR = 'error'
}

export interface UploadFile {
	uid: string;
	size: number;
	name: string;
	status?: UploadFileStatus;
	percent?: number;
	rawFile?: File;
	response?: any;
	error?: any;
}

export interface UploadProps {
	// The URL where the files will be uploaded to
	action: string;
	// The default file list
	defaultFileList?: UploadFile[];
	// Upload lifecycle method that happens before you start to upload a file
	beforeUpload?: (file: File) => boolean | Promise<File>;
	// Upload lifecycle method that happens after you upload a file,
	// it would fire no matter whether the upload is a success or not
	onChange?: (file: UploadFile) => void;
	// Upload lifecycle method that happens during file upload
	onProgress?: (percentage: number, file: UploadFile) => void;
	// Upload lifecycle method that happens when file is successfully uploaded
	onSuccess?: (data: any, file: UploadFile) => void;
	// Upload lifecycle method that happens when file is removed
	onRemove?: (file: UploadFile) => void;
	// Upload lifecycle method that happens when file is failed to be uploaded
	onError?: (err: any, file: UploadFile) => void;
	// Headers of the upload file
	headers?: { [key: string]: any };
	// Name of the upload file
	name?: string;
	// Data uploaded with the file
	data?: { [key: string]: any };
	// Whether cookie is allowed
	withCredentials?: boolean;
	// File types accepted to be uploaded
	accept?: string;
	// Whether multiple files is allowed
	multiple?: boolean;
	// Whether drag and drop feature is enabled
	isDraggable?: boolean;
}

const Upload: React.FC<UploadProps> = props => {
	const {
		accept,
		action,
		beforeUpload,
		children,
		defaultFileList,
		data,
		headers,
		isDraggable,
		multiple,
		name,
		onChange,
		onRemove,
		onProgress,
		onSuccess,
		onError,
		withCredentials
	} = props;

	// Create a reference to file input
	const fileInputRef = useRef<HTMLInputElement>(null);

	// State to keep track of the file list
	const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

	// Update file in the file list based on uid
	const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
		// Since setState() is asynchronous, here we pass a function in order to get the correct state
		setFileList((prevFileList: UploadFile[]) => {
			return prevFileList.map(file => {
				if (file.uid === updateFile.uid) {
					return {
						...file,
						...updateObj
					};
				} else {
					return file;
				}
			});
		});
	};

	// Click handler to mimic a click on the file input
	const handleClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	// Post a file to backend
	const postFile = (file: File) => {
		const _file: UploadFile = {
			uid: String(Date.now()),
			status: UploadFileStatus.READY,
			name: file.name,
			size: file.size,
			percent: 0,
			rawFile: file
		};

		setFileList(prevFileList => {
			return [_file, ...prevFileList];
		});

		const formData = new FormData();
		formData.append(name || DEFAULT_FILE_NAME, file);

		// Append data to formData if it is provided
		if (data) {
			Object.keys(data).forEach(key => {
				formData.append(key, data[key]);
			});
		}

		// Set up config for axios
		const config = {
			headers: {
				...headers,
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress: (progressEvent: ProgressEvent) => {
				// Calculate the percentage uploaded
				let percentage =
					Math.round((progressEvent.loaded * 100) / progressEvent.total) || 0;

				// Execute the onProgress function passed in through props
				if (percentage < 100) {
					updateFileList(_file, {
						percent: percentage,
						status: UploadFileStatus.UPLOADING
					});

					if (onProgress) {
						onProgress(percentage, _file);
					}
				}
			},
			withCredentials
		};

		// Post files to backend
		axios
			.post(action, formData, config)
			.then(response => {
				updateFileList(_file, {
					status: UploadFileStatus.SUCCESS,
					response: response.data
				});

				if (onChange) {
					onChange(_file);
				}

				if (onSuccess) {
					onSuccess(response.data, _file);
				}
			})
			.catch(error => {
				updateFileList(_file, {
					status: UploadFileStatus.ERROR,
					response: error
				});

				if (onChange) {
					onChange(_file);
				}

				if (onError) {
					onError(error, _file);
				}
			});
	};

	// Upload file to backend
	const uploadFiles = (files: FileList) => {
		// Convert the file list (array-like structure) into array structure
		const postFiles = Array.from(files);

		postFiles.forEach(file => {
			// Post the file to backend if there is no beforeUpload lifecycle method defined
			if (!beforeUpload) {
				postFile(file);
			} else {
				// Execute beforeUpload lifecycle method
				const result = beforeUpload(file);

				// Check if the result is a Promise
				if (result && result instanceof Promise) {
					result.then(processedFile => {
						postFile(processedFile);
					});
					// Check if the result passed any beforeUpload lifecycle method validation
				} else if (result !== false) {
					postFile(file);
				}
			}
		});
	};

	// Change handler on file input
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		// Retrieve the files user uploaded
		const files = event.target.files;

		// Does nothing if the uploaded files are not valid
		if (!files) {
			return;
		}

		// Upload files to backend
		uploadFiles(files);

		// Reset the file input value after each upload
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	// Handle remove an item
	const handleRemove = (file: UploadFile) => {
		setFileList(prevFileList => {
			return prevFileList.filter(item => item.uid !== file.uid);
		});

		// Execute onRemove callback if it is provided
		if (onRemove) {
			onRemove(file);
		}
	};

	// Determine whether upload file area supports drag and drop
	const shouldGenerateDraggableArea = () => {
		return isDraggable ? (
			<Dragger
				onDropFile={files => {
					uploadFiles(files);
				}}
			>
				{children}
			</Dragger>
		) : (
			children
		);
	};

	return (
		<div className="upload-component">
			<div
				className="upload-input"
				style={{ display: 'inline-block' }}
				onClick={handleClick}
			>
				{shouldGenerateDraggableArea()}
				<input
					className="file-input"
					type="file"
					style={{ display: 'none' }}
					onChange={handleFileChange}
					ref={fileInputRef}
					accept={accept}
					multiple={multiple}
				/>
			</div>

			<UploadList fileList={fileList} onRemove={handleRemove} />
		</div>
	);
};

Upload.defaultProps = {
	name: DEFAULT_FILE_NAME
};

export default Upload;
