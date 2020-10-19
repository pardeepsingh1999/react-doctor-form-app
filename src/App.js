import React, {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
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
import classes from './styles/App.module.css';
import Error from './components/Error';
import DoctorList from './components/DoctorList';
import AddDoctor from './components/AddDoctor';
import AddedDoctorList from './components/AddedDoctorList';

function App() {

  const [isOpen, setIsOpen] = useState(false);
  // const [activeLink, setActiveLink] = useState('');

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    console.log('app useEffect: ', window.location.href)
    // const componentLinkName = window.location.href.split('/')[3] ? 
    //                           window.location.href.split('/')[3] : '';
    // setActiveLink(componentLinkName)
  },[])
  
  // const activeNavLink = (navLinkName) => {
  //   setActiveLink(navLinkName)
  // }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>

        <div className={classes.App}>
          <Router>

            <Navbar color="dark" dark expand="md">
              <div className="pt-1 pb-1" 
              // onClick={() => activeNavLink('doctor-list')}
              >
                <Link to="/doctor-list" className={classes.NavbarBrandLink}>
                  DOCTOR
                </Link>
              </div>
                
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                  <NavItem 
                  // onClick={() => activeNavLink('doctor-list')}
                  className={classes.NavbarItem}>
                    <NavLink to="/doctor-list" 
                      activeClassName={classes.active}
                      // className={activeLink==='doctor-list'? 
                      // [classes.NavbarLink,classes.active].join(' ') :
                      className={classes.NavbarLink}
                      >
                          Doctor List
                    </NavLink>
                  </NavItem>
                  <NavItem 
                  // onClick={() => activeNavLink('add-doctor')}
                  className={classes.NavbarItem}>
                    <NavLink to="/add-doctor" 
                      activeClassName={classes.active}
                      // className={activeLink==='add-doctor'? 
                      // [classes.NavbarLink,classes.active].join(' ') :
                      className={classes.NavbarLink}
                      >
                          Add Doctor
                    </NavLink>
                  </NavItem>
                  <NavItem 
                  // onClick={() => activeNavLink('added-doctor-list')}
                  className={classes.NavbarItem}>
                    <NavLink to="/added-doctor-list" 
                      activeClassName={classes.active}
                      // className={activeLink==='added-doctor-list'? 
                      // [classes.NavbarLink,classes.active].join(' ') :
                      className={classes.NavbarLink}
                      >
                          Added Doctor
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
            
            <Switch>

              <Route exact path="/" render={() => <Redirect to="/doctor-list" />} />

              <Route path="/doctor-list" component={DoctorList} />
                  
              <Route path="/add-doctor" component={AddDoctor} />
                
              <Route path="/added-doctor-list" component={AddedDoctorList} />

              <Route component={Error} />

              {/* <Route path="/" component={YourComponent} />
              <Route path="/" render={() => <Redirect to="/route-name" />} /> */}

            </Switch>

          </Router>

        </div>

    </PersistGate>
  </Provider>
  );
}

export default App;
