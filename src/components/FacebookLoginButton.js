import React from "react";
// import FacebookLogin from "react-facebook-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";

function FacebookLoginButton() {

	function responseFacebook(response) {
		console.log(response);
	}

	return (
		<FacebookLogin
			appId='1531642483930337'
			autoLoad={false}
			callback={responseFacebook}
			// fields='name,email,picture'
			render={renderProps => (
				<button className='fb-login-btn' onClick={renderProps.onClick}>
					Facebook Login <FacebookOutlinedIcon className='fb-login-icon' />
				</button>
			)}
		/>
	);
}

export default FacebookLoginButton;
