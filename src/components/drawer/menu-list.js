import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as categoryActions from '../../redux/actions/category-actions';

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function MenuList(props) {
    const category = props.categoryList
    const { selectedCategory } = props

    const { setCategory } = props.actions;
    const selectCategory = (categoryName) => setCategory(categoryName);

    return (
        <List>
            { category.map((categoryName, index) => (
                <ListItem button component="button" onClick={ () => selectCategory(categoryName) } key={categoryName} selected={categoryName === selectedCategory ? true : false}>
                    <ListItemIcon>{index % 2 === 0 ? <FitnessCenterIcon /> : <DirectionsBikeIcon />}</ListItemIcon>
                    <Link to='/'><ListItemText primary={ capitalize(categoryName) } /></Link>
                </ListItem>
            ))}
        </List>
    );
}

const mapStateToProps = function(state) {
    return {
        categoryList: state.initialState.category,
        selectedCategory: state.selectedCategory.selectedCategory
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(categoryActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);