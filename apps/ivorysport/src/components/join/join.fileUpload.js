import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const FileUpload = ({ EditField, checked }) => {
	const [selectedFile, setSelectedFile] = useState(undefined);
	const [errorMessage, setErrorMessage] = useState("");
	const [isError, setIsError] = useState(false);
	const ref = useRef(null);
	useEffect(() => {
		if (ref.current?.value) {
			setIsError(false);
		} else {
			setIsError(true);
		}
	}, [ref.current?.value]);

	const validateFile = file => {
		const maxSize = 1024 * 1024 * 4;
		if (!file) return true;
		if (file?.size > maxSize) {
			return (
				<label className="upload_img error">
					<input type="file" onChange={handleFileChange} />
					<i className="icon icon-plus" />
				</label>
			);
		}
		return null;
	};

	const handleFileChange = event => {
		const file = event.target.files[0];
		const error = validateFile(file);
		if (error) {
			setSelectedFile(null);
			setErrorMessage(error);
		} else {
			const reader = new FileReader();
			reader.onload = loadEvent => {
				setSelectedFile({
					fileImg: loadEvent.target.result,
					fileData: file
				});
			};
			reader.readAsDataURL(file);
			setErrorMessage("");
			EditField("IDImage", file);
		}
	};
	return (
		<>
			<label
				htmlFor="fileInput"
				className={`upload_img ${
					checked === null ? "" : isError ? "error" : ""
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

			{errorMessage}
		</>
	);
};

export default FileUpload;

FileUpload.prototype = {
	EditField: PropTypes.func.isRequired,
	checked: PropTypes.bool
};
