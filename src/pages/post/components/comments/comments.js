import { Comment } from './components';
import { Icon } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useServerRequest } from '../../../../hooks';
import { selectUserId } from '../../../../selectors';
import { addCommentAsync } from '../../../../actions';
import styled from 'styled-components';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onNewCommentAdd = (postId, userId, content) => {
		dispatch(addCommentAsync(requestServer, postId, userId, content));
		setNewComment('');
	};

	return (
		<div className={className}>
			<div className="new-comment">
				<textarea
					name="comment"
					value={newComment}
					placeholder="Comment..."
					onChange={({ target }) => setNewComment(target.value)}
				></textarea>
				<Icon
					id="fa-paper-plane-o"
					margin="0 0 0 10px "
					size="18px"
					onClick={() => onNewCommentAdd(postId, userId, newComment)}
				/>
			</div>
			<div className="comments">
				{comments.map(({ id, author, content, piblishedAt }) => (
					<Comment
						key={id}
						postId={postId}
						id={id}
						author={author}
						content={content}
						piblishedAt={piblishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	margin: 0 auto;
	width: 580px;

	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& .new-comment textarea {
		height: 120px;
		width: 550px;
		font-size: 18px;
		resize: none;
	}
`;
