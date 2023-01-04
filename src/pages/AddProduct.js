import {
	Button,
	Card,
	CardHeader,
	CardContent,
	TextField,
	Grid,
	Select,
} from "@mui/material";
import React, { Component } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ButtonCustom from "../components/ButtonCustom";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import Drawer from "../components/Drawer";
import postService from "../services/post-service";
import logger from "../logger/logger";
import lang from "i18next";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Transitions from "../components/Transition";

export default class Create extends Component {
	constructor(props) {
		super(props);
		this.handleCreatePost = this.handleCreatePost.bind(this);
		// this.onChangeSaveFile = this.onChangeSaveFile.bind(this);
		// this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeCategory = this.onChangeCategory.bind(this);
		this.onChangeQuantity = this.onChangeQuantity.bind(this);
		this.onChangeUnit = this.onChangeUnit.bind(this);
		this.onChangePantryId = this.onChangePantryId.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		// this.onClickSelectFile = this.onClickSelectFile.bind(this);

		this.state = {
			// file: {},
			// fileName: "",
			title: "",
			// description: "",
			// titleError: false,
			// descriptionError: false,
			// fileError: false,
			uploadError: true,
			// fileSubmitError: true,
			message: "",
			category: [],
			quantity: 0,
			unit: 0,
			pantryId: 0,
			date: "",
		};

		// this.fileInputRef = React.createRef();
	}

	onChangeDate(e) {
		this.setState({
			date: e.target.value,
		});
	}

	onChangePantryId(e) {
		this.setState({
			pantryId: e.target.value,
		});
	}

	onChangeUnit(e) {
		this.setState({
			unit: e.target.value,
		});
	}

	onChangeQuantity(e) {
		this.setState({
			quantity: e.target.value,
		});
	}

	onChangeCategory(e) {
		this.setState({
			category: e.target.value,
		});
	}

	// onClickSelectFile(e) {
	//     e.preventDefault();
	//     this.fileInputRef.current.click();
	// }

	onChangeTitle(e) {
		this.setState({
			title: e.target.value,
		});
	}

	// onChangeDescription(e) {
	//     this.setState({
	//         description: e.target.value
	//     });
	// }

	// onChangeSaveFile(e) {
	//     this.setState({
	//         file: e.target.files[0],
	//         fileName: e.target.files[0].name,
	//         fileSubmitError: false
	//     });
	// }

	handleCreatePost(e) {
		e.preventDefault();
		// this.setState({
		// 	titleError: false,
		// 	descriptionError: false,
		// 	message: "",
		// });

		// if (this.state.title === "") {
		// 	this.setState({
		// 		titleError: true,
		// 	});
		// }
		// if (this.state.description === "") {
		// 	this.setState({
		// 		descriptionError: true,
		// 	});
		// }
		// if (this.state.fileName === "") {
		// 	this.setState({
		// 		fileError: true,
		// 	});
		// }

		// if (this.state.title && this.state.description && this.state.fileName) {
		// 	logger.log("Add.js");
		// 	logger.log(this.state.title);
		// 	logger.log(this.state.description);
		// 	logger.log(this.state.file);
		// 	logger.log(this.state.fileName);

		// 	postService
		// 		.createPost(
		// 			this.state.title,
		// 			this.state.description,
		// 			this.state.file,
		// 			this.state.fileName
		// 		)
		// 		.then(
		// 			() => {
		// 				this.setState({
		// 					uploadError: false,
		// 				});
		// 			},
		// 			error => {
		// 				logger.log("Create.js");
		// 				logger.error(error);
		// 				const resMessage =
		// 					(error.response &&
		// 						error.response.data &&
		// 						error.response.data.message) ||
		// 					error.message ||
		// 					error.toString();
		// 				this.setState({
		// 					uploadError: true,
		// 					message: resMessage,
		// 				});
		// 			}
		// 		);
		// }
		console.log(this.state.category);
		console.log(this.state.title);
		console.log(this.state.quantity);
		console.log(this.state.unit);
		console.log(this.state.pantryId);
		console.log(this.state.date);
	}

	render() {
		if (this.state.uploadError) {
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
									<Card
										style={{ width: "900px", marginTop: "20px" }}
										elevation={5}>
										<p className='pt-4 pl-2 text-medium'>Add product</p>
										<CardContent>
											{this.state.message && (
												<p className='mb-4 text-xs text-red-primary'>
													{this.state.message}
												</p>
											)}
											<form
												noValidate
												autoComplete='off'
												onSubmit={this.handleCreatePost}>
												{/* <input
												hidden
												type='file'
												style={{ display: "none" }}
												ref={this.fileInputRef}
												accept='image/*'
												onChange={this.onChangeSaveFile}
											/> */}

												<TextField
													onChange={this.onChangeTitle}
													style={{ marginTop: "10px" }}
													label={"Product name"}
													variant='outlined'
													fullWidth
													required
													color='secondary'
													error={this.state.titleError}
												/>

												<TextField
													onChange={this.onChangePantryId}
													style={{ marginTop: "10px" }}
													label={"Pantry ID"}
													variant='outlined'
													fullWidth
													required
													color='secondary'
													error={this.state.titleError}
												/>

												<FormControl
													style={{ marginTop: "10px" }}
													fullWidth
													variant='outlined'
													required>
													<InputLabel>Category</InputLabel>
													<Select
														value={this.state.category}
														fullWidth
														label={"Category"}
														multiple
														onChange={this.onChangeCategory}>
														<MenuItem value={1}>Dairy</MenuItem>
														<MenuItem value={2}>Alcohol</MenuItem>
														<MenuItem value={3}>Bread</MenuItem>
														<MenuItem value={4}>Fruit</MenuItem>
														<MenuItem value={5}>Vegetable</MenuItem>
														<MenuItem value={6}>Conserves</MenuItem>
													</Select>
												</FormControl>

												<FormControl
													style={{ marginTop: "10px" }}
													fullWidth
													variant='outlined'
													color='secondary'
													required>
													<InputLabel>Units</InputLabel>
													<Select
														fullWidth
														label={"Units"}
														onChange={this.onChangeUnit}>
														<MenuItem value={0}>L</MenuItem>
														<MenuItem value={1}>ML</MenuItem>
														<MenuItem value={2}>kg</MenuItem>
														<MenuItem value={3}>g</MenuItem>
														<MenuItem value={4}>Piece</MenuItem>
														<MenuItem value={5}>Bottle</MenuItem>
														<MenuItem value={6}>Can</MenuItem>
													</Select>
												</FormControl>

												<TextField
													onChange={this.onChangeQuantity}
													style={{ marginTop: "10px" }}
													label={"Quantity"}
													variant='outlined'
													fullWidth
													required
													color='secondary'
													error={this.state.titleError}
												/>

												<TextField
													onChange={this.onChangeDate}
													style={{ marginTop: "10px" }}
													type='date'
													variant='outlined'
													fullWidth
													required
													color='secondary'
													error={this.state.titleError}
												/>

												<Button
													style={{ marginTop: "24px", color: "white" }}
													type='submit'
													variant='text'
													color='secondary'
													endIcon={<SendOutlinedIcon />}>
													{"Add product"}
												</Button>
											</form>
										</CardContent>
									</Card>
								</Grid>
							</Grid>
						</div>
					</Transitions>
				</>
			);
		} else {
			return (
				<>
					<Drawer></Drawer>
					<Transitions>
						<Grid
							container
							spacing={0}
							direction='column'
							alignItems='center'
							justify='center'
							style={{ minHeight: "100vh" }}>
							<Grid item xs={3}>
								<Card
									style={{ width: "614px", marginTop: "20px" }}
									elevation={5}>
									<CardHeader title='New title' />
									<CardContent>
										<ButtonCustom
											link='/Profile'
											name={lang.t("profile")}
											icon={<AccountBoxOutlinedIcon />}
										/>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Transitions>
				</>
			);
		}
	}
}
