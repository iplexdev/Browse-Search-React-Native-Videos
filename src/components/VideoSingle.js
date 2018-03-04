import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Loader from './Loader';

class VideoSingle extends React.Component {
  constructor(props) {
    super(props);

    this.videoId = props.videoId;
    this.apiUrl = `https://www.googleapis.com/youtube/v3/videos`;
    this.apiKey = `AIzaSyBeimXtjgzfQcogY-fP8_CHPybmLpFaieo`;
    this.parts = `contentDetails,player,snippet`;
    this.url = `${this.apiUrl}?key=${this.apiKey}&id=${this.videoId}&part=${
      this.parts
    }`;

    this.state = {
      id: this.videoId,
      url: this.url,
      video: {},
    };
  }

  componentDidMount() {
    this.getVideo();
  }

  getVideo() {
    axios.get(this.url).then(response => {
      if (response.status !== 200) {
        throw new Error('Uh oh, something went wrong');
      }

      this.setState({ video: response.data.items[0] });
    });
  }

  render() {
    const { snippet } = this.state.video;

    return snippet ? (
      <div className="VideoSingle">
        <div
          className="VideoSingle__player"
          dangerouslySetInnerHTML={{
            __html: this.state.video.player.embedHtml,
          }}
        />
        <div className="VideoSingle__details">
          <div className="VideoSingle__title">{snippet.title}</div>
          <div className="VideoSingle__channel">{snippet.channelTitle}</div>
          <div className="VideoSingle__published">
            Published on {moment(snippet.publishedAt).format('MMMM D, YYYY')}
          </div>
          <p className="VideoSingle__description">{snippet.description}</p>
        </div>
      </div>
    ) : (
      <Loader />
    );
  }
}

export default VideoSingle;
