import React, { Component } from 'react'
import { connect } from 'react-redux'
import DoctorListTiming from './DoctorListTiming';
import { Table } from 'reactstrap';
import classes from '../styles/AddedDoctorList.module.css'

class AddedDoctorList extends Component {
    render() {

        const { doctorList } = this.props;
 
        const TableBodyOfDoctorList = doctorList.map( e => {
            let obj = {
                id: e.id,
                availability: e.availability
            }
            return <tr key={e.id}>
            <td>{e.name.trim() ? e.name : 'N/A'}</td>
            <td>{e.email}</td>
            <td>{e.phone ? e.phone : 'N/A'}</td>
            <td>
                {
                  ( !e.location || (
                    !e.location?.streetAddress && 
                    !e.location?.city && 
                    !e.location?.state ) 
                  ) ? ( 
                        'N/A'
                  ) : (
                    <>
                        {e.location.streetAddress ? e.location.streetAddress+' ' : ''}
                        {e.location.city ? e.location.city+' ' : ''}
                        {e.location.state ? e.location.state : ''}
                    </>
                 )
                }
            </td>
            <td>{e.speciality}</td>
            <td>{e.consultFees ? e.consultFees+' INR' : 'N/A'}</td>
            <td>{e.totalAppointment ? e.totalAppointment : '0'}</td>
            <td>
                {
                    !e.availability || e.availability.length===0 ? (
                        <>
                            Not provided yet!
                        </>
                    ) : (
                        <>
                            <button id={'availability_'+e.id}
                            className={classes.Doctor__time__btn}>
                                <i className="far fa-eye"></i> See
                            </button>
                            <DoctorListTiming key={e.id} data={obj} />
                        </>
                    )
                }
            </td>
            <td>{e.isActive ? 'Active' : 'Inactive'}</td>
        </tr>                       
        })

        return (
            <div className={classes.Main__DoctorList__Body}>
                <div className={classes.HeaderText}>
                    <h4>Added Doctors List</h4>
                </div>

                {
                    TableBodyOfDoctorList.length ? (
                        <>
                            <div className={classes.DoctorList__Table}>
                            <hr />
                                <Table striped responsive>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Location</th>
                                            <th>Speciality</th>
                                            <th>Consult Fees</th>
                                            <th>Consults</th>
                                            <th>Schedule</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {TableBodyOfDoctorList}
                                    </tbody>
                                </Table>
                            </div>
                        </>
                    ) : <>
                            <hr className="container" />
                            <h5 className="text-center mt-4">Opps! List is empty!!!</h5>
                    </> 
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      doctorList: state.addDoctor.doctorList
    }
}
  
// const mapDispatchToProps = dispatch => {
//     return {
//         addDoctorTiming: (doctorTimingObj) => dispatch(addDoctorTiming(doctorTimingObj))
//     }
// }
  
export default connect(mapStateToProps,null)(AddedDoctorList)