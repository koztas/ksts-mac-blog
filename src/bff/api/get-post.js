import { transformPost } from '../transformers';

export const getPost = async (postId) =>
	fetch(`http://localhost:3005/posts/${postId}`)
		.then((res) => {
			if (res.ok) {
				return res;
			}

			const error =
				res.status === 404
					? 'Такой страницы не существует'
					: 'Что-то пошло не так. Попробуйте еще раз...';

			return Promise.reject(error);
		})
		.then((loadedPost) => loadedPost.json())
		.then((loadedPost) => loadedPost && transformPost(loadedPost));
