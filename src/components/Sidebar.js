import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../sass/css/sidebar.css";
import WButtonCustom from './WButtonCustom'
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function Sidebar() {

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__box">
          <div className="pt-3">
            <a href="/">
              <input type="image" src=" https://i.imgur.com/LXfHfIz.png"></input>
            </a>
          </div>
          <div className="pt-1">
            <WButtonCustom link="/" name={"Modern Pantry"} />
          </div>
        </div>

        <div className="sidebar__box">
          <div className="sidebar__icon"><MenuBookIcon /></div>
          <div className="sidebar__title">My Pantries</div>
        </div>

        <div className="sidebar__box">
          <div className="sidebar__icon"><LeaderboardIcon /></div>
          <div className="sidebar__title">Statistics</div>
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
