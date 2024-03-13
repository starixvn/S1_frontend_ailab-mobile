import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const FileUpload = ({ EditField, checked }) => {
	const [selectedFile, setSelectedFile] = useState(undefined);
	const [isUploaded, setIsUpload] = useState(false);
	const ref = useRef(null);
	useEffect(() => {
		if (ref.current?.value) {
			setIsUpload(true);
		} else {
			setIsUpload(false);
		}
	}, [ref.current?.value]);

	const validateFile = file => {
		const maxSize = 1024 * 1024 * 4;
		return file.size <= maxSize;
	};

	const handleFileChange = event => {
		const file = event.target.files[0];
		if (file) {
			if (!validateFile(file)) {
				setIsUpload(false);
				setSelectedFile(null);
				return;
			}

			setIsUpload(true);
			const reader = new FileReader();
			reader.onload = loadEvent => {
				setSelectedFile({
					fileImg: loadEvent.target.result,
					fileData: file
				});
			};
			EditField("IDImage", file);
			reader.readAsDataURL(file);
		}
	};
	return (
		<label
			htmlFor="fileInput"
			className={`upload_img ${
				checked === null ? "" : isUploaded ? "" : "error"
			}`}>
			<input
				id="fileInput"
				type="file"
				onChange={handleFileChange}
				accept="image/png, image/jpeg"
				ref={ref}
			/>
			{selectedFile ? (
				<>
					<img src={selectedFile.fileImg} alt="" />
					<i
						className="icon icon-close"
						onClick={() => {
							setSelectedFile(null);
							EditField("IDImage", "");
						}}
					/>
				</>
			) : (
				<i className="icon icon-plus" />
			)}
		</label>
	);
};

export default FileUpload;

FileUpload.propTypes = {
	EditField: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired
};
