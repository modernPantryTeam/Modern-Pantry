import * as React from "react";
import { useState } from "react";
import Drawer from "../components/Drawer";
import WButtonCustom from '../components/WButtonCustom.js'
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import pantryService from "../services/pantry-service";
import Transitions from "../components/Transition";
import DeleteIcon from '@mui/icons-material/Delete';
import "../sass/css/dashboard.css";
import { Grid, CardActionArea, CardMedia, Typography, CardActions, Button, Card, CardContent } from "@mui/material";

function Dashboard() {

	const [pantries, setPantries] = useState([]);

	function handleClick(id) {
		console.log(id);
		pantryService.deletePantry(id);
	  }

	document.addEventListener("DOMContentLoaded", () => {
		pantryService.getPantries().then(response => {
			setPantries(response.content);
		});
	});
	
	if (pantries.length === 0) {
		return (
			<>
				<Drawer></Drawer>
				<Transitions>
					<section>
						<div className='pantry-info'>
							<p className="text-base text-gray-700 md:text-lg text-white">
								You don't own any pantries, click the button below to create one.
							</p>
							<div className='button-box'>
								<WButtonCustom link="/create" name="Create" icon={<SendOutlinedIcon />} />
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
							<form>
							<Button
									style={{justifyContent: 'flex-end' }}
									color="inherit"
									size="small"
									onClick={() => handleClick(card.id)}
								>
									Delete
								</Button>
								</form>
						</CardActions>
					</Card>
				}
			</div>
		));

		return (
			<>
				<Drawer></Drawer>
				<Transitions>
					<div className='container'>
						<div className='pantry-result'>
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
