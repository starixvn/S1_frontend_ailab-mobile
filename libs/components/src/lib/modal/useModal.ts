import { useState } from "react";

export type UseModalType = {
	open: boolean;
	openModal: () => void;
	closeModal: () => void;
};

const useModal = (): UseModalType => {
	const [open, setOpen] = useState<boolean>(false);

	const closeModal = () => {
		setOpen(false);
	};

	const openModal = () => {
		setOpen(true);
	};

	return { open, openModal, closeModal };
};

export default useModal;
