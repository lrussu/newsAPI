import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as searchActions from '../../redux/actions/search-actions';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

function CustomizedInputBase(props) {
    const classes = useStyles();

    const { searchByQuery } = props.actions;
    const submitQuery = () => searchByQuery(queryValue);

    var queryValue = "";
    const changeQueryValue = (value) => queryValue = value;

    return (
        <Paper className={classes.root}>

            <IconButton className={classes.iconButton} aria-label="search" disabled>
                <SearchIcon />
            </IconButton>

            <InputBase
                className={classes.input}
                placeholder="Search"
                inputProps={{ 'aria-label': 'Search' }}
                onChange={ (e) => changeQueryValue(e.target.value) }
            />

            <Divider className={classes.divider} orientation="vertical" />

            <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={ () => submitQuery() }>
                <ArrowUpward />
            </IconButton>
        </Paper>
    );
}

const mapStateToProps = function(state) {
    console.log(state)
    return {
        categoryList: state.initialState.category,
        selectedCategory: state.selectedCategory.selectedCategory
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(searchActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedInputBase);