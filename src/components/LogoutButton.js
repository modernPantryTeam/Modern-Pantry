import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import authService from "../services/auth-service";

function LogoutButton() {
	const handleLogout = () => {
		authService.logout();
	};
	return (
		<>
			<LogoutIcon onClick={handleLogout} />
		</>
	);
}

export default LogoutButton;
