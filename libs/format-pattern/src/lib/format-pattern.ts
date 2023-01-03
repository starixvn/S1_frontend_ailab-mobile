export const INPUT_PATTERN = {
	/**
	 * * 是否存在大部分特殊字元，以下特殊符號除外: , . ' /
	 * * 可通过姓名
	 * * supermainian A/L mamian
	 * * nur asyikien bt. abdullah
	 * * Cheong Siew Shan
	 *
	 * * 不可通过姓名
	 * * Halimah @ husan
	 * * ～ ĎĔĂŘ ～
	 */
	userNameSpecialCharactersPattern: /[[\]*\\"`:{}~_^+\-@#?!<>%;)(&$|]/
};
