import React from 'react';
import Icon from '../Icon';
import { ThemeType } from '../Icon/icon';
import Progress from '../Progress';
import { UploadFile, UploadFileStatus } from './upload';

interface UploadListProps {
	fileList: UploadFile[];
	onRemove: (file: UploadFile) => void;
}

const UploadList: React.FC<UploadListProps> = props => {
	const { fileList, onRemove } = props;

	return (
		<ul className="upload-list">
			{fileList.map(item => {
				const { uid, status, name, percent } = item;

				const isReady = status === UploadFileStatus.READY;
				const isUploading = status === UploadFileStatus.UPLOADING;
				const isSuccess = status === UploadFileStatus.SUCCESS;
				const isError = status === UploadFileStatus.ERROR;

				return (
					<li className="upload-list-item" key={uid}>
						{/* File Name */}
						<span className={`file-name file-name-${status}`}>
							<Icon icon="file-alt" theme={ThemeType.Secondary} />
							{name}
						</span>

						{/* File Upload Status */}
						<span className="file-status">
							{(isUploading || isReady) && (
								<Icon icon="spinner" spin theme={ThemeType.Primary} />
							)}

							{isSuccess && (
								<Icon icon="check-circle" theme={ThemeType.Success} />
							)}

							{isError && (
								<Icon icon="times-circle" theme={ThemeType.Danger} />
							)}
						</span>

						{/* File Actions */}
						<span className="file-actions">
							<Icon
								icon="times"
								onClick={() => {
									onRemove(item);
								}}
							/>
						</span>

						{/* Progress Bar */}
						{isUploading && <Progress percent={percent || 0} />}
					</li>
				);
			})}
		</ul>
	);
};

export default UploadList;
