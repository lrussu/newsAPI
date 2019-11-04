import axios from "axios";
import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const apiUrl = 'https://newsapi.org/v2/';
const apiKey = 'apiKey=e0db911125a640929f14373ef2b3a766';
const countryArg = 'country=us';

class TopNews extends Component {

    state = {
        news: []
    }

    componentDidMount() {
        const topUrl = `${apiUrl}top-headlines?${countryArg}&${apiKey}`;
        axios.get(topUrl).then(response => response.data)
            .then((data) => {
                this.setState({news: data.articles})
                console.log(this.state.news)
            })

        const sourceUrl = `${apiKey}sources?${apiKey}`;
        axios.get(sourceUrl).then(response => response.data)
            .then((data) => {
                this.setState({news: data.sources})
                console.log(this.state.news)
            })
    }

    render() {
        return (

            <div className="container">
                <div className="col-xs-8">
                    <h1>React Axios Example</h1>
                    <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="left"
                    >

                        {this.state.news.map(function (news, index) {
                            var imgSrc = news.urlToImage;
                            let re = /^https:\/\/www.youtube.com\/watch.{1}v=(?<id>.+?)$/;
                            if (imgSrc == null && re.test(news.url)) {
                                let r = re.exec(news.url);

                                imgSrc = `https://img.youtube.com/vi/${r[1]}/0.jpg`;
                            }


                            return <Grid item xs zeroMinWidth>
                                <Paper>
                                    <div className="card" key={index}>
                                        <div className="card-body">
                                            <img src={imgSrc} width="175" alt="Image"/>
                                            <h3 className="card-title">{news.title}</h3>
                                            <h6 className="card-subtitle mb-2 text-muted">
                                                {news.description}
                                            </h6>
                                        </div>
                                    </div>
                                </Paper>
                            </Grid>
                        })}
                    </Grid>
                </div>
            </div>
        );
    }
}
export default TopNews;
