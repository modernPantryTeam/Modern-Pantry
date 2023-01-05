import { Button, Card, CardContent, TextField, Grid } from "@mui/material";
import React, { Component } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Drawer from "../components/Drawer";
import pantryService from "../services/pantry-service";
import Transitions from "../components/Transition";
import { Redirect } from "react-router-dom";

export default class Create extends Component {
	constructor(props) {
		super(props);
		this.handleCreatePantry = this.handleCreatePantry.bind(this);
		this.onChangeName = this.onChangeName.bind(this);

		this.state = {
			name: "",
			message: "",
			nameError: false,
			uploadError: true,
			successful: false
		};
	}

	onChangeName(e) {
		this.setState({
			name: e.target.value,
		});
	}

	handleCreatePantry(e) {
		e.preventDefault();
		this.setState({
			nameError: false,
			successful: false,
			message: ""
		});

		if (this.state.name === "") {
			this.setState({
				nameError: true,
			});
		}

		pantryService.createPantry(this.state.name).then(response => {
			this.setState({
				uploadError: false,
				message: response.message,
				successful: true
			});
		},
			error => {
				const resMessage = (
					error.response &&
					error.response.data &&
					error.response.data.message) ||
					error.message ||
					error.toString();
				this.setState({
					uploadError: true,
					successful: false,
					message: resMessage
				});
			}
		);
	}

	render() {
		return (
			<><Drawer></Drawer>
				<Transitions>
					<div className='px-4 pb-2 pt-4 lg:mx-auto md:mx-auto ml-14 sm:max-w-xl lg:max-w-screen-xl md:px-24 lg:px-8'>
						<Grid
							container
							spacing={0}
							direction='column'
							alignItems='center'
							justify='center'
							style={{ minHeight: "80vh" }}>
							<Grid item xs={3}>
								<div>
									<Card style={{ marginTop: "20px", width: "70vmin"}} elevation={5}>
										<p className='pt-4 pl-2 text-medium'>Create your pantry</p>
										<CardContent>
											{this.state.message && (
												<p className='mb-4 text-xs text-red-primary'>
													{this.state.message}
												</p>
											)}
											<form
												Validate
												autoComplete='off'
												onSubmit={this.handleCreatePantry}>

												<TextField
													onChange={this.onChangeName}
													style={{ marginTop: "10px" }}
													label={"Pantry Name"}
													variant='outlined'
													fullWidth
													disabled={this.state.successful}
													required
													color='secondary'
													error={this.state.nameError}
												/>

												<Button
													disabled={this.state.successful}
													style={{ marginTop: "24px", color: "white" }}
													type='submit'
													variant='text'
													color='secondary'
													endIcon={<SendOutlinedIcon />}>
													{"Create"}
													{this.state.successful && <Redirect replace to="/dashboard"/>}
												</Button>
											</form>
										</CardContent>
									</Card>
								</div>
							</Grid>
						</Grid>
					</div>
				</Transitions>
			</>
		);
	}
}

