import React, { createRef } from "react";

const ButtonWithCopyBtn = ({ value = "" }) => {
	const ipt = createRef();
	const OnCopy = () => {
		ipt.current.select();
		document.execCommand("copy");
	};
	return (
		<div>
			<input readOnly={true} defaultValue={value} ref={ipt} />
			<button
				className="icon icon-files-empty"
				value={value}
				onClick={OnCopy}
			/>
		</div>
	);
};

export default ButtonWithCopyBtn;
