import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
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
const H2 = styled.h2`
	text-align: center;
`;

const Footer = () => <div>Footer</div>;

export const Blog = () => {
	return (
		<AppColumn>
			<Header />
			<Content>
				<H2>Page content</H2>
				<Routes>
					<Route path="/" element={<div>Main page</div>}></Route>
					<Route path="/login" element={<div>Authorization</div>}></Route>
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
