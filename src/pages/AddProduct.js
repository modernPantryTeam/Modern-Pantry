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
import pantryService from "../services/pantry-service";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export default class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeUnit = this.onChangeUnit.bind(this);
        this.onChangePantryId = this.onChangePantryId.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);

        this.state = {
            currentPantry: pantryService.getCurrentPantryByID(),
            name: "",
            message: "",
            category: [],
            quantity: 0,
            unit: 0,
            pantryId: 0,
            date: "2023-01-01",
        };
    }

    goBack(pantry) {
        window.location.href = `/pantry/${pantry}`
    }

    componentDidMount() {

        this.setState({
            pantryId: this.state.currentPantry.content.id,
        });
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

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    handleAddProduct(e) {
        e.preventDefault();

        productsService
            .addProduct(
                this.state.name,
                this.state.pantryId,
                this.state.unit,
                this.state.quantity,
                this.state.date,
                this.setState.category = [this.state.category]
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
                                            onSubmit={this.handleAddProduct}>
                                            <TextField
                                                onChange={this.onChangeName}
                                                style={{ marginTop: "10px" }}
                                                label={"Product name"}
                                                variant='outlined'
                                                fullWidth
                                                required
                                                color='secondary'
                                            />

                                            <TextField
                                                onChange={this.onChangePantryId}
                                                style={{ marginTop: "10px" }}
                                                label={"Pantry ID"}
                                                variant='outlined'
                                                fullWidth
                                                value={this.state.pantryId}
                                                required
                                                color='secondary'
                                                disabled
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
                                            <CardActions>
                                                <Grid container direction='row' justifyContent='flex-start'>
                                                    <Button
                                                        style={{ marginTop: "24px", color: "white" }}
                                                        variant='text'
                                                        color='secondary'
                                                        onClick={() => this.goBack(this.state.pantryId)}
                                                        startIcon={<KeyboardReturnIcon />}>
                                                        {"Back"}
                                                    </Button>
                                                </Grid>
                                                <Button
                                                    style={{ marginTop: "24px", color: "white" }}
                                                    type='submit'
                                                    variant='text'
                                                    color='secondary'
                                                    endIcon={<SendOutlinedIcon />}>
                                                    {"Add"}
                                                </Button>
                                            </CardActions>
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
