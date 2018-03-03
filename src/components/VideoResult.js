import React from 'react';

class VideoResult extends React.Component {
  constructor() {
    super();
  }

  videoURL(id) {
    return `/video/${id}`;
  }

  render() {
    return <div className="VideoResult">videoresult</div>;
  }
}

export default VideoResult;
