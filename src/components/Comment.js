import React from 'react';
import moment from 'moment';
import Loader from './Loader';

class Video extends React.Component {
  render() {
    const { video } = this.props;
    return video ? (
      <div className="Comment">
        <div className="Comment__img">
          <img
            src={video.snippet.topLevelComment.snippet.authorProfileImageUrl}
            alt="profile"
          />
        </div>
        <div className="Comment__wrapper">
          <div className="Comment__name">
            <span className="Comment__author">
              {video.snippet.topLevelComment.snippet.authorDisplayName}
            </span>
            <span className="Comment__published">
              {moment(
                video.snippet.topLevelComment.snippet.publishedAt
              ).fromNow()}
            </span>
          </div>
          <p
            className="Comment__text"
            dangerouslySetInnerHTML={{
              __html: video.snippet.topLevelComment.snippet.textOriginal,
            }}
          />
        </div>
      </div>
    ) : (
      <Loader />
    );
  }
}

export default Video;
