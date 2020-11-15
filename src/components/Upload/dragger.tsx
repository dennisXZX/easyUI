import React, { FC, useState, DragEvent } from 'react';
import classNames from 'classnames';

interface DraggerProps {
	onDropFile: (files: FileList) => void;
}

export const Dragger: FC<DraggerProps> = props => {
	const { onDropFile, children } = props;

	const [isDragOver, setDragOver] = useState(false);

	const classes = classNames('uploader-dragger', {
		'is-dragover': isDragOver
	});

	// File drop handler
	const handleDrop = (e: DragEvent<HTMLElement>) => {
		e.preventDefault();
		setDragOver(false);

		// Execute the onDropFile method passed from props
		onDropFile(e.dataTransfer.files);
	};

	// File drag handler
	const handleDrag = (e: DragEvent<HTMLElement>, isDragOver: boolean) => {
		e.preventDefault();
		setDragOver(isDragOver);
	};

	return (
		<div
			className={classes}
			onDragOver={event => {
				handleDrag(event, true);
			}}
			onDragLeave={event => {
				handleDrag(event, false);
			}}
			onDrop={handleDrop}
		>
			{children}
		</div>
	);
};

export default Dragger;
