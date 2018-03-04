import React from 'react';
import axios from 'axios';
import moment from 'moment';

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
      if (response.status === 200) {
        this.setState({
          video: response.data.items[0],
        });

        // console.log(this.state);
      } else {
        console.log('error');
      }
      // console.log(this.state.video);
    });
  }

  render() {
    const { snippet } = this.state.video;

    console.log(this.state);

    return this.state.video !== {} ? (
      <div className="VideoSingle">
        {/* <div
          className="VideoResult__player"
          dangerouslySetInnerHTML={{
            __html: this.state.video.player.embedHtml,
          }}
        /> */}

        <div className="VideoSingle__details">
          <div className="VideoSingle__title">
            {/* {snippet.title} */}
            {/* {this.state.video.snippet.title} */}
            Title
          </div>
          <div className="VideoSingle__channel">
            {/* {snippet.channelTitle} */}
            Channel title
          </div>
          <div className="VideoSingle__published">
            {/* {moment(snippet.publishedAt).format('MMMM D, YYYY')} */}
            published time
          </div>
          <p className="VideoSingle__description">
            {/* {snippet.description} */}
            Watch all the action LIVE from Manly Beach, New South Wales,
            Australia!\n\n#WSL\n\nSubscribe to the WSL for more action:
            https://goo.gl/VllRuj\n\nWatch all the latest surfing action of the
            world's best surfers in the world's best waves. Heats on demand,
            event highlights and exclusive interviews, right here on the WSL's
            Youtube channel.\n\nFor More Visit:
            http://www.worldsurfleague.com/\n\nLike the WSL on Facebook:
            http://www.facebook.com/wsl\nFollow us on Twitter:
            http://twitter.com/wsl\nFollow us on Instagram:
            http://instagram.com/wsl\nFollow us on Google+:
            https://plus.google.com/+Worldsurfleague\nFollow our Tumblr:
            http://wslofficial.tumblr.com/
          </p>
        </div>
      </div>
    ) : (
      <div>Loading</div>
    );
  }
}

export default VideoSingle;
