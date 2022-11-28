import React from "react";
import "../sass/css/login.css";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
// import { GoogleLogin } from "react-google-login";
// import { refreshTokenSetup } from "../utils/refreshTokenSetup";
// import { gapi } from "gapi-script";
import { useEffect } from "react";

const clientId =
	"224755618921-u8fkf9m7ov2m8a2p6dinnmp549u2gl8a.apps.googleusercontent.com";

function LoginButton() {
	function handleCallbackResponse(response) {
		console.log("jwt: ", response.credential);
	}

	useEffect(() => {
		google.accounts.id.initialize({
			client_id: clientId,
			callback: handleCallbackResponse,
		});

		google.accounts.id.renderButton(document.getElementById("googleSignIn"), {
			theme: "outline",
			size: "large",
			width: "300px",
		});
	}, []);

	return (
		<>
			<div id='googleSignIn'></div>
		</>
	);
}

export default LoginButton;
