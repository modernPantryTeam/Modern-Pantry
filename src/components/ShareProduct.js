import React from 'react'
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ShareMenu from './ShareMenu';
import Paper from '@mui/material/Paper';
import ProductQR from './ProductQR';
import QrCode2Icon from '@mui/icons-material/QrCode2';

const QR1 = [
    {
        id: 0,
        label: <ProductQR></ProductQR>
    },
];

// eslint-disable-next-line no-empty-pattern
const ShareProduct = ({}) => {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip >
                <Button
                    style={{ color: 'white', justifyContent: 'flex-end' }}
                    color="inherit"
                    size="inherit"
                    onClick={handleOpen}
                    anchorEl={anchorEl}
                    endIcon={<QrCode2Icon />}
                >
                </Button>
                
            </Tooltip>
            
            <Paper>
            <ShareMenu
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                menuItems={QR1}
            />
            </Paper>
        </div>
    )
}

export default ShareProduct