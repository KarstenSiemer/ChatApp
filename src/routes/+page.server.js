import { error } from "@sveltejs/kit";

export const load = ({ locals }) => {
	return {
		this: true
	}
};
