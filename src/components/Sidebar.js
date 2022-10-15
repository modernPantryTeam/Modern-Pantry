import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../sass/css/sidebar.css";

function Sidebar() {
	
	return (
		<>
			<div className="sidebar">
        <div className="sidebar__box">
          <div className="sidebar__icon"><LoginOutlinedIcon /></div>
          <div className="sidebar__title">Home</div>
        </div>

        <div className="sidebar__box">
          <div className="sidebar__icon"><SearchIcon /></div>
          <div className="sidebar__title">Explore</div>
        </div>

        <div className="sidebar__box">
          <div className="sidebar__icon"><SendIcon /></div>
          <div className="sidebar__title">Messages</div>
        </div>

        <div className="sidebar__box">
          <div className="sidebar__icon"><NotificationsIcon /></div>
          <div className="sidebar__title">Notifications</div>
        </div>

        <div className="sidebar__box">
          <div className="sidebar__icon"><AddCircleOutlineIcon /></div>
          <div className="sidebar__title">Create</div>
        </div>

      </div>
		</>
	);
}
export default Sidebar;
