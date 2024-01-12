import {
	useGetLobbyHeaderQuery,
	useGetMaintenanceQuery,
	useGetCustTpGameTypeSettingQuery
} from "@ailab-mobile/service";
import { memberTypeEnum, defTpGameType } from "@ailab-mobile/common";

interface IUseMenuProps {
	siteId: number;
	currencyId: number;
	memberType?: number;
}

const useMenuData = ({ siteId, currencyId, memberType }: IUseMenuProps) => {
	const { data: lobbyHeaderList = [] } = useGetLobbyHeaderQuery(
		{
			siteId,
			currencyId
		},
		{
			selectFromResult: response => {
				const { data } = response;
				return { data: data?.data };
			}
		}
	);

	const { data: { data: tpMaintainList = [] } = {} } = useGetMaintenanceQuery(
		null
	);

	const {
		data: { data: tpGameTypeSettingList = [] } = {}
	} = useGetCustTpGameTypeSettingQuery(null, {
		skip: memberType !== memberTypeEnum.liveHost || memberType === undefined
	});

	const getMenu = () => {
		const filteredAndMergedMenus = lobbyHeaderList.map(mainMenuItem => {
			const { lobbyCategoryId, data = [] } = mainMenuItem;

			const mergedSubMenus = data.map(subMenuItem => {
				// * 插入直播主
				const newSettingItem = tpGameTypeSettingList.find(
					settingItem =>
						settingItem.gameType === subMenuItem.tpGameType &&
						settingItem.tpId === subMenuItem.tpId
				);
				// * 插入 maintenance
				const isInMaintain = tpMaintainList.some(
					item =>
						item.tpId === subMenuItem.tpId &&
						(item.tpGameType === subMenuItem.tpGameType ||
							item.tpGameType === defTpGameType.All) // * 0 指全部
				);

				const { noPlay, noShow } = newSettingItem || {};

				// * 非直播主
				if (!newSettingItem) {
					return { ...subMenuItem, isInMaintain };
				}

				return {
					...subMenuItem,
					noPlay,
					noShow,
					isInMaintain
				};
			});

			return { lobbyCategoryId, data: mergedSubMenus };
		});

		return filteredAndMergedMenus;
	};

	return getMenu();
};

export { useMenuData };
