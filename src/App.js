import styled from 'styled-components';

const Div = styled.div`
	text-align: center;
`;

export const App = () => {
	return (
		<Div>
			<div>
				<i className="fa fa-camera-retro"></i>
			</div>
			<div>
				<i className="fa fa-calendar"></i>
			</div>
			<div>123</div>
		</Div>
	);
};
