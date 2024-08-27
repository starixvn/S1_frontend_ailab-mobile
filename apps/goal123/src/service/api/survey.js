import { surveyRequest } from "./base";

export const api_survey_Set = args =>
	surveyRequest.post(`/Set`, {
		...args
	});
