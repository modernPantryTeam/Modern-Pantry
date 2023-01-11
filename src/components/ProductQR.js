import React, { Component } from 'react'
import Typography from '@mui/material/Typography';
import productsService from '../services/products-service';

export default class ProductQR extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentProductQR: productsService.getCurrentProductQR(),
            QR: "",
        };
    }

    componentDidMount() {
        this.setState({
            QR: "data:image/png;base64," + this.state.currentProductQR.content,
        });

    }

    render() {
        return (
            <Typography  component="div" variant="h6">
                <img class="qr" src={this.state.QR} alt="QR Code" />
            </Typography>
        );
    }
}