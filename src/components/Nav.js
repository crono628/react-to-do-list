import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import FilterListIcon from '@mui/icons-material/FilterList';

import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AddList from './AddList';
import AddTask from './AddTask';
import Item from './Item';
import ConfirmDelete from './ConfirmDelete';
import { useState } from 'react';
import { DrawerHeader, Main, AppBar, drawerWidth } from '../helpers/helpers';

export default function PersistentDrawerLeft({
  lists,
  currentList,
  getCurrentList,
  todos,
  handleDeleteList,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [ascending, setAscending] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: 'rgb(91, 215, 224)' }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" textAlign="center">
            {!getCurrentList.list ? 'To Do' : getCurrentList.list}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'rgb(91, 215, 224)',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ ml: 3 }}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon fontSize="large" />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List>
          <AddList
            onClick={() => {
              handleDrawerClose();
            }}
          />
        </List>

        <Divider />
        <List sx={{ height: '100%', overflowY: 'scroll' }}>
          {lists.map((text) => (
            <ListItem
              disablePadding
              key={text.list}
              onClick={currentList}
              sx={{
                backgroundColor:
                  getCurrentList.list === text.list ? 'rgb(183, 246, 250)' : '',
              }}
            >
              <ListItemButton>
                <ListItemText primary={text.list} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <ConfirmDelete handleDelete={handleDeleteList} />
        <Button
          onClick={handleLogout}
          variant="outlined"
          size="small"
          sx={{
            mx: 3,
            mb: 7,
            borderColor: 'white',
            color: 'white',
            '&:hover': {
              color: 'rgb(91, 215, 224)',
              borderColor: 'white',
              backgroundColor: 'white',
            },
          }}
          endIcon={<LogoutIcon />}
        >
          Log Out
        </Button>
      </Drawer>
      <Main
        open={open}
        sx={{
          backgroundColor: 'lightgrey',
        }}
      >
        <DrawerHeader />
        <>
          <List
            onClick={() => {
              handleDrawerClose();
            }}
            sx={{ m: 2 }}
          >
            <AddTask currentList={getCurrentList ? getCurrentList : ''} />
          </List>
          {getCurrentList ? (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={() => setAscending((prev) => !prev)}>
                <Typography mr={2}>
                  {ascending ? 'Oldest first' : 'Newest first'}
                </Typography>
                <FilterListIcon />
              </IconButton>
            </div>
          ) : null}
          {todos
            .filter((data) => data.list === getCurrentList.list)
            .sort((a, b) => {
              if (ascending) {
                if (a.timestamp > b.timestamp) {
                  return 1;
                }
                if (a.timestamp < b.timestamp) {
                  return -1;
                }
                return 0;
              } else {
                if (a.timestamp < b.timestamp) {
                  return 1;
                }
                if (a.timestamp > b.timestamp) {
                  return -1;
                }
                return 0;
              }
            })
            .map((item, index) => {
              return <Item key={item.id} todo={item} index={index} />;
            })}
        </>
      </Main>
    </Box>
  );
}
