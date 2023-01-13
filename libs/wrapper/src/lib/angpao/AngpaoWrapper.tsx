import React, { ReactNode, useEffect, useState } from "react";
import { IAxiosError, IAxiosResponse } from "@ailab-mobile/service";
import {
	Modal,
	UseModalType,
	DrawPrizeStatusEnum
} from "@ailab-mobile/components";
import {
	useCheckDrawPrizeMutation,
	usePostDrawPrizeMutation,
	useGetDrawPrizeRecordListQuery
} from "./api";
import {
	DrawPrizeData,
	DrawPrizeEventIdEnum,
	IDrawPrizeRecordData
} from "./type";

const { useModal } = Modal;

interface IAngpaoWrapperProps {
	isLogin: boolean;
	eventId: DrawPrizeEventIdEnum;
	children: (props: {
		angpaoModal: UseModalType;
		message: string;
		// 抽獎結果
		drawPrizeResult:
			| IAxiosResponse<DrawPrizeData>
			| undefined
			| IAxiosError;
		drawPrizeStatus: number | undefined;
		isDrawPrizeRecordListFetching: boolean;
		drawPrizeRecordList: IDrawPrizeRecordData[];
		onCheckDrawPrize: () => void;
		onPostDrawPrize: () => void;
	}) => ReactNode;
}

const AngpaoWrapper = ({ isLogin, eventId, children }: IAngpaoWrapperProps) => {
	const angpaoModal = useModal();
	// checkDrawPrize 的 message
	const [message, setMessage] = useState("");
	// checkDrawPrize 的 狀態
	const [drawPrizeStatus, setDrawPrizeStatus] = useState<undefined | number>(
		undefined
	);
	// 抽獎結果 ,供 modal 元件判斷中獎與否
	const [drawPrizeResult, setDrawPrizeResult] = useState<
		undefined | IAxiosResponse<DrawPrizeData> | IAxiosError
	>();

	const [checkDrawPrize] = useCheckDrawPrizeMutation();

	// 抽獎
	const [postDrawPrize] = usePostDrawPrizeMutation();

	const {
		data: { data: drawPrizeRecordList = [] } = {},
		isFetching: isDrawPrizeRecordListFetching
	} = useGetDrawPrizeRecordListQuery({ eventId }, { skip: !isLogin });

	const handleCheckDrawPrize = async () => {
		try {
			const response = await checkDrawPrize({ eventId }).unwrap();
			const { message: rawMessage = "" } = response;

			setMessage(rawMessage);
			setDrawPrizeStatus(DrawPrizeStatusEnum.CanJoin);
		} catch (error) {
			const {
				message: rawErrorMessage,
				errorCode
			} = error as IAxiosError;

			setMessage(rawErrorMessage);
			setDrawPrizeStatus(errorCode);
		}
	};

	const handlePostDrawPrize = async () => {
		// 不管有無中獎都提供最終結果
		try {
			const response = await postDrawPrize({ eventId }).unwrap();
			setDrawPrizeResult(response);
		} catch (error) {
			setDrawPrizeResult(error as IAxiosError);
		}
	};

	useEffect(() => {
		if (isLogin) {
			handleCheckDrawPrize();
		}
	}, [isLogin]);

	return (
		<>
			{children({
				angpaoModal,
				message,
				drawPrizeResult,
				drawPrizeStatus,
				drawPrizeRecordList,
				isDrawPrizeRecordListFetching,
				onCheckDrawPrize: handleCheckDrawPrize,
				onPostDrawPrize: handlePostDrawPrize
			})}
		</>
	);
};

export { AngpaoWrapper, IAngpaoWrapperProps };
