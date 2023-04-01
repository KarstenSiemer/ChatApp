import { error } from "@sveltejs/kit";

export const load = ({ locals }) => {
	const groups = [
		{
			name: 'Human Resources',
			id: '100',
			messageID: '400'
		},
		{
			name: 'DevOps',
			id: '101',
			messageID: '401'
		},
		{
			name: 'Frontend',
			id: '102',
			messageID: '402'
		}
	];

	const chats = [
		{
			id: '300',
			with: 'Ben Dover'
		},
		{
			id: '301',
			with: 'Hugh Jass'
		},
		{
			id: '302',
			with: 'Mike Litoris'
		},
	];

	const messages = [
		{
			id: '400',
			text: 'Damn, I need to get a new job.'
		},
		{
			id: '401',
			text: 'I\'m so tired of working from home.'
		},
		{
			id: '402',
			text: 'I think I\'m going to quit.'
		}
	];

	return {
		groups,
		chats,
		messages
	}
};
