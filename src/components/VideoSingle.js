import React from 'react';
import axios from 'axios';
import moment from 'moment';
import VideoCard from './VideoCard';
import Comment from './Comment';
import Loader from './Loader';

class VideoSingle extends React.Component {
  constructor(props) {
    super(props);

    this.videoId = props.videoId;
    this.apiVideos = `https://www.googleapis.com/youtube/v3/videos`;
    this.apiSearch = `https://www.googleapis.com/youtube/v3/search`;
    this.apiComments = `https://www.googleapis.com/youtube/v3/commentThreads`;
    this.apiKey = `AIzaSyBeimXtjgzfQcogY-fP8_CHPybmLpFaieo`;
    this.videoUrl = `${this.apiVideos}?key=${this.apiKey}&id=${
      this.videoId
    }&part=contentDetails,player,snippet,statistics`;

    this.throttleTimer = null;
    this.throttleDelay = 100;

    this.state = {
      videoId: this.videoId,
      videoUrl: this.videoUrl,
      video: {},
      channelVideosUrl: ``,
      channelVideos: [],
      commentsUrl: ``,
      comments: [],
    };

    this.getVideo = this.getVideo.bind(this);
    this.onVideoLoad = this.onVideoLoad.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.getVideo(this.state.videoUrl);
    window.addEventListener('scroll', this.onScroll.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.videoId !== this.state.id) {
      const videoId = nextProps.videoId;
      const videoUrl = `${this.apiVideos}?key=${this.apiKey}&id=${
        nextProps.videoId
      }&part=contentDetails,player,snippet,statistics`;
      this.setState({ videoId, videoUrl });
      this.getVideo(videoUrl);
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  onScroll() {
    let _this = this;
    clearTimeout(_this.throttleTimer);
    _this.throttleTimer = setTimeout(() => {
      // if scrolled to the bottom load more comments
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // _this.onVideoLoad();
      }
    }, _this.throttleDelay);
  }

  getVideo(url) {
    axios
      .get(url)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Uh oh, something went wrong');
        }

        const video = response.data.items[0];
        const channelVideosUrl = `${this.apiSearch}?key=${
          this.apiKey
        }&channelId=${video.snippet.channelId}&part=snippet,id&order=date`;
        const commentsUrl = `${this.apiComments}?key=${this.apiKey}&videoId=${
          video.id
        }&part=id,snippet`;

        this.setState({
          video,
          channelVideosUrl,
          commentsUrl,
        });
      })
      .then(response => {
        this.onVideoLoad();
      });
  }

  getChannelVideos() {
    return axios.get(this.state.channelVideosUrl);
  }

  getComments() {
    return axios.get(this.state.commentsUrl);
  }

  onVideoLoad() {
    const _this = this;
    axios.all([_this.getChannelVideos(), _this.getComments()]).then(
      axios.spread((videos, comments) => {
        if (videos.status !== 200 || comments.status !== 200) {
          throw new Error('Uh oh, something went wrong');
        }
        _this.setState({
          channelVideos: videos.data.items,
          comments: comments.data.items,
        });
      })
    );
  }

  render() {
    const { player, snippet, statistics } = this.state.video;

    return snippet ? (
      <div className="VideoSingle">
        <div className="VideoSingle__main">
          <div
            className="VideoSingle__player"
            dangerouslySetInnerHTML={{
              __html: player.embedHtml,
            }}
          />
          <div className="VideoSingle__details">
            <h1 className="VideoSingle__title">{snippet.title}</h1>
            <div className="VideoSingle__detail-wrapper">
              <div className="VideoSingle__channel">{snippet.channelTitle}</div>
              <div className="VideoSingle__views">
                {this.numberWithCommas(statistics.viewCount)} Views
              </div>
            </div>
            <div className="VideoSingle__published">
              Published on {moment(snippet.publishedAt).format('MMMM D, YYYY')}
            </div>
            <p className="VideoSingle__description">{snippet.description}</p>
          </div>
          {this.state.comments.length ? (
            <div className="VideoSingle__comments">
              <h3>Comments</h3>
              {this.state.comments.map((item, index) => (
                <Comment key={index} video={item} />
              ))}
            </div>
          ) : (
            <Loader />
          )}
        </div>

        {this.state.channelVideos.length ? (
          <div className="VideoSingle__channelvids">
            <h2>Other videos from this channel</h2>
            {this.state.channelVideos.map((item, index) => (
              <VideoCard key={index} video={item} />
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    ) : (
      <Loader />
    );
  }
}

export default VideoSingle;
