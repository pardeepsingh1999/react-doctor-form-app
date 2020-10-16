import React, { Component } from 'react'
import { 
    TabContent, TabPane, 
    Nav, NavItem, NavLink
} from 'reactstrap';
import AddDoctorDetails from './AddDoctorDetails';
import AddDoctorTiming from './AddDoctorTiming';
import classes from '../styles/AddDoctor.module.css';

export default class AddDoctor extends Component {

    state = {
        activeTab: '1'
    }

    toggle = tab => {
        if(this.state.activeTab !== tab) this.setState({activeTab:tab});
    }

    render() {

        return (
            <div className="container">
            <Nav tabs className={classes.AddDoctorNavHeader}>
              <NavItem className={classes.AddDoctorNavItem}>
                <NavLink
                  className={[this.state.activeTab === '1' ? classes.activeTab : '',classes.AddDoctorNavLink].join(' ')}
                  onClick={() => { this.toggle('1'); }}
                >
                Add Doctor Details
                </NavLink>
              </NavItem>
              <NavItem className={classes.AddDoctorNavItem}>
                <NavLink
                  className={[this.state.activeTab === '2' ? classes.activeTab : '',classes.AddDoctorNavLink].join(' ')}
                  onClick={() => { this.toggle('2'); }}
                >
                Add Doctor Timing
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                
                <AddDoctorDetails />

              </TabPane>
              <TabPane tabId="2">
                
                <AddDoctorTiming />

              </TabPane>
            </TabContent>
          </div>
        )
    }
}
