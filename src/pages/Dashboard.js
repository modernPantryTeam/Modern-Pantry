import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Component } from "react";
import Drawer from "../components/Drawer";
import emailjs from "emailjs-com";
import {
	Grid,
	CardActionArea,
	CardMedia,
	Typography,
	CardActions,
	Button,
	Card,
	CardContent,
	TextField,
} from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import postService from "../services/post-service";
import pantryService from "../services/pantry-service";
import Transitions from "../components/Transition";
import Share from "../components/Share";
import { render } from "@testing-library/react";
import "../sass/css/dashboard.css";
import authService from "../services/auth-service";

function Dashboard() {
	const [pantries, setPantries] = useState([]);

	const handleClick = () => {
		// e.preventDefault();
		// this.setState({
		// 	send: true,
		// });
		console.log("clicked");
	};
	// window.addEventListener("DOMContentLoaded", () => {
	// 	pantryService.getPantries().then(response => {
	// 		console.log(response.content);
	// 		setPantries(response.content);
	// 	});
	// });

	useEffect(() => {
		pantryService.getPantries().then(response => {
			setPantries(response.content);
		});
	});
	render();
	if (pantries.length === 0) {
		return (
			<>
				<Drawer></Drawer>
				<Transitions>
					<section>
						<div className='pantry-info'>
							<p className='pantry-info__heading'>
								You don't own any pantry yet. Click link below to create pantry
							</p>
							<div className='button-box'>
								<a className='pantry-info__link' href='/create'>
									Create <SendOutlinedIcon />
								</a>
							</div>
						</div>
					</section>
				</Transitions>
			</>
		);
	} else {
		var renderedOutput = pantries.map(card => (
			<div>
				{
					<Card sx={{ maxWidth: 345 }}>
						<CardActionArea>
							<CardMedia
								component='img'
								height='200'
								image='https://i.imgur.com/LeAXVOG.png'
								alt='pantry image'
							/>
							<CardContent>
								<Typography gutterBottom variant='h5' component='div'>
									{card.name}
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
									dictum laoreet libero, eu facilisis erat fringilla rutrum.
								</Typography>
							</CardContent>
						</CardActionArea>
						<CardActions>
							<Grid container direction='row' justifyContent='flex-start'>
								<Button
									size='small'
									color='inherit'
									href={`/pantry/${card.id}`}>
									Enter
								</Button>
							</Grid>
							<Share></Share>
						</CardActions>
					</Card>
				}
			</div>
		));

		return (
			<>
				<Drawer></Drawer>
				<Transitions>
					<div class='container'>
						<div class='pantry-result'>
							<div id='pantry' style={{ paddingLeft: "56px" }}>
								{renderedOutput}
							</div>
						</div>
					</div>
				</Transitions>
			</>
		);
	}
}

export default Dashboard;
