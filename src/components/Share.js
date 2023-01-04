import React from 'react'
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ShareMenu from './ShareMenu';
import Paper from '@mui/material/Paper';
import QR from './QR';
import ShareIcon from '@mui/icons-material/Share';

const QR1 = [
    {
        id: 0,
        label: <QR></QR>
    },
];

// eslint-disable-next-line no-empty-pattern
const Share = ({}) => {
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
                    size="small"
                    onClick={handleOpen}
                    anchorEl={anchorEl}
                    startIcon={<ShareIcon />}
                >
                    Share
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

export default Share