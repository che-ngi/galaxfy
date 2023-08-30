import styled from 'styled-components/macro';
import { useEffect, useState} from 'react';
import { accessToken, getCurrentUserProfile } from './spotify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import { GlobalStyle } from './styles';
import { Login, TextSphere, Contact, PrivacyPolicy} from './pages';  

// Scroll to top of page when changing routes
// https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      try {
        const { data } = await getCurrentUserProfile();
        setProfile(data);
      } catch (e) {
        console.error(e)
      }
    }

    fetchData();

  }, [])

  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"></meta>
      <GlobalStyle/>
      <header className="App-header">
            {!token ? (
              <>
              {/* <Login/> */}
              <Router>
                <ScrollToTop/>
                <Switch>
                  <Route path="/privacy-policy">
                    <PrivacyPolicy/>
                  </Route>
                  <Route path="/contact">
                    <Contact/>
                  </Route>
                  <Route path="/">
                    <Login/>
                  </Route>
                </Switch>
            </Router>
              </>
            ) : (
              <>

          <Router>
            <ScrollToTop/>
            <Switch>
              <Route path="/privacy-policy">
                <PrivacyPolicy/>
              </Route>
              <Route path="/contact">
                <Contact/>
              </Route>
              <Route path="/">
                <TextSphere/>
              </Route>
            </Switch>
          </Router>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
