import { logout } from '../spotify.js'
import { Footer } from '../components'

const Login = () => (
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
                    <h1 className="contactTitle">Contact Me</h1>
                    <p className="contactInfo">For inquries, questions, or concerns, you can reach out to me at‏‏‎ ‎
                        <a href="mailto: charonaeng@gmail.com">charonaeng@gmail.com</a>, my‏‏‎ ‎
                        <a href="https://www.linkedin.com/in/che-ngi/" target="_blank" rel="noreferrer">LinkedIn</a>
                        , my‏‏‎ ‎
                        <a href="https://www.instagram.com/che.ngi/" target="_blank" rel="noreferrer">Instagram</a>
                        , or check out my‏‏‎ ‎
                        <a href="https://aaroncheng.tech/" target="_blank" rel="noreferrer">website!</a>
                    </p>

                </div>
                <Footer></Footer>
        </div>
    </>
);

export default Login;