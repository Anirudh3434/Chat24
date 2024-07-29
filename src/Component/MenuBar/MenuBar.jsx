import React from 'react'
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';

function Menubar() {
    return (
        <Menu menuButton={<MenuButton>:</MenuButton>}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Help</MenuItem>
        <MenuItem>About</MenuItem>
    
        
      </Menu>
    )
}

export default Menubar
