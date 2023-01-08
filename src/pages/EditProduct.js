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
import withRouter from "../components/withRouter";

class EditProduct extends Component {

    constructor(props) {
        super(props);
        this.handleEditProduct = this.handleEditProduct.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeUnit = this.onChangeUnit.bind(this);
        this.onChangeProductId = this.onChangeProductId.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);


        this.state = {
            currentProduct: productsService.getCurrentProduct(),
            name: "",
            message: "",
            category: 0,
            quantity: 0,
            unit: 0,
            productId: 0,
            date: "",
        };
    }

    componentDidMount() {

        this.setState({
            productId: this.props.params.product,
            name: this.state.currentProduct.content.name,
            category: this.state.currentProduct.content.categories[0].id,
            unit: this.state.currentProduct.content.unit,
            quantity: this.state.currentProduct.content.amount,
            date: this.state.currentProduct.content.expieryDate,
        });
    }

    handleClick(id) {
        console.log(id);
        productsService.deleteProduct(id);
    }

    onChangeDate(e) {
        this.setState({
            date: e.target.value,
        });
    }

    onChangeProductId(e) {
        this.setState({
            productId: e.target.value,
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

    handleEditProduct(e) {
        e.preventDefault();

        productsService
            .editProduct(
                this.state.name,
                this.state.productId,
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
                                                onClick={() => this.handleClick(this.props.params.product)}
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
                                                onChange={this.onChangeName}
                                                style={{ marginTop: "10px" }}
                                                label={"Product name"}
                                                variant='outlined'
                                                fullWidth
                                                required
                                                color='secondary'
                                                value={this.state.name}
                                            />

                                            <TextField
                                                onChange={this.onChangeProductId}
                                                style={{ marginTop: "10px" }}
                                                label={"Product ID"}
                                                variant='outlined'
                                                fullWidth
                                                required
                                                disabled
                                                value={this.state.productId}
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
                                                    value={this.state.unit}
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
                                                value={this.state.quantity}
                                            />

                                            <TextField
                                                onChange={this.onChangeDate}
                                                style={{ marginTop: "10px" }}
                                                label={"Expiry date"}
                                                variant='outlined'
                                                fullWidth
                                                required
                                                color='secondary'
                                                value={this.state.date}
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
export default withRouter(EditProduct);
