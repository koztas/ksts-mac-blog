import { transformPost } from '../transformers';

export const getPost = async (postId) =>
	fetch(`http://localhost:3005/posts/${postId}`)
		.then((res) => {
			if (res.ok) {
				return res;
			}

			const error =
				res.status === 404
					? "This page doesn't exist"
					: 'Something went wrong. Please, try again ...';

			return Promise.reject(error);
		})
		.then((loadedPost) => loadedPost.json())
		.then((loadedPost) => loadedPost && transformPost(loadedPost));
