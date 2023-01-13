import React from "react";
// import FacebookLogin from "react-facebook-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import axios from "axios";

const apiUrl = "https://1e05-37-30-108-33.eu.ngrok.io";

function FacebookLoginButton() {

	function responseFacebook(response) {
		console.log("jwt: ", response.accessToken);
		var data = JSON.stringify({
			id: response.id,
			name: response.name
		});
		return axios
			.post(apiUrl + "/api/Account/FacebookExternalLogin", data, { headers: {
				"Content-Type": "application/json",
			}})
			.then(response => {
				console.log(response.data);
				if (response.data.successStatus === true) {
					localStorage.setItem("user", JSON.stringify(response.data));
					window.location.reload();
				}
				return response.data;
			});
	}
//
	return (
		<FacebookLogin
			appId={"1531642483930337"}
			autoLoad={false}
			callback={responseFacebook}
			// fields='name,email,picture'
			render={renderProps => (
				<button className='fb-login-btn' onClick={renderProps.onClick}>
					Continue with Facebook <FacebookOutlinedIcon className='fb-login-icon' />
				</button>
			)}
		/>
	);
}

export default FacebookLoginButton;
