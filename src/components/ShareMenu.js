import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ShareMenu = ({ anchorEl, handleClose, open, menuItems }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      {menuItems.map((item) => (
        <MenuItem
          onClick={handleClose}
        >
          <a href>
            <input type="image" alt="pantry logo" src="https://i.imgur.com/IgrB5TO.png"></input>
          </a>
          {item.label}
        </MenuItem>
      ))}
    </Menu>

  )
}

export default ShareMenu