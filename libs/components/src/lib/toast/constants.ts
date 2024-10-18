/** 根據訊息種類，會有不同種類的 icon。 */
export enum ToastBGColorEnum {
	Green = "Green",
	Red = "Red",
	Blue = "Blue",
	Yellow = "Yellow",
	Default = "default"
}

/** 使用設計提供的 classNames 來自定義 icon。 如需擴充，需請設計進行設計，並提供 className */
export enum ToastIconEnum {
	Check = "icon-toast-checkmark",
	Cross = "icon-toast-close"
}

/** 動畫種類。 */
export enum TransitionEnum {
	Bounce = "Bounce",
	Slide = "Slide",
	Zoom = "Zoom",
	Flip = "Flip"
}

/** 吐司訊息是否禁音。 */
export enum ToastSoundStateEnum {
	Muted = "0",
	Enabled = "1"
}

/** 吐司訊息出現的位置 */
export enum PositionEnum {
	TopLeft = "top-left",
	TopRight = "top-right",
	TopCenter = "top-center",
	BottomLeft = "bottom-left",
	BottomRight = "bottom-right",
	BottomCenter = "bottom-center"
}
