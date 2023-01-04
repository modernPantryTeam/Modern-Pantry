import React, { Component } from 'react'
import Typography from '@mui/material/Typography';
import pantryService from '../services/pantry-service';

export default class QR extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPantryQR: pantryService.getCurrentPantryQR(),
            QR: "",
        };
    }

    componentDidMount() {
        this.setState({
            QR: "data:image/png;base64," + this.state.currentPantryQR.content,
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