import React from 'react';
import axios from 'axios';
import VideoCard from './VideoCard';
import Loader from './Loader';

class Home extends React.Component {
  constructor() {
    super();

    this.apiUrl = `https://www.googleapis.com/youtube/v3/search`;
    this.apiKey = `AIzaSyDlfQm7nBRAel8gfWKOdv2E_gMRsG14RwE`;
    this.maxResults = `20`;
    this.url = `${this.apiUrl}?key=${
      this.apiKey
    }&part=snippet&type=video&maxResults=${this.maxResults}&q=react native`;

    this.throttleTimer = null;
    this.throttleDelay = 100;

    this.state = {
      url: this.url,
      videos: [],
      nextPageToken: '',
    };

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.getVideos(this.url);
    window.addEventListener('scroll', this.onScroll.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    let _this = this;
    clearTimeout(_this.throttleTimer);
    _this.throttleTimer = setTimeout(() => {
      // if scrolled to the bottom
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        _this.getMoreVideos();
      }
    }, _this.throttleDelay);
  }

  getVideos(url) {
    axios.get(url).then(response => {
      if (response.status !== 200) {
        throw new Error('Uh oh, something went wrong');
      }

      const newVids = this.state.videos.concat(response.data.items);

      this.setState({
        videos: newVids,
        nextPageToken: response.data.nextPageToken,
      });
    });
  }

  getMoreVideos() {
    const nextPageUrl = `${this.state.url}&pageToken=${
      this.state.nextPageToken
    }`;
    this.getVideos(nextPageUrl);
  }

  render() {
    console.log('checkVideo', this.state.videos);

    return this.state.videos.length ? (
      <div className="Home">
        {this.state.videos.map((item, index) => (
          <VideoCard key={index} video={item} />
        ))}
      </div>
    ) : (
      <Loader />
    );
  }
}

export default Home;
