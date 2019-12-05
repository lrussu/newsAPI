import React from "react";
import { useEffect } from "react";

import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import ListItemLoader from "../loader/loader";
import { bindActionCreators } from 'redux';
import * as newsActions from '../../redux/actions/news-actions';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },

    scroll: {
        backgroundColor: 'text.primary',
        height: 300,
        overflow: 'scroll',
    },

    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2)
    },

    relativeBox: {
        position: 'relative',
        width: 100,
        height: 100,
        overflow: 'hidden',
        radius: 8
    },

    imageBox: {
        position: 'relative',
        margin: 'auto',
        width: 100,
        height: 100,
        overflow: 'hidden',
        radius: 8,

        borderColor: 'text.primary',
        m: 1,
        border: 1,
    },

    image: {
        position: 'absolute',
            display: 'block',
            maxHeight: '100%',

    }
}));


const generateImageUrl = (imageUrl, newsUrl, category, imageIndex) => {
    var imgSrc = imageUrl;

    if (imgSrc === null) {
        let re = /^https:\/\/www.youtube.com\/watch.{1}v=(?<id>.+?)$/;
        if ( re.test(newsUrl)) {
            let r = re.exec(newsUrl);
            imgSrc = `https://img.youtube.com/vi/${r[1]}/0.jpg`;
        } else {
            const categoryPath = ((category === null) || (category === undefined))  ? '/general' : `/${category}`

            imgSrc = `https://loremflickr.com/320/240${categoryPath}?lock=${imageIndex}`
        }
    }

    return imgSrc
}

function News(props) {

    const classes = useStyles();

    const handleScroll = () => {

        const { fetchMoreNews } = props.actions
        const { moreNewsRequest } = props

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            if (moreNewsRequest) {
                fetchMoreNews(moreNewsRequest);
            } else {
                console.log("moreNewsRequest is null")
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll );

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    const { isLoading, error, news, category } = props;

    if (news.length === 0 && isLoading) return <ListItemLoader />;
    if ( error !== null ) return <p>Error: {error}</p>;

    return (
            <div className="root">
                <div className="col-xs-8">
                    <h1>News</h1>
                    <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        { news.map(
                            function (item, index) {
                                const { urlToImage, url, title, description } = item
                                const imgSrc = generateImageUrl(urlToImage, url, category, index)
                                const { paper, imageBox, image} = classes

                                return <Paper key={`item${index}`} className={ paper } xs={12} sm={12}>
                                    <Grid container spacing={2}>
                                        <Grid key={index} item xs={12} sm>
                                            <Typography variant="h6" component="h6">
                                             { title }
                                            </Typography>
                                            <Typography component="p">
                                               { description }
                                            </Typography>
                                         </Grid>
                                        <Grid key={`i${index}`} item>
                                             <Box borderRadius={16} className={ imageBox }>
                                                 <img className={ image } src={ imgSrc } alt=""/>
                                             </Box>
                                         </Grid>
                                    </Grid>
                                </Paper>
                        })}
                    </Grid>
                </div>
            </div>
        );
}

const mapStateToProps = state => ({
    isLoading: state.newsReducer.isLoading,
    news: state.newsReducer.news,
    error: state.newsReducer.error,
    selectedCategory: state.selectedCategory.selectedCategory,

    moreNewsRequest: state.newsReducer.moreNewsRequest ?
        {
            category: state.selectedCategory.selectedCategory,
            q: null,
            page: state.newsReducer.moreNewsRequest.page
        } : null
})

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(newsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News)