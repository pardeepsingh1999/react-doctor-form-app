import React, { Component } from 'react'
import classes from '../styles/DoctorList.module.css';
import { 
    Table, 
    UncontrolledPopover, 
    PopoverHeader, 
    PopoverBody,
} from 'reactstrap';
import TablePagination from '@material-ui/core/TablePagination';
import { makePostRequest } from '../https/http-service';
import DoctorListTiming from './DoctorListTiming';

export default class DoctorList extends Component {

    state = {
        page: 0,
        rowsPerPage: 10,
        totalCount: 0,
        doctors: [],
        timingLabels: {
            t8:'8 AM',
            t9:'9 AM',
            t10:'10 AM',
            t11:'11 AM',
            t12:'12 PM',
            t13:'1 PM',
            t14:'2 PM',
            t15:'3 PM',
            t16:'4 PM',
            t17:'5 PM',
            t18:'6 PM',
            t19:'7 PM',
            t20:'8 PM',
            t21:'9 PM',
            t22:'10 PM',
        }
    }

    componentDidMount() {
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
                totalCount:res.totalCount
            }
            this.setState(obj,() => {console.log(this.state)});
        })
        .catch(err => {
            console.log('DoctorListComponent error: ',err)
            alert('something went wrong')
        })
    }

    handleChangePage = (event, newPage) => {

        this.setState({page:newPage},()=>{

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
                    totalCount: res.totalCount
                }
                this.setState(obj);
            })
            .catch(err => {
                console.log('DoctorListComponent error: ',err)
                alert('something went wrong')
            })
        });
    };

    handleChangeRowsPerPage = (event) => {
        const obj = {
            page: 0,
            rowsPerPage: parseInt(event.target.value)
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
                    totalCount:res.totalCount
                }
                this.setState(obj);
            })
            .catch(err => {
                console.log('DoctorListComponent error: ',err)
                alert('something went wrong')
            })
        });
    };

    render() {

        const {page,rowsPerPage,totalCount,doctors,timingLabels} = this.state;


        const TableBody = doctors.map( e => {
            let obj = {
                id: e.id,
                time: e.availability
            }
            // console.log(obj)
            return <>
                <p>woo</p>
                <DoctorListTiming data={obj} />
            </>
        })

        return (
            <div className={classes.Main__DoctorList__Body}>
                <div className={classes.HeaderText}>
                    <h4>Doctors List</h4>
                </div>

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
                            <tr>
                                <td>{doctors.length ? doctors[0].name.full:''}</td>
                                <td>{doctors.length ? doctors[0].email:''}</td>
                                <td>{doctors.length ? doctors[0].phone:''}</td>
                                <td>
                                    {doctors.length ? doctors[0].location.streetAddress+', ':''}
                                    {doctors.length ? doctors[0].location.city+', ':''}
                                    {doctors.length ? doctors[0].location.state:''}
                                </td>
                                <td>{doctors.length ? doctors[0]._specialty.name:''}</td>
                                <td>{doctors.length ? doctors[0].fee+' INR':''}</td>
                                <td>{doctors.length ? doctors[0].totalAppointment:''}</td>
                                <td>ww
                                    {/* {
                                        doctors.length ? (
                                            doctors.length[0].availability.length ? (
                                                <>
                                                <button id="PopoverLegacy"
                                                className={classes.Doctor__time__btn}>
                                                    <i className="far fa-eye"></i> See
                                                </button>
                                                <UncontrolledPopover 
                                                trigger="legacy" 
                                                placement="bottom" 
                                                target="PopoverLegacy">
                                                    <PopoverHeader>Schedule</PopoverHeader>
                                                    <PopoverBody>
                                                        {
                                                            doctors.length[0].availability.map(a => {
                                                                return
                                                            })
                                                        }
                                                        <p className={classes.Doctor__timing__popoverTxt}>
                                                            <b>Tue:</b> 3 pm - 5 pm & 7 pm - 10 pm & 7 pm - 10 pm
                                                        </p>
                                                        <hr  className={classes.Popver__line}/>
                                                        <p className={classes.Doctor__timing__popoverTxt}>
                                                            <b>Wed:</b> 1 pm - 9 pm
                                                        </p>
                                                        <hr  className={classes.Popver__line}/>
                                                        <p className={classes.Doctor__timing__popoverTxt}>
                                                            <b>Tue:</b> 3 pm - 5 pm & 7 pm - 10 pm
                                                        </p>
                                                        <hr  className={classes.Popver__line}/>
                                                        <p className={classes.Doctor__timing__popoverTxt}>
                                                            <b>Wed:</b> 1 pm - 9 pm
                                                        </p>
                                                    </PopoverBody>
                                                </UncontrolledPopover>
                                                </>
                                            ) : <p>Not Provided yet!</p>
                                        ) : '' 
                                    }
                                     */}
                                </td>
                                <td>{doctors.length ? (doctors[0].isActive ? 'Active' : 'Inactive'):''}</td>
                            </tr>
                            <tr>
                                <td>Jone</td>
                                <td>jone@gmail.com</td>
                                <td>123456789</td>
                                <td>nortd state</td>
                                <td>Heart</td>
                                <td>456 INR</td>
                                <td>7</td>
                                <td>
                                    <button className={classes.Doctor__time__btn}>
                                        <i className="far fa-eye"></i> See
                                    </button>
                                </td>
                                <td>Active</td>
                            </tr>
                            <tr>
                                <td>Jone</td>
                                <td>jone@gmail.com</td>
                                <td>123456789</td>
                                <td>nortd state</td>
                                <td>Heart</td>
                                <td>456 INR</td>
                                <td>7</td>
                                <td>
                                    <button className={classes.Doctor__time__btn}>
                                        <i className="far fa-eye"></i> See
                                    </button>
                                </td>
                                <td>Active</td>
                            </tr>
                            <tr>
                                <td>Jone</td>
                                <td>jone@gmail.com</td>
                                <td>123456789</td>
                                <td>nortd state</td>
                                <td>Heart</td>
                                <td>456 INR</td>
                                <td>7</td>
                                <td>
                                    <button className={classes.Doctor__time__btn}>
                                        <i className="far fa-eye"></i> See
                                    </button>
                                </td>
                                <td>Active</td>
                            </tr>
                            <tr>
                                <td>Jone</td>
                                <td>jone@gmail.com</td>
                                <td>123456789</td>
                                <td>nortd state</td>
                                <td>Heart</td>
                                <td>456 INR</td>
                                <td>7</td>
                                <td>
                                    <button className={classes.Doctor__time__btn}>
                                        <i className="far fa-eye"></i> See
                                    </button>
                                </td>
                                <td>Active</td>
                            </tr>
                            <tr>
                                <td>Jone</td>
                                <td>jone@gmail.com</td>
                                <td>123456789</td>
                                <td>nortd state</td>
                                <td>Heart</td>
                                <td>456 INR</td>
                                <td>7</td>
                                <td>
                                    <button className={classes.Doctor__time__btn}>
                                        <i className="far fa-eye"></i> See
                                    </button>
                                </td>
                                <td>Active</td>
                            </tr>
                            <tr>
                                <td>Jone</td>
                                <td>jone@gmail.com</td>
                                <td>123456789</td>
                                <td>nortd state</td>
                                <td>Heart</td>
                                <td>456 INR</td>
                                <td>7</td>
                                <td>
                                    <button className={classes.Doctor__time__btn}>
                                        <i className="far fa-eye"></i> See
                                    </button>
                                </td>
                                <td>Active</td>
                            </tr>
                            <tr>
                                <td>Jone</td>
                                <td>jone@gmail.com</td>
                                <td>123456789</td>
                                <td>nortd state</td>
                                <td>Heart</td>
                                <td>456 INR</td>
                                <td>7</td>
                                <td>
                                    <button className={classes.Doctor__time__btn}>
                                        <i className="far fa-eye"></i> See
                                    </button>
                                </td>
                                <td>Active</td>
                            </tr>
                            <tr>
                                <td>Jone</td>
                                <td>jone@gmail.com</td>
                                <td>123456789</td>
                                <td>nortd state</td>
                                <td>Heart</td>
                                <td>456 INR</td>
                                <td>7</td>
                                <td>
                                    <button className={classes.Doctor__time__btn}>
                                        <i className="far fa-eye"></i> See
                                    </button>
                                </td>
                                <td>Active</td>
                            </tr>
                            <tr>
                                <td>Jone</td>
                                <td>jone@gmail.com</td>
                                <td>123456789</td>
                                <td>nortd state</td>
                                <td>Heart</td>
                                <td>456 INR</td>
                                <td>7</td>
                                <td>
                                    <button className={classes.Doctor__time__btn}>
                                        <i className="far fa-eye"></i> See
                                    </button>
                                </td>
                                <td>Active</td>
                            </tr>
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
            </div>
        )
    }
}
