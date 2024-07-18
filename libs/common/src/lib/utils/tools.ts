/**
 *
 * @param milliseconds 延遲秒數
 * @returns 延遲功能
 */
export const sleep = (milliseconds: number) =>
	new Promise(resolve => setTimeout(resolve, milliseconds));

interface gameDetail {
	appId: string;
	gameId: string;
	gameName: { cs: string; en: string };
	imgName: { cs: string; en: string };
	launchDate: Date | string;
	paylines: string;
	playFree: boolean;
	reels: string | null;
	rtp: string;
	slotGameCategoryList: number[];
	slotGameId: string;
	sort: number;
	top: string;
	tpId: string;
}

interface categoryType {
	[key: string]: gameDetail[];
}
// 將陣列中的某個xx調到某位置
export const moveItem = (
	arr: string[] | categoryType[],
	fromIndex: number,
	toIndex: number
) => {
	if (
		fromIndex < 0 ||
		fromIndex >= arr.length ||
		toIndex < 0 ||
		toIndex >= arr.length
	) {
		return arr;
	}

	const newArray = [...arr];
	const [movedItem] = newArray.splice(fromIndex, 1);
	newArray.splice(toIndex, 0, movedItem);
	return newArray;
};
