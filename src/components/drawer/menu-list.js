import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const categoryStr = 'business entertainment general health science sports technology';
const category = categoryStr.split(' ');

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function MenuList() {
    return (

                <List>
                    {category.map((text, index) => (
                        <ListItem button key={text} selected={index == 3 ? "selected" : ""}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <Link to='/'><ListItemText primary={capitalize(text)} /></Link>
                        </ListItem>
                    ))}
                </List>
                // <Divider />
                // <List>
                //     {['All mail', 'Trash', 'Spam'].map((text, index) => (
                //         <ListItem button key={text}>
                //             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                //             <ListItemText primary={text} />
                //         </ListItem>
                //     ))}
                // </List>
    );
}