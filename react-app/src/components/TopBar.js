import React, { useEffect, useState } from 'react';

function TopBar(){

	const [user, setUser] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
			const response = await fetch('/api/users');
			if (!response.ok) {
				throw new Error('Error al obtener datos');
			}
			const data = await response.json();
	
			const users = data.users;
			const usersId = users.map((user) => user.id);
	
			if (usersId.length > 0) {
				const firstUserId = usersId[0];
				const apiUrl = `/api/users/${firstUserId}/detail`;
				const apiResponse = await fetch(apiUrl);
	
				if (!apiResponse.ok) {
					throw new Error('Error al obtener datos para el primer usuario con ID ' + firstUserId);
				}
	
				const responseData = await apiResponse.json();

			setUser(responseData);
			}
		} catch (error) {
			console.error(error);
		}
		};
		fetchData();
	}, []);

    return(
        <React.Fragment>
				{/*<!-- Topbar -->*/}
				<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

					{/*<!-- Sidebar Toggle (Topbar) -->*/}
					<button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
						<i className="fa fa-bars"></i>
					</button>

					{/*<!-- Topbar Navbar -->*/}
					<ul className="navbar-nav ml-auto">

						<div className="topbar-divider d-none d-sm-block"></div>

						{/*<!-- Nav Item - User Information -->*/}
						<li className="nav-item dropdown no-arrow">
							<a className="nav-link dropdown-toggle" href="/" id="userDropdown">
								<span className="mr-2 d-none d-lg-inline text-gray-600 small">{user.name} {user.last_name}</span>
								<img className="img-profile rounded-circle" src={`/api/users/profile-image/${user.id}`} alt="" width="60"/>
							</a>
						</li>

					</ul>

				</nav>
				{/*<!-- End of Topbar -->*/}

        </React.Fragment>
    )
}
export default TopBar;