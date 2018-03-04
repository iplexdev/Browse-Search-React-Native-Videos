import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Video extends React.Component {
  videoURL(id) {
    return `/video/${id}`;
  }

  render() {
    const { snippet } = this.props.video;

    return (
      <Link
        to={this.videoURL(this.props.video.id.videoId)}
        id={this.props.video.id.videoId}
        className="Video"
      >
        <img
          src={snippet.thumbnails.medium.url}
          className="Video__thumbnail"
          alt="thumbnail"
        />
        <div className="Video__details">
          <div className="Video__title">{snippet.title}</div>
          <div className="Video__channel">{snippet.channelTitle}</div>
          <div className="Video__published">
            {moment(snippet.publishedAt).fromNow()}
          </div>
        </div>
      </Link>
    );
  }
}

export default Video;
