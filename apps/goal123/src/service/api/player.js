import { playerRequest } from "./base";

export const api_player_GetAppLink = () => playerRequest.post(`/GetAppLink`);
