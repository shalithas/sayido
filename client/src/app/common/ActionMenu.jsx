import React from 'react';
import { Menu, withStyles, MenuItem, ListItemIcon } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const ActionMenu = ({ isOpen, handleClose, anchorEl, actions }) => {
  const handleItemClick = (type) => {
    handleClose();
    if (actions[type]) {
      actions[type]();
    }
  };

  return (
    <StyledMenu
      id='customized-menu'
      keepMounted
      open={isOpen}
      onClose={handleClose}
      anchorEl={anchorEl}
    >
      <StyledMenuItem onClick={() => handleItemClick('edit')}>
        <ListItemIcon>
          <EditIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText primary='Edit' />
      </StyledMenuItem>
      <StyledMenuItem onClick={() => handleItemClick('delete')}>
        <ListItemIcon>
          <DeleteIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText primary='Delete' />
      </StyledMenuItem>
    </StyledMenu>
  );
};

export default ActionMenu;
