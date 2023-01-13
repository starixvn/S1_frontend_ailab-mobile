import React, { useState } from "react";
import { DrawPrizeData, IDrawPrizeRecordData } from "@ailab-mobile/wrapper";
import { sleep } from "@ailab-mobile/common";
import { IAxiosError, IAxiosResponse } from "@ailab-mobile/service";
import { DrawPrizeStatusEnum } from "@ailab-mobile/components";
import { UseModalType } from "../modal";
import AngpaoInfo from "./AngpaoInfo";
import AngpaoDrawPrizeRecordList from "./AngpaoDrawPrizeRecordList";
import AngpaoModal from "./AngpaoModal";
import AngpaoDrawPrize from "./AngpaoDrawPrize";

interface IAngpaoProps {
	isLogin: boolean;
	currencyId: number;
	angpaoModal: UseModalType;
	message: string;
	drawPrizeResult: IAxiosResponse<DrawPrizeData> | undefined | IAxiosError;
	drawPrizeStatus: number | undefined;
	isDrawPrizeRecordListFetching: boolean;
	drawPrizeRecordList: IDrawPrizeRecordData[];
	onCheckDrawPrize: () => void;
	onPostDrawPrize: () => void;
	onOpenLoginPopBox: () => void;
}

const ANIMATION_TIME = 3000;

const Angpao = ({
	isLogin,
	currencyId,
	angpaoModal,
	message,
	drawPrizeResult,
	drawPrizeStatus,
	isDrawPrizeRecordListFetching,
	drawPrizeRecordList,
	onCheckDrawPrize,
	onPostDrawPrize,
	onOpenLoginPopBox
}: IAngpaoProps) => {
	const [isAnimationActive, setIsAnimationActive] = useState<boolean>(false);

	const handleCheckDrawPrize = async () => {
		if (!isLogin) {
			onOpenLoginPopBox();
			return;
		}
		if (drawPrizeStatus !== DrawPrizeStatusEnum.CanJoin) return;

		setIsAnimationActive(true);
		// * 等待動畫完成時間及抽獎 request 時間
		await sleep(ANIMATION_TIME);
		await onPostDrawPrize();
		await onCheckDrawPrize();

		setIsAnimationActive(false);
		angpaoModal.openModal();
	};

	return (
		<>
			<main className="angpaoEvent">
				<div className="eventPage">
					<div className="eventPage--top">
						<AngpaoDrawPrize
							message={message}
							isLogin={isLogin}
							drawPrizeStatus={drawPrizeStatus}
							isAnimationActive={isAnimationActive}
							onCheckDrawPrize={handleCheckDrawPrize}
						/>
					</div>
					<div className="eventPage--bottom">
						<div className="info">
							<AngpaoInfo currencyId={currencyId} />
							{isLogin && (
								<AngpaoDrawPrizeRecordList
									currencyId={currencyId}
									loading={isDrawPrizeRecordListFetching}
									drawPrizeRecordList={drawPrizeRecordList}
								/>
							)}
						</div>
					</div>
				</div>
			</main>

			<AngpaoModal
				className="angpaoPop"
				message={message}
				drawPrizeResult={drawPrizeResult}
				open={angpaoModal.open}
				closeModal={angpaoModal.closeModal}
			/>
		</>
	);
};

export { Angpao };
