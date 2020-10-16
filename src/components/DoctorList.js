import React, { Component } from 'react'
import classes from '../styles/DoctorList.module.css';
import { Table } from 'reactstrap';
import TablePagination from '@material-ui/core/TablePagination';
import { makePostRequest } from '../https/http-service';
import DoctorListTiming from './DoctorListTiming';

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

        makePostRequest(
            'https://api-dev.askvaidya.in/admin/v1/doctors',
            true,
            {pageNumber: 1, pageSize: 10,  filters: {}} 
        )
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
            console.log('DoctorListComponent error: ',err)
            alert('something went wrong')
            this.setState({loading:false})
        })
    }

    handleChangePage = (event, newPage) => {

        this.setState({page:newPage,loading:true},()=>{

            const {page,rowsPerPage} = this.state;

            makePostRequest(
                'https://api-dev.askvaidya.in/admin/v1/doctors',
                true,
                {pageNumber: page+1, pageSize: rowsPerPage,  filters: {}} 
            )
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
                    totalCount: res.totalCount,
                    loading: false
                }
                this.setState(obj);
            })
            .catch(err => {
                console.log('DoctorListComponent error: ',err)
                alert('something went wrong')
                this.setState({loading:false})
            })
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

            makePostRequest(
                'https://api-dev.askvaidya.in/admin/v1/doctors',
                true,
                {pageNumber: 1, pageSize: rowsPerPage, filters: {}} 
            )
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
                    loading: false
                }
                this.setState(obj);
            })
            .catch(err => {
                console.log('DoctorListComponent error: ',err)
                alert('something went wrong')
                this.setState({loading:false})
            })
        });
    };

    render() {

        if(this.state.loading) {
            return <img src={require('../assets/loader.gif')} alt="loader" className={classes.DoctorListLoader} />
        }

        const {page,rowsPerPage,totalCount,doctors} = this.state;


        const TableBodyOfDoctorList = doctors.map( e => {
            let obj = {
                id: e.id,
                availability: e.availability
            }
            return <tr key={e.id}>
            <td>{e.name.full.trim() ? e.name.full : 'N/A'}</td>
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
            <td>{e._specialty.name}</td>
            <td>{e.fee ? e.fee+' INR' : 'N/A'}</td>
            <td>{e.totalAppointment}</td>
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
                    <h4>Doctors List</h4>
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
