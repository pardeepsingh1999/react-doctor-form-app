import React, { Component } from 'react'
import { connect } from 'react-redux'
import DoctorListTiming from './DoctorListTiming';
import TableGenerator from './TableGenerator';
import classes from '../styles/AddedDoctorList.module.css'

class AddedDoctorList extends Component {

    _doctorTableFormatter = (cell, row, type) => {
        switch(type) {
            case 'name': {
                if(cell.trim()) {
                    return cell;
                } else {
                    return 'N/A'
                }
            }
            case 'totalAppointment': {
                if(!cell) return '0';

                return cell;
            }
            case 'speciality': {
                if(cell) {
                    return cell;
                } else {
                    return 'N/A'
                }
            }
            case 'fee': {
                if(cell) {
                    return `${cell} INR`
                } else {
                    return 'N/A'
                }
            }
            case 'availability': {
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
            case 'status': {
                if(cell) {
                    return 'Active'
                } else {
                    return 'Inactive'
                }
            }
            default: {
                console.log('doctorTableFormatter type not match')
                break;
            }
        }
    }

    render() {

        const { doctorList } = this.props;

        const doctorTableHeaderList = [
            { dataField: 'name', text: 'Name', 
            formatter: (cell, row)=>this._doctorTableFormatter(cell, row, 'name') },

            { dataField: 'email', text: 'Email' },
            { dataField: 'phone', text: 'Phone' },

            { dataField: 'speciality', text: 'Speciality', 
            formatter: (cell, row)=>this._doctorTableFormatter(cell, row, 'speciality') },

            { dataField: 'fee', text: 'Consult Fees', 
            formatter: (cell, row)=>this._doctorTableFormatter(cell, row, 'fee') },

            { dataField: 'totalAppointment', text: 'Consults',
            formatter: (cell, row)=>this._doctorTableFormatter(cell, row, 'totalAppointment') },

            { dataField: 'availability', text: 'Schedule', 
            formatter: (cell, row)=>this._doctorTableFormatter(cell, row, 'availability') },

            { dataField: 'isActive', text: 'Status', 
            formatter: (cell, row)=>this._doctorTableFormatter(cell, row, 'status') },
        ]

        const tableGeneratorData = {
            columns:doctorTableHeaderList,
            products:doctorList,
            pagination: false
        }
 
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
                                
                            <TableGenerator data={tableGeneratorData} />

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