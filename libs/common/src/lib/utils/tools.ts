/**
 *
 * @param milliseconds 延遲秒數
 * @returns 延遲功能
 */
export const sleep = (milliseconds: number) =>
	new Promise(resolve => setTimeout(resolve, milliseconds));
