import React, {useState, useEffect} from 'react';
import { logout, getTopArtists, getTopTracks } from '../spotify';
import "../styles/TextSphere.css"
import { catchErrors } from '../utils';
import { Footer } from '../components';
import { TagCloud } from "@frank-mayer/react-tag-cloud";
import * as htmlToImage from 'html-to-image';
import spotifyLogo from "../spotifyLogo.png"


const isDesktop = () => {
    return (window.screen.width > 1024)
}

const openInNewTab = (name, map) => {
    let url = map.get(name);
        window.open(url, "_blank", "noreferrer");
  };

const setArtistsAndState = (topArtists, setActiveState, setTexts) => {
    setActiveState("artists")
    setTexts(topArtists)
}

const setTracksAndState = (topTracks, setActiveState, setTexts) => {
    setActiveState("tracks")
    setTexts(topTracks)
}

const takePic = (node) => {
    htmlToImage.toJpeg(node, { quality: 1 })
  .then(function (dataUrl) {
    var link = document.createElement('a');
    link.download = 'your-sphere.jpeg';
    link.href = dataUrl;
    link.click();
  });
}

const TextSphere = () => {

    const radiusMaker = () => {
        if (window.screen.width > 3000 || window.screen.height > 3000) {
            return Math.min(window.screen.width / 3.5, window.screen.height / 3.5)
        } else if ((window.screen.width > 1000 && window.screen.width < 1025) || (window.screen.height > 1000 && window.screen.height < 1025)) {
            return Math.min(270, window.screen.width / 3.2, window.screen.height / 3.2)
        } else {
            return Math.min(270, window.screen.width / 2.2, window.screen.height / 2.2)
        }
    }

    const [topArtists, setTopArtists] = useState(null);
    const [topTracks, setTopTracks] = useState(null);
    const [activeRange, setActiveRange] = useState('short');
    const [activeState, setActiveState] = useState('artists');
    const [texts, setTexts] = useState(0);
    const [links, setLinks] = useState(new Map());

    const options = {
        radius: radiusMaker(),
        maxSpeed: "normal",
        initSpeed: "normal",
        keep: true,
    };
  
    useEffect(() => {
        isDesktop()
      let artistNames = [];
      let trackNames = [];
      let artistMap = new Map();
      let trackMap = new Map();
      const fetchData = async () => {
        const artists = await getTopArtists(`${activeRange}_term`);     
        const tracks = await getTopTracks(`${activeRange}_term`);
        setTopArtists(artists.data);
        for (let i = 0; i < artists.data.items.length / 2; i++) {
                artistNames.push(i + 1 + ". " + artists.data.items[i].name)
                artistMap.set(i + 1 + ". " + artists.data.items[i].name.toUpperCase(), artists.data.items[i].external_urls.spotify)
        }

        for (let i = 0; i < tracks.data.items.length / 2; i++) {
                trackNames.push(i + 1 + ". " + tracks.data.items[i].name)
                trackMap.set(i + 1 + ". " + tracks.data.items[i].name.toUpperCase(), tracks.data.items[i].external_urls.spotify)
        }
        setTopArtists(artistNames)
        setTopTracks(trackNames)
        if (activeState == 'artists') {
            setTexts(artistNames)
            setLinks(artistMap)
        } else {
            setTexts(trackNames)
            setLinks(trackMap)
        }
      }; 
      catchErrors(fetchData());

      }, [activeState, activeRange]);

      

    return (
        <div className="top">
            <div className="header">
                <div className="container"> 
                    <div className='titleCont'>
                        <h1 className="title">GALAXFY</h1>
                    </div>
                    <div className="logoutCont" onClick={logout}>
                        <img src={require('../logout.svg').default} className="logoutIcon" alt='logout icon' />
                    </div>
                </div>
            </div>
                <div className="text-sphere" id="text-sphere">
                    <div className="sphereCont" id="sphereCont">
                        <TagCloud
                            options={options}
                            onClick={(tag) => {openInNewTab(tag, links)}}
                        >
                            {texts}
                        </TagCloud>
                            <img className="spotifyLogo" src={spotifyLogo} alt="spotify logo" />
                            <div className="sphereCaption">MADE USING GALAXFY</div>
                    </div>
                        <div className="buttonCont">
                            <div className="betweenTitle">Choose Between Artists or Tracks</div>
                            <div className='trackArtistCont'>
                                <input type="radio" class="botInput" id="artists" name="botButtons" value="artists"/>
                                <label for="artists" className={activeState === 'artists' ? 'btn botButtons' : 'btn'} onClick={() => setArtistsAndState(topArtists, setActiveState, setTexts)}>Top Artists</label>
                                <input type="radio" class="botInput" id="tracks" name="botButtons" value="tracks"/>
                                <label for="tracks" className={activeState === 'tracks' ? 'btn botButtons' : 'btn'} onClick={() => setTracksAndState(topTracks, setActiveState, setTexts)}>Top Tracks</label>
                            </div>
                            <div className="timeFrameTitle">Choose a Timeframe</div>
                            <div className='timeFrameCont' role="group" >
                                <input type="radio" class="topInput" id="short" name="topButtons" value="short"/>
                                <label for="short"  className={activeRange === 'short' ? 'btn topButtons' : 'btn'} onClick={() => setActiveRange('short')}>This Month</label>
                                <input type="radio" class="topInput" id="medium" name="topButtons" value="medium"/>
                                <label for="medium" className={activeRange === 'medium' ? 'btn topButtons' : 'btn'} onClick={() => setActiveRange('medium')}>Last 6 Months</label>
                                <input type="radio" class="topInput" id="long" name="topButtons" value="long"/>
                                <label for="long" className={activeRange === 'long' ? 'btn topButtons' : 'btn'} onClick={() => setActiveRange('long')}>All Time</label>
                            </div>
                            {isDesktop() && (
                            <>
                                <div className="downloadTitle">Download your Musical Galaxy</div>
                                <div>
                                    <button className="btn downloadButton" onClick={() => takePic(document.getElementById('sphereCont'))}> Save </button>
                                    <p className="hint">Hint: Best used with Chrome</p>
                                </div>
                            </>
                            )}
                        </div>
                </div>
                <Footer></Footer>
        </div>

    )
}

export default TextSphere;