import React from 'react'
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import BasicMenu from './BasicMenu';

const notifications = [
    {
        id: 0,
        label: 'Bread is about to expire'
    },
    {
        id: 1,
        label: 'You need to resupply beer'
    },
];

const NotificationBellSidebar = ({ iconColor }) => {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const newNotifications = `You have ${notifications.length} new notifications!`;
    const noNotifications = 'No new notifications';

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title={notifications.length ? newNotifications : noNotifications}>
                    <Badge 
                        badgeContent={notifications.length}
                        color="error"
                    >
                        <NotificationsIcon/>
                    </Badge>
            </Tooltip>
            <BasicMenu
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                menuItems={notifications}
            />
        </div>
    )
}

export default NotificationBellSidebar