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

	const handleDrop = (e: DragEvent<HTMLElement>) => {
		e.preventDefault();
		setDragOver(false);
		onDropFile(e.dataTransfer.files);
	};

	const handleDrag = (e: DragEvent<HTMLElement>, isOver: boolean) => {
		e.preventDefault();
		setDragOver(isOver);
	};

	return (
		<div
			className={classes}
			onDragOver={e => {
				handleDrag(e, true);
			}}
			onDragLeave={e => {
				handleDrag(e, false);
			}}
			onDrop={handleDrop}
		>
			{children}
		</div>
	);
};

export default Dragger;
