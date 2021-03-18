import React, { createRef } from "react";

const ButtonWithCopyBtn = ({ value = "" }) => {
	const ipt = createRef();
	const OnCopy = () => {
		ipt.current.select();
		document.execCommand("copy");
	};
	return (
		<div className="infoModule parts">
			<div className="inputBox">
				<input readOnly={true} defaultValue={value} ref={ipt} />
			</div>
			<div className="btn-group">
				<button
					className="icon icon-files-empty"
					value={value}
					onClick={OnCopy}
				/>
			</div>
		</div>
	);
};

export default ButtonWithCopyBtn;
