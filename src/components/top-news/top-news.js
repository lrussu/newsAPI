import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2)
    },

    relativeBox: {
        position: 'relative',
        // z-index: 1,
        width: 100,
        height: 100,
        overflow: 'hidden',
        // -webkit-border-radius: 8,
        radius: 8
    },

    imageBox: {
        position: 'relative',
        margin: 'auto',
        // z-index: 1,
        width: 100,
        height: 100,
        overflow: 'hidden',
        // -webkit-border-radius: 8,
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

function News(props) {

    const news = props.news
    const category = props.selectedCategory

    const classes = useStyles();

        return (
            <div className="root">
                <div className="col-xs-8">
                    <h1>React Axios Example</h1>
                    <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="flex-start"
                        spacing={2}
                        xs={12}
                    >
                        { news.map(function (item, index) {
                            var imgSrc = item.urlToImage;

                            if (imgSrc == null) {
                                let re = /^https:\/\/www.youtube.com\/watch.{1}v=(?<id>.+?)$/;
                                if ( re.test(item.url)) {
                                    let r = re.exec(item.url);
                                    imgSrc = `https://img.youtube.com/vi/${r[1]}/0.jpg`;
                                } else {
                                    const categoryPath = category ? `/${category}` : ''

                                    imgSrc = `https://loremflickr.com/320/240${categoryPath}?lock=${index}`
                                }
                            }

                            return <Paper className={classes.paper}  xs={12}>
                                <Grid container spacing={2}  xs={12}>
                                    <Grid key={index} item xs={12} sm>
                                    <Typography variant="h6" component="h6">
                                        {item.title}
                                    </Typography>
                                    <Typography component="p">
                                        {item.description}
                                    </Typography>
                                 </Grid>
                                <Grid key={`i${index}`} item>
                                    <Box borderRadius={16} className={classes.imageBox}>
                                        <img className={classes.image} src={imgSrc} alt=""/>
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
    news: state.fetchedNews.news,
    selectedCategory: state.selectedCategory.selectedCategory
})

export default connect(mapStateToProps, null)(News)

