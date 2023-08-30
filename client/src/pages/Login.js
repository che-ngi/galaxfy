import { TagCloud } from "@frank-mayer/react-tag-cloud";
import { Footer } from '../components'

const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'https://galaxfy.herokuapp.com/login'
    : 'https://galaxfy.herokuapp.com/login';

const openInNewTab = (name, map) => {
    let url = map.get(name);
        window.open(url, "_blank", "noreferrer");
  };

const Login = () => {

    const trackMap = new Map(); 

    trackMap.set('1. THE WEEKND', 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ')
    trackMap.set('2. TAYLOR SWIFT', 'https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02')
    trackMap.set('3. BAD BUNNY', 'https://open.spotify.com/artist/4q3ewBCX7sLwd24euuV69X')
    trackMap.set('4. ED SHEERAN', 'https://open.spotify.com/artist/6eUKZXaKkcviH0Ku9w2n3V')
    trackMap.set('5. RIHANNA', 'https://open.spotify.com/artist/5pKCCKE2ajJHZ9KAiaK11H')
    trackMap.set('6. DAVID GUETTA', 'https://open.spotify.com/artist/1Cs0zKBU1kc0i8ypK3B9ai')
    trackMap.set('7. DUA LIPA', 'https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we')
    trackMap.set('8. JUSTIN BIEBER', 'https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s')
    trackMap.set('9. MILEY CYRUS', 'https://open.spotify.com/artist/5YGY8feqx7naU7z4HrwZM6')
    trackMap.set('10. DRAKE', 'https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4')

    const radiusMaker = () => {
        if (window.screen.width > 3000 || window.screen.height > 3000) {
            return Math.min(window.screen.width / 3.5, window.screen.height / 3.5)
        } else if ((window.screen.width > 1000 && window.screen.width < 1025) || (window.screen.height > 1000 && window.screen.height < 1025)) {
            return Math.min(270, window.screen.width / 3.2, window.screen.height / 3.2)
        } else {
            return Math.min(270, window.screen.width / 2.2, window.screen.height / 2.2)
        }
    }

    const options = {
        radius: radiusMaker(),
        maxSpeed: "normal",
        initSpeed: "normal",
        keep: true,
    };

    return (
    <>
        <div className="top">
                <header className="header">
                    <div className="container"> 
                        <div className='titleCont'>
                            <h1 className="title">GALAXFY</h1>
                        </div>
                    </div>
                </header>
                <div className='bottomCont'>
                    <div className="sphereCont">
                        <TagCloud
                            options={options}
                            onClick={(tag) => {openInNewTab(tag, trackMap)}}
                            onClickOptions={{ passive: true }}
                        >
                            {["1. The Weeknd", "2. Taylor Swift", "3. Bad Bunny", 
                            "4. Ed Sheeran", "5. Rihanna", "6. David Guetta", "7. Dua Lipa", "8. Justin Bieber", "9. Miley Cyrus", "10. Drake"]}
                        </TagCloud>
                        <div className="spotifyLogo"></div>
                        <div className="sphereCaption">‏‏‎ ‎ </div>
                        </div>
                    <div className='loginCont'>
                        <h2 className="infoText">
                            Display your favorite artists and tracks in a beautiful starry galaxy!
                        </h2>
                        <div className="startAndLogin">
                            <h3 className="loginCaption"> Start here!</h3>
                            <a className="loginSpotify" href={LOGIN_URI}>
                                    Log in to Spotify
                            </a>
                        </div>
                    </div>
                </div>
            <Footer></Footer>
        </div>
    </>
    )
};

export default Login;