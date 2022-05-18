import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
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

import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import AddList from './AddList';
import AddTask from './AddTask';
import Item from './Item';
import ConfirmDelete from './ConfirmDelete';

const drawerWidth = 180;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft({
  lists,
  currentList,
  getCurrentList,
  todos,
  handleDeleteList,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [open, setOpen] = React.useState(false);

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
          {lists.map((text, index) => (
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
          {todos
            .filter((data) => data.list === getCurrentList.list)
            .map((item, index) => {
              return (
                <Item
                  // handleComplete={handleComplete}
                  key={item.id}
                  todo={item}
                  index={index}
                />
              );
            })}
        </>
      </Main>
    </Box>
  );
}
