import React from 'react';
import { Link } from 'react-router-dom';

class Video extends React.Component {
  constructor() {
    super();
  }

  videoURL(id) {
    return `/video/${id}`;
  }

  render() {
    return (
      <Link to={this.videoURL(this.props.video.id.videoId)} className="Video">
        <img
          src={this.props.video.snippet.thumbnails.medium.url}
          className="Video__thumbnail"
        />
        <div className="Video__details">
          <div className="Video__title">{this.props.video.snippet.title}</div>
          <div className="Video__channel">
            {this.props.video.snippet.channelTitle}
          </div>
          <div className="Video__published">
            {this.props.video.snippet.publishedAt}
          </div>
        </div>
      </Link>
    );
  }
}

export default Video;
