import BaseAPI from "./base";

export class PlayerAPI extends BaseAPI {
	GetAppLink = () => this.playerRequest.post(`/GetAppLink`);

	GetDeepLink = ({ siteId, deepLinkId }) =>
		this.playerRequest.post(`/GetDeepLink`, {
			DeepLinkId: deepLinkId,
			SiteId: siteId
		});
}
