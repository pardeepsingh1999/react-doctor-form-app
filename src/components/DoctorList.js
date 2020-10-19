import React, { Component } from 'react'
import classes from '../styles/DoctorList.module.css';
import TablePagination from '@material-ui/core/TablePagination';
import { getDoctorList } from '../https/http-calls';
import DoctorListTiming from './DoctorListTiming';
import TableGenerator from './TableGenerator';

export default class DoctorList extends Component {

    state = {
        page: 0,
        rowsPerPage: 10,
        totalCount: 0,
        doctors: [],
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

    _getDoctorList(bodyPaginateData) {
        getDoctorList(bodyPaginateData)
        .then(res => {
            console.log('server res: ', res)
            
            res.doctors.forEach( e => {
                if(e.availability && e.availability.length) {
                    let doctorTiming = {
                        monday: [],
                        tuesday: [],
                        wednesday: [],
                        thursday: [],
                        friday: [],
                        saturday: [],
                        sunday: []
                    }
                    e.availability.forEach(ee => {
                        doctorTiming[ee.day.toLowerCase()].push({from:ee.from,to:ee.to})
                    })
                    e.availability = doctorTiming;
                }
            })
            
            const obj = {
                doctors: res.doctors,
                totalCount:res.totalCount,
                loading:false
            }
            this.setState(obj,() => {console.log(this.state)});
        })
        .catch(err => {
            console.log('DoctorListComponent server error: ',err)
            alert('something went wrong')
            this.setState({loading:false})
        })
    }

    handleChangePage = (event, newPage) => {

        this.setState({page:newPage,loading:true},()=>{

            const {page,rowsPerPage} = this.state;

            const paginateData = {
                pageNumber: page+1, 
                pageSize: rowsPerPage,  
                filters: {}
            }
           
            this._getDoctorList(paginateData)

        });
    };

    handleChangeRowsPerPage = (event) => {
        const obj = {
            page: 0,
            rowsPerPage: parseInt(event.target.value),
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

    _locationFormatter = (cell, row) => {

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
            return cell.name;
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

    render() {

        if(this.state.loading) {
            return <img src={require('../assets/loader.gif')} alt="loader" className={classes.DoctorListLoader} />
        }

        const {page,rowsPerPage,totalCount,doctors} = this.state;

        const tableHeaderList = [
            { dataField: 'name.full', text: 'Name', formatter: this._nameFormatter },
            { dataField: 'email', text: 'Email' },
            { dataField: 'phone', text: 'Phone' },
            { dataField: 'location', text: 'Location', formatter: this._locationFormatter },
            { dataField: '_specialty', text: 'Speciality', formatter: this._specialtyFormatter },
            { dataField: 'fee', text: 'Consult Fees', formatter: this._feeFormatter },
            { dataField: 'totalAppointment', text: 'Consults' },
            { dataField: 'availability', text: 'Schedule', formatter: this._availabilityFormatter },
            { dataField: 'isActive', text: 'Status', formatter: this._isActiveFormatter },
        ]

        const data = {columns:tableHeaderList,products:doctors}

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

                            <TableGenerator data={data} />

                            </div>

                            <div className={classes.DoctorList__Table__Pagination}>
                                <TablePagination
                                component="div"
                                count={totalCount}
                                page={page}
                                onChangePage={this.handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
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
