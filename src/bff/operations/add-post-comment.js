import { addComment, getComments, getPost } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const addPostComment = async (hash, postId, userId, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Access denied',
			res: null,
		};
	}

	await addComment(postId, userId, content);

	const post = await getPost(postId);

	const comments = await getComments(postId);

	return {
		error: null,
		res: {
			...post,
			comments,
		},
	};
};
