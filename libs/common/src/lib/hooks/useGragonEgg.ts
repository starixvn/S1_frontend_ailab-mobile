import {
	IDrawPrizeData,
	IAxiosResponse,
	IGetCustBlessingsStickerData,
	IGetCustDrawPrizeListData,
	useDrawPrizeMutation,
	useMultiDrawPrizeMutation,
	useLazyGetCustDrawPrizeListQuery,
	useCheckPromotionMissionQuery,
	useClaimNewYearBigPrizeMutation,
	useLazyGetCustBlessingsStickerQuery
} from "../service";

export enum PromotionMissionTypeEnum {
	accumulateDeposit = 1,
	accumulateValidTurnover,
	referFriend
}

export enum CategoryIdEnum {
	sports = 1,
	slots,
	liveCasino
}

export enum DrawPrizeTypeEnum {
	normalPrize = 0,
	noPrize,
	blessingSticker
}

export const useGragonEgg = () => {
	const {
		data: {
			data: { newYearMission2024: missionList = [], eggTicket = 0 } = {}
		} = {}
	} = useCheckPromotionMissionQuery();

	const [getCustBlessingsSticker] = useLazyGetCustBlessingsStickerQuery();

	const [getCustDrawPrizeList] = useLazyGetCustDrawPrizeListQuery();

	const [drawPrizeMutation] = useDrawPrizeMutation();

	const [drawMultiPrizeMutation] = useMultiDrawPrizeMutation();

	const [claimNewYearBigPrizeMutation] = useClaimNewYearBigPrizeMutation();

	const drawOnePrize = async ({
		eventId
	}: {
		eventId: number;
	}): Promise<IAxiosResponse<IDrawPrizeData>> => {
		try {
			const res = await drawPrizeMutation({
				eventId
			}).unwrap();

			return res;
		} catch (error) {
			return error;
		}
	};

	const drawMultiPrize = async ({
		eventId
	}: {
		eventId: number;
	}): Promise<IAxiosResponse<IDrawPrizeData[]>> => {
		try {
			const res = await drawMultiPrizeMutation({
				eventId,
				drawTimes: 10
			}).unwrap();

			return res;
		} catch (error) {
			return error;
		}
	};

	const drawPrize = async ({
		eventId,
		multiDraw
	}: {
		eventId: number;
		multiDraw: boolean;
	}) => {
		const drawResult = multiDraw
			? await drawMultiPrize({ eventId })
			: await drawOnePrize({ eventId });

		return drawResult;
	};

	const claimBlessingPrize = async ({
		eventId
	}: {
		eventId: number;
	}): Promise<IAxiosResponse<void>> => {
		try {
			const res = await claimNewYearBigPrizeMutation({
				eventId
			}).unwrap();

			return res;
		} catch (error) {
			return error;
		}
	};

	const getBlessingSticker = async ({
		eventId
	}: {
		eventId: number;
	}): Promise<IAxiosResponse<IGetCustBlessingsStickerData>> => {
		try {
			const res = await getCustBlessingsSticker({ eventId }).unwrap();
			return res;
		} catch (error) {
			return error;
		}
	};

	const getDrawPrizeList = async ({
		eventId
	}: {
		eventId: number;
	}): Promise<IAxiosResponse<IGetCustDrawPrizeListData[]>> => {
		try {
			const res = await getCustDrawPrizeList({ eventId }).unwrap();
			return res;
		} catch (error) {
			return error;
		}
	};

	return {
		eggTicket,
		missionList,
		drawPrize,
		getDrawPrizeList,
		claimBlessingPrize,
		getBlessingSticker
	};
};
