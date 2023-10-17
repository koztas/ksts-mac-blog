export const setUserRole = (userId, roleId) =>
	fetch(`http://localhost:3005/users/${userId}`, {
		method: 'PATCH',
		headers: {
			'Content-type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			role_id: roleId,
		}),
	});
