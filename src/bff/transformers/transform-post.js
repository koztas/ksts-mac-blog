export const transformPost = (dbPost) => ({
	id: dbPost.id,
	imageUrl: dbPost.image_url,
	publishedAt: dbPost.published_at,
	title: dbPost.title,
	content: dbPost.content,
});
