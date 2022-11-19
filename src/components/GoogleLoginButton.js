import React from "react";
import "../sass/css/login.css";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "../utils/refreshTokenSetup";

const clientId =
	"224755618921-u8fkf9m7ov2m8a2p6dinnmp549u2gl8a.apps.googleusercontent.com";

function LoginButton() {
	const onSuccess = res => {
		console.log("Login udany. Uzytkownik: ", res.profileObj);

		refreshTokenSetup(res);
	};

	const onFailure = res => {
		console.log("Login nieudany.", res);
	};
	return (
		<>
			<div>
				<GoogleLogin
					clientId={clientId}
					render={renderProps => (
						<button className='icon google-icon' onClick={renderProps.onClick}>
							<GoogleIcon />
						</button>
					)}
					onSuccess={onSuccess}
					onFailure={onFailure}
					cookiePolicy={"single_host_origin"}
					isSignedIn={true}
				/>
			</div>
		</>
	);
}

export default LoginButton;
