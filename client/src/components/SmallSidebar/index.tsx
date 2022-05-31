import React from 'react';
import { Box, Typography, Modal, List, ListItemButton, ListItemIcon, ListItemText, ListItem } from '@mui/material';

import { NavLink } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useAppContext } from '../../context/AppContext';
import links from '../SidebarLinks';
import LargeLogo from '../Logo/LargeLogo';

const style = {
  position: 'absolute',
  top: '5%',
  bottom: '5%',
  left: '5%',
  right: '5%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function SmallSidebar() {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <div>
      <Modal open={showSidebar} onClose={toggleSidebar}>
        <Box sx={style} display="flex" flexDirection="column" rowGap={4}>
          <CloseIcon
            onClick={toggleSidebar}
            fontSize="large"
            color="primary"
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          />
          <LargeLogo />
          <List>
            {links.map((link) => {
              const { id, path, text, icon } = link;
              return (
                <ListItem key={id} sx={{ width: '100%' }}>
                  <NavLink to={path} onClick={toggleSidebar} style={{ textDecoration: 'none', width: '100%' }}>
                    <ListItemButton
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        '&:hover *': {
                          color: 'primary.main',
                        },
                      }}>
                      <Box display="flex" width="8rem" justifyContent="space-between" alignItems="center">
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={text} sx={{ textTransform: 'capitalize', color: 'text.secondary' }} />
                      </Box>
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Modal>
    </div>
  );
}

export default SmallSidebar;
