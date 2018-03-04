import React from 'react';
import axios from 'axios';
import Video from './Video';

class Home extends React.Component {
  constructor() {
    super();

    this.apiUrl = `https://www.googleapis.com/youtube/v3/search`;
    this.apiKey = `AIzaSyBeimXtjgzfQcogY-fP8_CHPybmLpFaieo`;
    this.maxResults = `20`;
    this.url = `${this.apiUrl}?key=${
      this.apiKey
    }&part=snippet&type=video&maxResults=${this.maxResults}&q=surf`;

    this.state = {
      url: this.url,
      videos: [],
      nextPageToken: '',
    };
  }

  componentDidMount() {
    this.getVideos(this.url);
    window.addEventListener('scroll', this.onScroll.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // this is being called every scroll, find a way to debounce this
      // this.getMoreVideos();
    }
  }

  getVideos(url) {
    axios.get(url).then(response => {
      const newVids = this.state.videos.concat(response.data.items);

      this.setState({
        videos: newVids,
        nextPageToken: response.data.nextPageToken,
      });

      console.log(response);
      console.log(this.state);
    });
  }

  getMoreVideos() {
    const nextPageUrl = `${this.state.url}&pageToken=${
      this.state.nextPageToken
    }`;
    this.getVideos(nextPageUrl);
  }

  render() {
    return (
      <div className="Home">
        {this.state.videos.map((item, index) => (
          <Video key={index} video={item} />
        ))}
      </div>
    );
  }
}

export default Home;
