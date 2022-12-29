import { Button, Card, CardContent, TextField, Grid } from "@mui/material";
import React, { Component } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Drawer from "../components/Drawer";
import pantryService from "../services/pantry-service";
import Transitions from "../components/Transition";
import authService from "../services/auth-service";

export default class Create extends Component {
	constructor(props) {
		super(props);
		this.handleCreatePantry = this.handleCreatePantry.bind(this);
		this.onChangeName = this.onChangeName.bind(this);

		this.state = {
			name: "",
			message: "",
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
			descriptionError: false,
			message: "",
		});

		if (this.state.name === "") {
			this.setState({
				nameError: true,
			});
		}

		pantryService.createPantry(this.state.name).then(response => {
			this.setState({
				message: response.message,
			});
		});
	}

	render() {
		return (
			<>
				<Drawer></Drawer>
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
									<Card style={{ marginTop: "20px" }} elevation={5}>
										<p className='pt-4 pl-2 text-medium'>Create your pantry</p>
										<CardContent>
											{this.state.message && (
												<p className='mb-4 text-xs text-red-primary'>
													{this.state.message}
												</p>
											)}
											<form
												noValidate
												autoComplete='off'
												onSubmit={this.handleCreatePantry}>
												{/* {this.state.fileSubmitError && (
                                                <Button
                                                    style={{
                                                        color: this.state.fileError ? '#ffffff' : 'white',
                                                        borderColor: this.state.fileError ? '#d32f2f' : 'white'
                                                    }}
                                                    variant="text"
                                                    startIcon={<AddPhotoAlternateOutlinedIcon />}
                                                    onClick={this.onClickSelectFile}
                                                >
                                                    {('Upload image')}
                                                </Button>
                                            )} */}

												{/* {!this.state.fileSubmitError && (
                                                    <Button
                                                        disabled
                                                        style={{ color: 'white' }}
                                                        variant="text"
                                                        startIcon={<AddPhotoAlternateOutlinedIcon />}
                                                        onClick={this.onClickSelectFile}
                                                    >
                                                        {('Upload successful')}
                                                    </Button>
                                                )} */}

												{/* <input
                                                hidden
                                                type="file"
                                                style={{ display: 'none' }}
                                                ref={this.fileInputRef}
                                                accept="image/*"
                                                onChange={this.onChangeSaveFile}
                                            /> */}

												<TextField
													onChange={this.onChangeName}
													style={{ marginTop: "10px" }}
													label={"Pantry Name"}
													variant='outlined'
													fullWidth
													required
													color='secondary'
													error={this.state.nameError}
												/>

												<TextField
													onChange={this.onChangeDescription}
													label={"Description"}
													style={{ marginTop: "10px" }}
													variant='outlined'
													fullWidth
													required
													multiline
													color='secondary'
													rows={4}
													error={this.state.descriptionError}
												/>

												<Button
													style={{ marginTop: "24px", color: "white" }}
													type='submit'
													variant='text'
													color='secondary'
													endIcon={<SendOutlinedIcon />}>
													{"Create"}
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
