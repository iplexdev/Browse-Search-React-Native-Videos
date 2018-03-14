import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class VideoCard extends React.Component {
  videoURL(id) {
    return `/video/${id}`;
  }

  render() {
    const { snippet } = this.props.video;

    return (
      <Link
        to={this.videoURL(this.props.video.id.videoId)}
        id={this.props.video.id.videoId}
        className="VideoCard"
      >
        <div className="VideoCard__thumbnail">
          <img src={snippet.thumbnails.medium.url} alt="thumbnail" />
        </div>
        <div className="VideoCard__details">
          <div className="VideoCard__title">{snippet.title}</div>
          <div className="VideoCard__channel">{snippet.channelTitle}</div>
          <div className="VideoCard__published">
            {moment(snippet.publishedAt).fromNow()}
          </div>
          <p className="VideoCard__description">{snippet.description}</p>
        </div>
      </Link>
    );
  }
}

export default VideoCard;
