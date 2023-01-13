import React from "react";
import {
	Modal,
	IModalProps,
	DrawPrizeResultEnum
} from "@ailab-mobile/components";
import { DrawPrizeData } from "@ailab-mobile/wrapper";
import { useTranslation } from "react-i18next";
import { IAxiosError, IAxiosResponse } from "@ailab-mobile/service";

interface IAngpaoModalProps extends IModalProps {
	message: string;
	drawPrizeResult: IAxiosResponse<DrawPrizeData> | undefined | IAxiosError;
	closeModal: () => void;
}

const AngpaoModal = ({
	message = "",
	drawPrizeResult,
	closeModal,
	...props
}: IAngpaoModalProps) => {
	const { t } = useTranslation();
	// 取 errorCode 當作 結果判斷，message 為中獎訊息
	const { errorCode: result, message: drawPrizeMessage } =
		drawPrizeResult ?? {};

	return (
		<Modal {...props}>
			<div className="pop">
				<div>
					<button className="icon icon-close" onClick={closeModal} />
					{result === DrawPrizeResultEnum.Win ? (
						<>
							<div className="title">
								{t("Label_Congratulations")}
							</div>

							<div className="content">{drawPrizeMessage}</div>
							<div className="info">{message}</div>
						</>
					) : (
						<div className="content">{drawPrizeMessage}</div>
					)}
				</div>
			</div>
		</Modal>
	);
};

export default AngpaoModal;
