import React, { Component, PropTypes } from 'react';

export default class EpisodeList extends Component {

    render() {

        const { videoList } = this.props;
        const cards = videoList.map((note, index) => {
            return (
                <div className="card" onClick={()=> this.props.setVideo(note.id) } key={index}>
                    <video
                        id="my-player{index}"
                        className="video-js"
                        preload="auto"
                        poster="//vjs.zencdn.net/v/oceans.png"
                        width="300px"
                        height="280px"
                        data-setup='{}'>
                        <source src={note.src} type="video/mp4"></source>
                        <p className="vjs-no-js">
                            To view this video please enable JavaScript, and consider upgrading to a web browser that.
                            <a href="http://videojs.com/html5-video-support/" target="_blank">
                                supports HTML5 video
                            </a>
                        </p>
                    </video> 
                <div className="card-body">
                        <h5 className="card-title">{note.heading}</h5>
                        <p className="card-text">{note.content}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">{note.views} views</small>
                </div>
              </div>
            );
          });
        return (
            <div style={{ display: "inline-flex",marginBottom:"2%"}}>
        {cards}                
      </div>
    );
  }
}