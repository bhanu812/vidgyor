import React from "react";
import EpisodeList from './EpisodeList';
import Header from './header';
import 'video.js/dist/video-js.css';
import './vid.css';
import app from "./base";
import 'firebase/firestore';

let videoJsOptions = [{
    id:1,
    src: 'http://mirrors.standaloneinstaller.com/video-sample/P6090053.mp4',
    type: 'video/mp4',
    heading:"P6090053",
    content:"Be well suited to being consumed on both the desktop and mobile environments"
  },{
    id:2,
    src: 'http://mirrors.standaloneinstaller.com/video-sample/small.mp4',
    type: 'video/mp4',
    heading:"  Small",
    content:"Be well suited to being consumed on both the desktop and mobile environments"
  },
    {
      id:3,
      src: 'http://mirrors.standaloneinstaller.com/video-sample/dolbycanyon.mp4',
      type: 'video/mp4',
      heading:"dolbycanyon",
      content:"Be well suited to being consumed on both the desktop and mobile environments"
  },
  {
      id:4,
      src: 'http://mirrors.standaloneinstaller.com/video-sample/lion-sample.mp4',
      type: 'video/mp4',
      heading:"lion-sample",
      content:"Be well suited to being consumed on both the desktop and mobile environments"
  },
  {
    id:5,
    src: 'http://mirrors.standaloneinstaller.com/video-sample/page18-movie-4.mp4',
    type: 'video/mp4',
    heading:"	page18-movie-4",
    content:"Be well suited to being consumed on both the desktop and mobile environments"
  },
  {
    id:6,
    src: 'http://mirrors.standaloneinstaller.com/video-sample/DLP_PART_2_768k.mp4',
    type: 'video/mp4',
    heading:"DLP_PART_2_768k",
    content:"Be well suited to being consumed on both the desktop and mobile environments"
  }
  ]
const db = app.firestore({timestampsInSnapshots: true})      

export default class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedVideoIndex: 0,
      videoJsOptions: videoJsOptions,
      selectVideo: videoJsOptions[0]
    }
  }
  componentDidMount() { 
    try {
      let viewList=[]
      db.collection("videoData").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id == "videoCount") {
            for (let i in videoJsOptions) {
              if (videoJsOptions[i].id in doc.data()) {
                videoJsOptions[i]["views"] = doc.data()[videoJsOptions[i].id]
                viewList.push(videoJsOptions[i])
              }
              else {
                videoJsOptions[i]["views"] = 0
                viewList.push(videoJsOptions[i])
              }
            }
            this.setState({ videoJsOptions: viewList })
          }
        });        
      });      
    } catch (error) {
      console.log(error)
    }
  }
  setSelectVideo = (index) => {
    this.setState({
      selectedVideoIndex:index
    }, () => {
        let k = document.getElementById("my-player")
        for (let i in videoJsOptions) {
          if (videoJsOptions[i].id == index)
          {
            k.src = videoJsOptions[i].src;
            document.getElementById("show").style.display = "block";
            k.play()
            this.setState({selectVideo:videoJsOptions[i]})
          }
        }
    })
  }

  showVideo = (value) => {
    let notMatchList = []
    let newList = []
    videoJsOptions.forEach((val) => {
      if (val["heading"].search(value) == -1) {
        notMatchList.push(val.id)
      }
      else {
        newList.push(val)
      }      
    })

    notMatchList.forEach((id) => {
      videoJsOptions.forEach(ind => {
        if (ind.id == id) {
          newList.push(ind)
        }
      })
    })
    this.setState({
      videoJsOptions:newList
    })
  }
 
  videoIncreaseCount = (index) => {
    let k = {}
    db.collection("videoData").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id == "videoCount") {
          k = doc.data()
          for (let i in videoJsOptions) {
            if (videoJsOptions[i].id in k) {
              if (videoJsOptions[i].id == index) {
                videoJsOptions[i]["views"] = k[videoJsOptions[i].id] + 1;
                k[videoJsOptions[i].id] = k[videoJsOptions[i].id] + 1;
              }
              else {
                videoJsOptions[i]["views"] = k[videoJsOptions[i].id];
                k[videoJsOptions[i].id] = k[videoJsOptions[i].id] ;                
              }
            }
            else {
              if (videoJsOptions[i].id == index) {
                k[videoJsOptions[i].id] = 1
                videoJsOptions[i]["views"] = 1;
              }
              else {
                k[videoJsOptions[i].id] = 0
                videoJsOptions[i]["views"] = 1;                
              }
            }
          }
        }
      });

      try {
        db.collection("videoData").doc("videoCount").set(k)
        this.setState({ videoJsOptions: videoJsOptions })
      }
      catch (error) {
        console.log(error)
      }

    });
  }

  render() {
    return (
      <div>	
        <main role="main">
          <Header
            showVideo={this.showVideo}
          ></Header>          
        <section id="show" className="jumbotron text-center padBtm" >
          <div className="container">
              <h1 className="jumbotron-heading">{this.state.selectVideo.heading}</h1>
                <div data-vjs-player>
                  <video
                        onEnded={() => this.videoIncreaseCount(this.state.selectVideo.id)}    
                        id="my-player"
                        className="video-js aboveSize"
                        controls
                        preload="auto"
                        poster="//vjs.zencdn.net/v/oceans.png"
                        data-setup='{}'
                  >
                    <source src={this.state.selectVideo.src} type="video/mp4"></source>
                      <p className="vjs-no-js">
                            To view this video please enable JavaScript, and consider upgrading to a
                              web browser that
                        <a href="http://videojs.com/html5-video-support/" target="_blank">
                            supports HTML5 video
                        </a>
                      </p>
                  </video>   
                </div>
            </div>
          </section>
              <div className="card-deck" style={{display: "block",width:"100%",overflow:"auto"}}>
                <EpisodeList
                  videoList={this.state.videoJsOptions}
                  setVideo={this.setSelectVideo}
                ></EpisodeList>
              </div>
        </main>
      </div>
    )
  }
}