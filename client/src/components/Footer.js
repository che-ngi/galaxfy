import { Link } from 'react-router-dom'

const Footer = () => (
    <footer className="footer"> 
        <div className="footerName">
            Created by‏‏‎ ‎ 
            <a href="http://aaroncheng.tech" target="_blank"> Aaron Cheng</a>
        </div>
        <div className="footerInfo">
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
    </footer>
);

export default Footer;