import React, { Component } from 'react'
import { 
    TabContent, TabPane, 
    Nav, NavItem, NavLink
} from 'reactstrap';
import AddDoctorDetails from './AddDoctorDetails';
import AddDoctorTiming from './AddDoctorTiming';
import classes from '../styles/AddDoctor.module.css';
import { toggleTab } from '../redux/actions/toggle-tab';
import { addDoctorFormReset } from '../redux/actions/add-doctor-form-reset';
import { connect } from 'react-redux';

class AddDoctor extends Component {

    componentDidMount() {
      const { activeTab, doctorDetails, toggleTab,addDoctorFormReset } = this.props;

      if(Object.keys(doctorDetails).length) {
          addDoctorFormReset()
      } else {
          if(activeTab==='2' && !Object.keys(doctorDetails).length) {
            toggleTab('1')
          }
      }
    }

    toggle = tab => {
        const { activeTab, doctorDetails, toggleTab } = this.props;
        // console.log(doctorDetails)
        // toggleTab(tab)
        if(doctorDetails && Object.keys(doctorDetails).length) {
            if(activeTab !== tab) toggleTab(tab)
        } else {
            if(activeTab !== tab) alert('Fill Add Doctor Details form first')
        }
    }

    render() {

        const { activeTab } = this.props;

        return (
            <div className="container">
            <Nav tabs className={classes.AddDoctorNavHeader}>
              <NavItem className={classes.AddDoctorNavItem}>
                <NavLink
                  className={[activeTab === '1' ? classes.activeTab : '',classes.AddDoctorNavLink].join(' ')}
                  onClick={() => { this.toggle('1'); }}
                >
                Add Doctor Details
                </NavLink>
              </NavItem>
              <NavItem className={classes.AddDoctorNavItem}>
                <NavLink
                  className={[activeTab === '2' ? classes.activeTab : '',classes.AddDoctorNavLink].join(' ')}
                  onClick={() => { this.toggle('2'); }}
                >
                Add Doctor Timing
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
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

const mapStateToProps = state => {
  return {
    activeTab: state.addDoctor.activeTab,
    doctorDetails: state.addDoctor.doctorDetails
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleTab: (tabNumber) => dispatch(toggleTab(tabNumber)),
    addDoctorFormReset: () => dispatch(addDoctorFormReset())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddDoctor)