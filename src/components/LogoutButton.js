import React from "react";
import { GoogleLogout } from "react-google-login";
import LogoutIcon from "@mui/icons-material/Logout";

const clientId =
	"224755618921-u8fkf9m7ov2m8a2p6dinnmp549u2gl8a.apps.googleusercontent.com";

function LogoutButton() {
	const onSuccessLogout = () => {
		console.log("Wylogowano pomyslnie");
	};
	return (
		<div>
			<GoogleLogout
				clientId={clientId}
				render={renderProps => (
					<button onClick={renderProps.onClick}>
						<LogoutIcon />
					</button>
				)}
				onLogoutSuccess={onSuccessLogout}
			/>
		</div>
	);
}

export default LogoutButton;
