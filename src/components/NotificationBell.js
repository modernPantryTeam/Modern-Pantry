import React from "react";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import BasicMenu from "./BasicMenu";
import notificationsService from "../services/notifications-service";

// const notifications = [
//     {
//         label: 'Bread is about to expire'
//     },
//     {
//         label: 'You need to resupply on beer'
//     },
//     {
//         label: 'Water is about to run out'
//     },
//     {
//         label: 'You need to resupply on Cola'
//     },
//     {
//         label: 'Bread is about to run out'
//     },
//     {
//         label: 'Cheese is about to expire'
//     },
// ];

const NotificationBell = ({ iconColor }) => {
	const [open, setOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [notifications, setNotifications] = React.useState([]);

	document.addEventListener("DOMContentLoaded", () => {
		notificationsService.getNotifications().then(response => {
			setNotifications(response.content);
		});
	});

	const newNotifications = `You have ${notifications.length} new notifications!`;
	const noNotifications = "No new notifications";

	const handleOpen = event => {
		setAnchorEl(event.currentTarget);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Tooltip
				title={notifications.length ? newNotifications : noNotifications}>
				<Button
					style={{ color: "white" }}
					color={iconColor}
					onClick={notifications.length ? handleOpen : null}
					anchorEl={anchorEl}>
					<Badge
						style={{ marginRight: "5px" }}
						badgeContent={notifications.length}
						color='error'>
						<NotificationsIcon />
					</Badge>
					Notifications
				</Button>
			</Tooltip>
			<BasicMenu
				open={open}
				anchorEl={anchorEl}
				handleClose={handleClose}
				menuItems={notifications}
			/>
		</div>
	);
};

export default NotificationBell;
