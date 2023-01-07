import {
    Button,
    Card,
    CardContent,
    TextField,
    Grid,
    Select,
    CardActions,
} from "@mui/material";
import React, { Component } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Drawer from "../components/Drawer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Transitions from "../components/Transition";
import productsService from "../services/products-service";
import DeleteIcon from '@mui/icons-material/Delete';

export default class Create extends Component {

    constructor(props) {
        super(props);
        this.handleEditProduct = this.handleEditProduct.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeUnit = this.onChangeUnit.bind(this);
        this.onChangeProductId = this.onChangeProductId.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);

        this.state = {
            //currentProduct: productsService.getCurrentProductByID(),
            title: "",
            message: "",
            category: [],
            quantity: 0,
            unit: 0,
            productID: 0,
            date: "2023-01-01",
        };
    }

	 handleClick(id) {
		console.log(id);
		productsService.deleteProduct(id);
	}

    // componentDidMount() {

    //     this.setState({
    //         productID: this.state.currentProduct.content.id,
    //     });
    // }

    onChangeDate(e) {
        this.setState({
            date: e.target.value,
        });
    }

    onChangeProductId(e) {
        this.setState({
            productID: e.target.value,
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

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    handleEditProduct(e) {
        e.preventDefault();

        productsService
            .editProduct(
                this.state.title,
                this.state.productID,
                this.state.unit,
                this.state.quantity,
                this.state.date,
                this.state.category
            )
            .then(response => {
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
                                <Card
                                    style={{ maxWidth: "600px", marginTop: "20px" }}
                                    elevation={5}>
                                    <CardActions>
                                        <Grid container direction='row' justifyContent='flex-start'>
                                        <p className='pt-4 pl-2 text-medium'>Manage product</p>
                                        </Grid>
                                        <form>
                                            <Button
                                                style={{ justifyContent: 'flex-end' }}
                                                color="inherit"
                                                size="small"
                                                startIcon={<DeleteIcon />}
                                                //onClick={() => handleClick(id)}
                                            >
                                                Delete
                                            </Button>
                                        </form>
                                    </CardActions>
                                    <CardContent>
                                        {this.state.message && (
                                            <p className='mb-4 text-xs text-red-primary'>
                                                {this.state.message}
                                            </p>
                                        )}
                                        <form
                                            noValidate
                                            autoComplete='off'
                                            onSubmit={this.handleEditProduct}>
                                            <TextField
                                                onChange={this.onChangeTitle}
                                                style={{ marginTop: "10px" }}
                                                label={"Product name"}
                                                variant='outlined'
                                                fullWidth
                                                required
                                                color='secondary'
                                            />

                                            <TextField
                                                onChange={this.onChangeProductId}
                                                style={{ marginTop: "10px" }}
                                                label={"Product ID"}
                                                variant='outlined'
                                                fullWidth
                                                required
                                                color='secondary'
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
                                            />

                                            <TextField
                                                onChange={this.onChangeDate}
                                                style={{ marginTop: "10px" }}
                                                type='date'
                                                value={this.state.date}
                                                label={"Expiry date"}
                                                variant='outlined'
                                                fullWidth
                                                required
                                                color='secondary'
                                            />

                                            <Button
                                                style={{ marginTop: "24px", color: "white" }}
                                                type='submit'
                                                variant='text'
                                                color='secondary'
                                                endIcon={<SendOutlinedIcon />}>
                                                {"Edit product"}
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
    }
}
