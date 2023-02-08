import { shieldRequest } from "./base";

export const api_shield_ShieldRiskCheck = data =>
	shieldRequest.post(`/ShieldRiskCheck`, data);

export const api_shield_GetEndpoint = data =>
	shieldRequest.post(`/GetEndpoint`, data);
