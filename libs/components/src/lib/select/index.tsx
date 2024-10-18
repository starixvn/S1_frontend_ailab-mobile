import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { find, uniqueId, filter } from "lodash";
import classNames from "classnames";

export type SelectOptionType = {
	className?: string;
	value: string | number | undefined;
	label: string | number | null | ReactNode;
	disabled?: boolean;
	prefixOptionIcon?: ReactNode;
};

export interface ISelectProps {
	value?: string | number;
	defaultValue?: string | number;
	options: SelectOptionType[];
	prefixIcon?: ReactNode;
	placeholder?: string;
	isTranslation?: boolean;
	errorMessage?: string;
	showSearch?: boolean;
	prefixText?: string;
	showValue?: boolean;
	onChange?: (value: SelectOptionType["value"]) => void;
}

export const Select = (props: ISelectProps) => {
	const { t } = useTranslation();
	const ref = useRef(null);
	const {
		value,
		defaultValue,
		options,
		prefixIcon,
		placeholder = t("Label_General_None"),
		showSearch,
		isTranslation,
		prefixText,
		errorMessage,
		showValue,
		onChange
	} = props;

	// ====== useState ======

	// 狀態管理 isActive (是否顯示下拉選單)
	const [isActive, setIsActive] = useState(false);

	// 控制當前選中的選項
	const [currentOption, setCurrentOption] = useState<
		SelectOptionType | undefined
	>();

	// 搜尋框的輸入值
	const [filterValue, setFilterValue] = useState("");

	// ====== 函數 ======

	const handleOptionClick = (newOption: SelectOptionType) => {
		setCurrentOption(newOption);
		if (onChange) {
			onChange(newOption.value);
		}
		setIsActive(false); // 點擊後關閉下拉選單
	};

	// ====== useEffect ======

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setIsActive(false); // 點擊外部時關閉選單
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (value !== undefined) {
			setCurrentOption(find(options, { value }));
		}
	}, [value, options]);

	useEffect(() => {
		if (value === undefined && defaultValue !== undefined) {
			setCurrentOption(find(options, { value: defaultValue }));
		}
	}, [defaultValue, value, options]);

	// ====== 變數 ======

	/** 使用搜尋的 Options ，可以絕對搜尋 與 模糊搜尋 */
	const filterOptions = filter(
		options,
		item =>
			String(item.value)
				.toLowerCase()
				.includes(filterValue.toLowerCase()) ||
			String(item.label).toLowerCase().includes(filterValue.toLowerCase())
	);

	/** 顯示的文字 */
	let label = `${currentOption?.label ?? placeholder}`;
	if (isTranslation) {
		label = `${t(currentOption?.label as string) || t(placeholder || "")}`;
	} else if (showValue) {
		label = `${currentOption?.value as string}`;
	}

	return (
		<div
			className={classNames("inputBox", {
				error: errorMessage
			})}
			ref={ref}
			onClick={e => {
				// 如果點擊的是搜尋框，不觸發點擊事件
				if (
					!(e.target as HTMLInputElement)?.className.includes(
						"search"
					)
				) {
					setIsActive(!isActive);
				}
			}}>
			<button className="dropdown">
				{prefixText && <i className="txt-blue">{prefixText}</i>}
				{prefixIcon}
				{currentOption?.prefixOptionIcon}
				{label}
			</button>

			<div
				className={classNames("dropdown-container", {
					active: isActive
				})}>
				{showSearch && (
					<div className="inputBox-blue">
						<input
							type="text"
							placeholder="Search"
							onChange={e => setFilterValue(e.target.value)}
							onClick={e => e.stopPropagation()} // 點擊搜尋框時，停止事件冒泡
						/>
					</div>
				)}

				{(showSearch ? filterOptions : options).map(option => (
					<div
						key={uniqueId()}
						className="dropdown-item"
						onClick={() => handleOptionClick(option)}
						style={{
							pointerEvents: option.disabled ? "none" : "auto"
						}}>
						{option.prefixOptionIcon}
						{isTranslation ? t(option.label) : option.label || " "}
					</div>
				))}
			</div>
		</div>
	);
};
