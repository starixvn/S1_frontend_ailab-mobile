import React from "react";
import { toast, Zoom, ToastOptions } from "react-toastify";
import { ToastBGColorEnum, PositionEnum } from "./constants";
import "react-toastify/dist/ReactToastify.css";

/** 自定義吐司訊息內容，包括 icon／訊息內容／訊息文字顏色.   */
const CustomToast = ({
	message,
	iconClassName,
	messageStyle
}: {
	message: string;
	iconClassName: string | undefined;
	messageStyle: React.CSSProperties;
}) => (
	<div
		style={{
			display: "flex"
		}}>
		{iconClassName && (
			<i
				className={`icon ${iconClassName}`}
				style={{
					color: "white",
					marginRight: 20
				}}
			/>
		)}
		<span style={messageStyle}>{message}</span>
	</div>
);

interface IToastOptions {
	message: string;
	toastMuted: boolean;
	customBGColor?: ToastBGColorEnum | undefined;
	customIconClassName?: string | undefined;
	isWrapText?: boolean;
}

export const ToastEmitter = ({
	message,
	toastMuted,
	customBGColor = ToastBGColorEnum.Green,
	customIconClassName,
	isWrapText = true
}: IToastOptions) => {
	/** 是否禁音 */

	/** ====== 函數 ====== */

	/** 根據使用者設定，決定是否播放音效 (音效請設計放在 s3) */
	const playSound = () => {
		if (toastMuted) return;
		const audio = new Audio(
			"https://banner.goal123.org/Static/toast/img/toastSound.mp3"
		);
		audio.play();
	};

	/** ====== 常數 ====== */

	/**
	 *  吐司訊息文字 Style 設定
	 *  @color 如果是 Default (白背景)，則顯示灰色文字，其餘訊息類型皆為滿色背景色，則顯示白色文字
	 *  @whiteSpace  訊息是否換行，預設過長會換行。 */
	const messageStyle: React.CSSProperties = {
		color: customBGColor === ToastBGColorEnum.Default ? "gray" : "white",
		whiteSpace: isWrapText ? "normal" : "nowrap"
	};

	/** 吐司訊息的其他設定，如果未來有需求可以自行增加參數，從外部傳入。 */
	const toastOptions: ToastOptions = {
		position: PositionEnum.TopCenter,
		autoClose: 3000,
		hideProgressBar: true,
		closeOnClick: true,
		draggable: false,
		closeButton: false,
		transition: Zoom,
		style: {
			borderRadius: "8px" // 因應設計，手機吐司訊息有圓角
		}
	};

	const content = (
		<CustomToast
			message={message}
			iconClassName={customIconClassName}
			messageStyle={messageStyle}
		/>
	);
	// 根據訊息種類，顯示通知
	switch (customBGColor) {
		case ToastBGColorEnum.Green:
			toast.success(content, toastOptions);
			break;
		case ToastBGColorEnum.Red:
			toast.error(content, toastOptions);
			break;
		case ToastBGColorEnum.Blue:
			toast.info(content, toastOptions);
			break;
		case ToastBGColorEnum.Yellow:
			toast.warning(content, toastOptions);
			break;
		default:
			toast(content, toastOptions);
			break;
	}
	playSound();
};
