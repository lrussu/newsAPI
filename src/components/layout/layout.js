import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import News from "../top-news/top-news";
import MenuList from "../drawer/menu-list";
import CustomizedInputBase from "../search/search";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: 2,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        // width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: drawerWidth,
        // transition: theme.transitions.create(['margin', 'width'], {
        //     easing: theme.transitions.easing.easeOut,
        //     duration: theme.transitions.duration.enteringScreen,
        // }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },

    open: {
        display: 'visible',
    },

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 1,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PersistentDrawerLeft() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>

                    <Grid container spacing={3} direction="row">
                        <Grid item xs={12} sm={3}>
                           <Grid container direction="row" alignItems="center">
                               <Grid item>
                                   <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={open ? handleDrawerClose : handleDrawerOpen}
                                        edge="start"
                                        className={clsx(classes.menuButton, open && classes.open)}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                               </Grid>
                               <Grid item>
                            <Typography variant="h6" noWrap>
                                News API
                            </Typography>
                               </Grid>

                           </Grid>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <CustomizedInputBase />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
>

                <div className={classes.drawerHeader}>
                   <br />>
                </div>


                <MenuList />
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />

                <Switch>
                    <Route exact path='/' component={News}/>
                </Switch>
            </main>
        </div>
    );
}