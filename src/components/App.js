import React, {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  
} from 'reactstrap';
import classes from '../styles/App.module.css';
import Error from './Error';
import DoctorList from './DoctorList';
import AddDoctor from './AddDoctor';
import AddedDoctorList from './AddedDoctorList';

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    console.log('app useEffect: ', window.location.href)
    const componentLinkName = window.location.href.split('/')[3] ? 
                              window.location.href.split('/')[3] : '';
    setActiveLink(componentLinkName)
  },[])
  
  const activeNavLink = (navLinkName) => {
    setActiveLink(navLinkName)
  }

  return (
    <div className={classes.App}>
      <Router>

        <Navbar color="dark" dark expand="md">
          <div className="pt-1 pb-1" onClick={() => activeNavLink('doctor-list')}>
            <Link to="/doctor-list" className={classes.NavbarBrandLink}>
              DOCTOR
            </Link>
          </div>
            
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem onClick={() => activeNavLink('doctor-list')}
              className={classes.NavbarItem}>
                <Link to="/doctor-list" 
                  className={activeLink==='doctor-list'? 
                  [classes.NavbarLink,classes.active].join(' ') :
                  classes.NavbarLink}
                  >
                      Doctor List
                </Link>
              </NavItem>
              <NavItem onClick={() => activeNavLink('add-doctor')}
              className={classes.NavbarItem}>
                <Link to="/add-doctor" 
                  className={activeLink==='add-doctor'? 
                  [classes.NavbarLink,classes.active].join(' ') :
                  classes.NavbarLink}
                  >
                      Add Doctor
                </Link>
              </NavItem>
              <NavItem onClick={() => activeNavLink('added-doctor-list')}
              className={classes.NavbarItem}>
                <Link to="/added-doctor-list" 
                  className={activeLink==='added-doctor-list'? 
                  [classes.NavbarLink,classes.active].join(' ') :
                  classes.NavbarLink}
                  >
                      Added Doctor
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        
        <Switch>

          <Route exact path="/" render={() => <Redirect to="/" />} />

          <Route path="/doctor-list" component={DoctorList} />
              
          <Route path="/add-doctor" component={AddDoctor} />
            
          <Route path="/added-doctor-list" component={AddedDoctorList} />

          {/* <Route path="/preview/:gifId" component={PreviewUploadGif} /> */}

          <Route component={Error} />

          {/* <Route path="/" component={YourComponent} />
          <Route path="/" render={() => <Redirect to="/route-name" />} /> */}

      </Switch>

      </Router>

    </div>
  );
}

export default App;
