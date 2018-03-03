import React from 'react';
import axios from 'axios';
import Video from './Video';

class Home extends React.Component {
  constructor() {
    super();

    this.apiUrl = `https://www.googleapis.com/youtube/v3/search`;
    this.apiKey = `AIzaSyBeimXtjgzfQcogY-fP8_CHPybmLpFaieo`;
    this.maxResults = `30`;

    this.state = {
      vids: [],
      nextPageToken: '',
    };
  }

  componentDidMount() {
    this.getVideos();
  }

  getVideos() {
    axios
      .get(
        `${this.apiUrl}?key=${this.apiKey}&part=snippet&type=video&maxResults=${
          this.maxResults
        }&q=surf`
      )
      .then(response => {
        const newVids = this.state.vids.concat(response.data.items);

        this.setState({
          vids: newVids,
          nextPageToken: response.data.nextPageToken,
        });

        console.log(response);
        console.log(this.state);
      });
  }

  render() {
    return (
      <div className="Home">
        {this.state.vids.map((item, index) => (
          <Video key={index} video={item} />
        ))}
      </div>
    );
  }
}

export default Home;
