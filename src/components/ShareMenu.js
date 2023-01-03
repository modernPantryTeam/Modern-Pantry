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
          {/* <a href>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0AQMAAADxGE3JAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABu0lEQVR4nO3ZUa6EIAyFYVyBS2CpbpUluAKZKJW26DW5mYdJzd8HwxC+Pp5QJqUva6lDreOJqdbSV0MVPB6P/6F34PDapB/cfCdtjMfj8aG9HLrSlPLozxAteDwe/z5fe+1+kw8ej8e/32v1swmPx+Nf6S1w+dnrn/M3Ho/HR/BD6SXy+JSemhqdWng8Hh/X39e8j84ak49n8Xg8PqZfxuh0JYdy+7XZ50R5U8Tj8fioXkvALJ1kr7TFOTqrwuPx+OB+6dGpTarfk/y08/PW9/B4PD6ql8BUcOan9dLEqtQzFY/H42P6Zd84fqqqbW8e5+cqIapJisfj8b/016yz18HSFm7+9e+HeDweH9hb6kp2s4lObaL5icfj8fG9/f9DBuMjJiff99zD4/H4N/hhdJZVvvGapAmPx+PD+rsSepS9KybbCY/H44P7pQ619iRd2/vhdPloFTwejw/sVx+dOjpfvObnn/M3Ho/Hx/KX6DxLuuYxZGvvicfj8S/0kp/JD9HuEonH4/Fv87aTez/M5ur4kJ94PB4fxGtpftrd3PpvdvUwf+PxeHwMP5TGqTQZng5d4fF4fFz/ZX0AxEIFR3IlQukAAAAASUVORK5CYII=" alt="QR Code" />
          </a> */}
          {item.label}
        </MenuItem>
      ))}
    </Menu>

  )
}

export default ShareMenu