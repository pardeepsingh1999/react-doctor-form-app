import React, { Component } from 'react'
import classes from '../styles/DoctorList.module.css';
import DoctorListTiming from './DoctorListTiming';
import TableGenerator from './TableGenerator';
import { doctorApiCall } from '../redux/actions/doctorApiCall';
import { connect } from 'react-redux';

class DoctorList extends Component {

    state = {
        page: 1,
        rowsPerPage: 10,
        loading: false
    }

    componentDidMount() {

        this.setState({loading:true})

        const paginateData = {
            pageNumber: 1, 
            pageSize: 10,  
            filters: {}
        }

        this._getDoctorList(paginateData)

    }

    _getDoctorList = async(bodyPaginateData) => {

        const { doctorApiCall } = this.props;

        await doctorApiCall(bodyPaginateData)

        this.setState({loading:false})

    }

    _handleChangePage = (newPage) => {

        this.setState({page:newPage,loading:true},()=>{

            const {page,rowsPerPage} = this.state;

            const paginateData = {
                pageNumber: page, 
                pageSize: rowsPerPage,  
                filters: {}
            }
           
            this._getDoctorList(paginateData)

        });
    };

    _handleChangeRowsPerPage = (rowsPerPageCount) => {
        const obj = {
            page: 1,
            rowsPerPage: parseInt(rowsPerPageCount),
            loading: true
        }
        this.setState(obj,() => {

            const {rowsPerPage} = this.state;

            const paginateData = {
                pageNumber: 1, 
                pageSize: rowsPerPage, 
                filters: {}
            } 

            this._getDoctorList(paginateData)
           
        });
    };

    _doctorTableFormatter = (cell, row, type) => {
        switch(type) {
            case 'name': {
                if(cell.trim()) {
                    return cell;
                } else {
                    return 'N/A'
                }
            }
            case 'location': {
                if(!cell || 
                    ( 
                        !cell.streetAddress && 
                        !cell.city && 
                        !cell.state
                    )
                ) {
                    return 'N/A'
                }
        
                return <>
                    {cell.streetAddress ? cell.streetAddress+' ' : ''}
                    {cell.city ? cell.city+' ' : ''}
                    {cell.state ? cell.state : ''}
                </>
            }
            case 'speciality': {
                if(cell) {
                    return cell.name;
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

        if(this.state.loading) {
            return <img src={require('../assets/loader.gif')} alt="loader" className={classes.DoctorListLoader} />
        }

        const {doctorApiResponse} = this.props;

        let doctors = [], totalCount = 0;

        if(doctorApiResponse && Object.keys(doctorApiResponse).length>0) {
            if(doctorApiResponse.error) {
                alert('somthing went wrong')
                return <>somthing went wrong</>;
            } else {
                doctors = doctorApiResponse.doctors
                totalCount = doctorApiResponse.totalCount
            }
        }

        const {page,rowsPerPage} = this.state;

        const doctorTableHeaderList = [
            { dataField: 'name.full', text: 'Name', 
            formatter: (cell, row)=>this._doctorTableFormatter(cell, row, 'name') },

            { dataField: 'email', text: 'Email' },
            { dataField: 'phone', text: 'Phone' },

            { dataField: 'location', text: 'Location', 
            formatter: (cell, row)=>this._doctorTableFormatter(cell, row, 'location') },

            { dataField: '_specialty', text: 'Speciality', 
            formatter: (cell, row)=>this._doctorTableFormatter(cell, row, 'speciality') },

            { dataField: 'fee', text: 'Consult Fees', 
            formatter: (cell, row)=>this._doctorTableFormatter(cell, row, 'fee') },

            { dataField: 'totalAppointment', text: 'Consults' },

            { dataField: 'availability', text: 'Schedule', 
            formatter: (cell, row)=>this._doctorTableFormatter(cell, row, 'availability') },

            { dataField: 'isActive', text: 'Status', 
            formatter: (cell, row)=>this._doctorTableFormatter(cell, row, 'status') },
        ]

        const tableGeneratorData = {
            columns:doctorTableHeaderList,
            products:doctors,
            page:page,
            rowsPerPage:rowsPerPage,
            totalCount:totalCount,
            pagination: true,
            _handleChangeRowsPerPage: this._handleChangeRowsPerPage,
            _handleChangePage: this._handleChangePage
        }

        return (
            <div className={classes.Main__DoctorList__Body}>
                <div className={classes.HeaderText}>
                    <h4>Doctors List</h4>
                </div>

                {
                    doctors.length ? (
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
      doctorApiResponse: state.doctorApiCall.apiResponse
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        doctorApiCall: (bodyPaginateData) => dispatch(doctorApiCall(bodyPaginateData))
    }
}
  
export default connect(mapStateToProps,mapDispatchToProps)(DoctorList)