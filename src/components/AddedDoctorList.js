import React, { Component } from 'react'
import { connect } from 'react-redux'
import DoctorListTiming from './DoctorListTiming';
import TableGenerator from './TableGenerator';
import classes from '../styles/AddedDoctorList.module.css'

class AddedDoctorList extends Component {

    _availabilityFormatter = (cell, row) => {

        if(!cell || cell.length===0) {
            return 'Not provided yet!'
        }

        const obj = {
            id: row.id,
            availability: cell
        }
                 
        return <>
            <button id={'availability_'+row.id}
            className={classes.Doctor__time__btn}>
                <i className="far fa-eye"></i> See
            </button>
            <DoctorListTiming key={row.id} data={obj} />
        </>
    }

    _isActiveFormatter = (cell, row) => {
        if(cell) {
            return 'Active'
        } else {
            return 'Inactive'
        }
    }

    _feeFormatter = (cell, row) => {
        if(cell) {
            return `${cell} INR`
        } else {
            return 'N/A'
        }
    }

    _specialtyFormatter = (cell, row) => {
        if(cell) {
            return cell;
        } else {
            return 'N/A'
        }
    }

    _nameFormatter = (cell, row) => {
        if(cell.trim()) {
            return cell;
        } else {
            return 'N/A'
        }
    }

    _totalAppointmentFormatter = (cell, row) => {
        if(!cell) return '0';

        return cell;
    }

    _feeFormatter = (cell, row) => {
        if(cell) {
            return `${cell} INR`
        } else {
            return 'N/A'
        }
    }

    render() {

        const { doctorList } = this.props;

        const tableHeaderList = [
            { dataField: 'name', text: 'Name', formatter: this._nameFormatter },
            { dataField: 'email', text: 'Email' },
            { dataField: 'phone', text: 'Phone' },
            { dataField: 'speciality', text: 'Speciality', formatter: this._specialtyFormatter },
            { dataField: 'fee', text: 'Consult Fees', formatter: this._feeFormatter },
            { dataField: 'totalAppointment', text: 'Consults', formatter: this._totalAppointmentFormatter },
            { dataField: 'availability', text: 'Schedule', formatter: this._availabilityFormatter },
            { dataField: 'isActive', text: 'Status', formatter: this._isActiveFormatter },
        ]

        const data = {columns:tableHeaderList,products:doctorList}
 
        return (
            <div className={classes.Main__DoctorList__Body}>
                <div className={classes.HeaderText}>
                    <h4>Added Doctors List</h4>
                </div>

                {
                    doctorList.length ? (
                        <>
                            <div className={classes.DoctorList__Table}>
                            <hr />
                                
                            <TableGenerator data={data} />

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