import { Footer } from '../components'
import { logout } from '../spotify.js'

const PrivacyPolicy = () => (
    <>
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
                <div className="contactCont">
                    <h1 className="contactTitle">Privacy Policy</h1>
                    <p className="contactInfo">
                        Galaxfy was created using the Spotify Web API inspired by Receiptify and Instafest. 
                        When you login to your Spotify account using this app, you agree to the use of your personal identifier via username and other data Spotify collects for your top artists and tracks.
                        The data displayed by Galaxfy is not collected, saved, or stored anywhere.
                        If you would like to remove permissions from Galaxfy, you may do so‏‏‎ ‎
                        <a href="https://support.spotify.com/us/article/spotify-on-other-apps/" target="_blank" rel="noreferrer">here.</a>
                    </p>

                </div>
            <Footer></Footer>
        </div>
    </>
);

export default PrivacyPolicy;