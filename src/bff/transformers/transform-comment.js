export const transformComment = (dbComment) => ({
	id: dbComment.id,
	postId: dbComment.post_id,
	authorId: dbComment.author_id,
	piblishedAt: dbComment.published_at,
	content: dbComment.content,
});
