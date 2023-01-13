import classNames from "classnames";
import React, { ReactNode } from "react";
import useModal from "./useModal";

export interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
	open: boolean;
}

const Modal = ({ children, open, className, ...rest }: IModalProps) => {
	return (
		<div
			id="popup"
			className={`${className} ${classNames({ active: open })}`}
			{...rest}>
			{children}
		</div>
	);
};

Modal.useModal = useModal;

export default Modal;
