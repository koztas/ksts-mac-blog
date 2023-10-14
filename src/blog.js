import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import { Authorization } from './pages';
import styled from 'styled-components';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

const Content = styled.div`
	padding: 120px 0;
`;

export const Blog = () => {
	return (
		<AppColumn>
			<Header />
			<Content>
				<Routes>
					<Route path="/" element={<div>Main page</div>}></Route>
					<Route path="/login" element={<Authorization />}></Route>
					<Route path="/register" element={<div>Registration</div>}></Route>
					<Route path="/users" element={<div>Users</div>}></Route>
					<Route path="/post/:postId" element={<div>Post</div>}></Route>
					<Route path="/post" element={<div>New post</div>}></Route>
					<Route path="/post" element={<div>New post</div>}></Route>
					<Route path="/post" element={<div>New post</div>}></Route>
				</Routes>
			</Content>
			<Footer />
		</AppColumn>
	);
};
