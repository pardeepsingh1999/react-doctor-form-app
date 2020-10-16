import React, { Component } from 'react'
import { Button, FormGroup, Input } from 'reactstrap';

import classes from '../styles/AddDoctorTiming.module.css';

export default class AddDoctorTiming extends Component {
    state = {
        timingLabels: [
            { label:'08:00 AM', value:8  },
            { label:'09:00 AM', value:9  },
            { label:'10:00 AM', value:10 },
            { label:'11:00 AM', value:11 },
            { label:'12:00 PM', value:12 },
            { label:'01:00 PM', value:13 },
            { label:'02:00 PM', value:14 },
            { label:'03:00 PM', value:15 },
            { label:'04:00 PM', value:16 },
            { label:'05:00 PM', value:17 },
            { label:'06:00 PM', value:18 },
            { label:'07:00 PM', value:19 },
            { label:'08:00 PM', value:20 },
            { label:'09:00 PM', value:21 },
            { label:'10:00 PM', value:22 },
        ],
        doctorTiming: {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: []
        },
        isDirty: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        },
        errors: {}
    }

    _handleOnChange = (day,index,value) => {
        const { doctorTiming, isDirty } = this.state;

        let stateUpdate = true;

        if(value.from==='' || value.from) {
            console.log(value)
            doctorTiming[day][index].from = value.from;
            if(doctorTiming[day][index].from === doctorTiming[day][index].to) {
                doctorTiming[day][index].to = '';
            }
        } else if(value.to==='' || value.to) {
            doctorTiming[day][index].to = value.to;
        } else {
            console.log('onChange Error!!!')
            stateUpdate = false;
        }

        if(stateUpdate) {
            isDirty[day] = true;
    
            this.setState({ doctorTiming, isDirty },()=>{
                this._validateTimingForm()
                console.log('onChange, ', this.state)
            })
        }
    }

    _handleValidateError = (day) => {
        const { doctorTiming } = this.state;

        let fromRequired = false, toRequired = false, overlap = false;

        for(let i=0; i<doctorTiming[day].length; i++) {
            let obj = doctorTiming[day][i];
            let nextObj = doctorTiming[day][i+1] ? doctorTiming[day][i+1] : null;
            if(!obj.from || obj.from === '') {
                fromRequired = true;
                break;
            } else if (!obj.to || obj.to === '') {
                toRequired = true;
                break;
            } else if (nextObj && nextObj.from && nextObj.from < obj.to) {
                overlap = true;
                break;
            } else {
                continue;
            }
        }

        let error = '';

        if(fromRequired) {
            error = "*From timing is Required";
        } else if (toRequired) {
            error = "*To timing is Required";
        } else if (overlap) {
            error = "*Timing is overlap! should be in proper order i.e. Morning->afternoon->evening;";
        } else {
            error = null;
        }

        return error;
    }

    _validateTimingForm = () => {
        const { doctorTiming, errors, isDirty } = this.state;
        Object.keys(doctorTiming).forEach((each) => {
            switch(each) {
                case 'monday': {
                    if (isDirty.monday) {
                        let error = this._handleValidateError('monday');
                        if(!error || error === '') {
                            delete errors[each];
                            isDirty[each] = false;
                        } else {
                            errors[each] = error;
                        }
                    }
                    break;
                }
                case 'tuesday': {
                    if (isDirty.tuesday) {
                        let error = this._handleValidateError('tuesday');
                        if(!error || error === '') {
                            delete errors[each];
                            isDirty[each] = false;
                        } else {
                            errors[each] = error;
                        }
                    }
                    break;
                }
                case 'wednesday': {
                    if (isDirty.wednesday) {
                        let error = this._handleValidateError('wednesday');
                        if(!error || error === '') {
                            delete errors[each];
                            isDirty[each] = false;
                        } else {
                            errors[each] = error;
                        }
                    }
                    break;
                }
                case 'thursday': {
                    if (isDirty.thursday) {
                        let error = this._handleValidateError('thursday');
                        if(!error || error === '') {
                            delete errors[each];
                            isDirty[each] = false;
                        } else {
                            errors[each] = error;
                        }
                    }
                    break;
                }
                case 'friday': {
                    if (isDirty.friday) {
                        let error = this._handleValidateError('friday');
                        if(!error || error === '') {
                            delete errors[each];
                            isDirty[each] = false;
                        } else {
                            errors[each] = error;
                        }
                    }
                    break;
                }
                case 'saturday': {
                    if (isDirty.saturday) {
                        let error = this._handleValidateError('saturday');
                        if(!error || error === '') {
                            delete errors[each];
                            isDirty[each] = false;
                        } else {
                            errors[each] = error;
                        }
                    }
                    break;
                }
                case 'sunday': {
                    if (isDirty.sunday) {
                        let error = this._handleValidateError('sunday');
                        if(!error || error === '') {
                            delete errors[each];
                            isDirty[each] = false;
                        } else {
                            errors[each] = error;
                        }
                    }
                    break;
                }
                default: {
                    console.log('error: not found key in validation');
                    break;
                }
            }
        })
        this.setState({ errors });
        return Object.keys(errors).length ? errors : null;
    }


    _handleAddTimingdd = (day) => {
        const { doctorTiming } = this.state;
        // this.state[day] = [...this.state[day],{from:'',to:''}]
        doctorTiming[day] = [...doctorTiming[day],{from:'',to:''}];

        this.setState({doctorTiming},()=>{
            this._validateTimingForm()
            console.log('added, ',doctorTiming)
        })
    }

    _handleDeleteTimedd = (day, index) => {
        const { doctorTiming } = this.state;
        // this.state[day] = [...this.state[day],{from:'',to:''}]
        doctorTiming[day].splice(index,1);

        this.setState({doctorTiming},()=>{
            this._validateTimingForm()
            console.log('deleted, ',doctorTiming)
        })
    }

    _handleSubmitTimingData = (e) => {
        e.preventDefault();
        let isDirty = {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: true
        }
        this.setState({ isDirty }, () => {
            let errors = this._validateTimingForm();
            console.log(errors);
            if (!errors) {
                  const { doctorTiming } = this.state;
                  // doctorDetials['speciality'] = specialties.find(e => e.id === this.state.doctorDetials.speciality)
                  console.log("Make API call: ", doctorTiming);
            }
          });
    }

    _handleTimingddStructure = (day, index, value) => {

        const { timingLabels } = this.state;

        const fromTimingOptions = timingLabels.map( (t,i) => {
            if(i===timingLabels.length-1) return null;
            return <option key={t.value} value={t.value}>{t.label}</option>
        })
        
        const toTimingOptions = timingLabels.map( (t,i) => {
            if(t.value <= value.from || i===0) return null;
            return <option key={t.value} value={t.value}>{t.label}</option>
        })

        return <>
        <FormGroup key={index} className={[classes.selectTimedd,'col-5'].join(' ')}>
            <Input type="select" 
            onChange={(e) => 
                this._handleOnChange(day,index,{'from': parseInt(e.target.value) ? parseInt(e.target.value) : ''})
            }
            value={value.from}
            name="speciality" id="exampleSpeciality">
            <option value="">Select From Timing</option>

            {fromTimingOptions}
            
            </Input>
        </FormGroup>
        <FormGroup className={[classes.selectTimedd,'col-5'].join(' ')}>
            <Input type="select" 
            onChange={(e) => 
                this._handleOnChange(day,index,{'to': parseInt(e.target.value) ? parseInt(e.target.value) : ''})
            }
            value={value.to}
            name="speciality" id="exampleSpeciality">
            <option value="">Select To Timing</option>

            {toTimingOptions}
            
            </Input>
        </FormGroup>
        <Button onClick={() => this._handleDeleteTimedd(day,index)}
            outline color="danger"
            className={[classes.timeDeleteBtn,'col-2'].join(' ')}>
            Delete
        </Button>
    </>
    }

    render() {

        const { doctorTiming, errors } = this.state;

        const mondayTiming = React.Children.toArray(doctorTiming.monday.map((m, i) => {
            return this._handleTimingddStructure('monday',i,m)
        }))

        const tuesdayTiming = React.Children.toArray(doctorTiming.tuesday.map((m, i) => {
            return this._handleTimingddStructure('tuesday',i,m)
        }))

        const wednesdayTiming = React.Children.toArray(doctorTiming.wednesday.map((m, i) => {
            return this._handleTimingddStructure('wednesday',i,m)
        }))
        
        const thursdayTiming = React.Children.toArray(doctorTiming.thursday.map((m, i) => {
            return this._handleTimingddStructure('thursday',i,m)
        }))

        const fridayTiming = React.Children.toArray(doctorTiming.friday.map((m, i) => {
            return this._handleTimingddStructure('friday',i,m)
        }))

        const saturdayTiming = React.Children.toArray(doctorTiming.saturday.map((m, i) => {
            return this._handleTimingddStructure('saturday',i,m)
        }))

        const sundayTiming = React.Children.toArray(doctorTiming.sunday.map((m, i) => {
            return this._handleTimingddStructure('sunday',i,m)
        }))
    
        return (
            <div className="container">

                {/* <img className="loader" 
                src="https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif"
                alt="loading..."
                ></img> */}

                <h4 className={classes.HeaderText}>Add Doctor Timing</h4>
                <hr />

                <div className={classes.doctorTimingForm}>
                    <div>
                        <label className={classes.childDays}>
                            Monday
                        </label>
                        <Button title="Add Monday Time" outline color="primary"
                        onClick={() => this._handleAddTimingdd('monday')}
                        className={[classes.addTimeBtn,'float-right'].join(' ')}>
                            Add <i className="fas fa-plus"></i>
                        </Button>

                        <div className="row">
                            {mondayTiming}

                            {errors && (
                                <div className={[classes.validationError,'col-12'].join(' ')}>
                                    {errors.monday}
                                </div>
                            )}
                        </div>
                        
                    </div>
                    
                    <hr />

                    <div>
                        <label className={classes.childDays}>
                            Tuesday
                        </label>
                        <Button title="Add Tuesday Time" outline color="primary"
                        onClick={() => this._handleAddTimingdd('tuesday')} 
                        className={[classes.addTimeBtn,'float-right'].join(' ')}>
                            Add <i className="fas fa-plus"></i>
                        </Button>

                        <div className="row">
                            {tuesdayTiming}

                            {errors && (
                                <div className={[classes.validationError,'col-12'].join(' ')}>
                                    {errors.tuesday}
                                </div>
                            )}
                        </div>

                    </div>
                    
                    <hr />

                    <div>
                        <label className={classes.childDays}>
                            Wednesday
                        </label>
                        <Button title="Add Wednesday Time" outline color="primary"
                        onClick={() => this._handleAddTimingdd('wednesday')}
                        className={[classes.addTimeBtn,'float-right'].join(' ')}>
                            Add <i className="fas fa-plus"></i>
                        </Button>

                        <div className="row">
                            {wednesdayTiming}

                            {errors && (
                                <div className={[classes.validationError,'col-12'].join(' ')}>
                                    {errors.wednesday}
                                </div>
                            )}
                        </div>

                    </div>

                    <hr />

                    <div>
                        <label className={classes.childDays}>
                            Thursday
                        </label>
                        <Button title="Add Thursday Time" outline color="primary"
                        onClick={() => this._handleAddTimingdd('thursday')}
                        className={[classes.addTimeBtn,'float-right'].join(' ')}>
                            Add <i className="fas fa-plus"></i>
                        </Button>

                        <div className="row">
                            {thursdayTiming}

                            {errors && (
                                <div className={[classes.validationError,'col-12'].join(' ')}>
                                    {errors.thursday}
                                </div>
                            )}
                        </div>

                    </div>
                    
                    <hr />

                    <div>
                        <label className={classes.childDays}>
                            Friday
                        </label>
                        <Button title="Add Friday Time" outline color="primary"
                        onClick={() => this._handleAddTimingdd('friday')}
                        className={[classes.addTimeBtn,'float-right'].join(' ')}>
                            Add <i className="fas fa-plus"></i>
                        </Button>

                        <div className="row">
                            {fridayTiming}

                            {errors && (
                                <div className={[classes.validationError,'col-12'].join(' ')}>
                                    {errors.friday}
                                </div>
                            )}
                        </div>

                    </div>               

                    <hr />

                    <div>
                        <label className={classes.childDays}>
                            Saturday
                        </label>
                        <Button title="Add Saturday Time" outline color="primary"
                        onClick={() => this._handleAddTimingdd('saturday')}
                        className={[classes.addTimeBtn,'float-right'].join(' ')}>
                            Add <i className="fas fa-plus"></i>
                        </Button>

                        <div className="row">
                            {saturdayTiming}

                            {errors && (
                                <div className={[classes.validationError,'col-12'].join(' ')}>
                                    {errors.saturday}
                                </div>
                            )}
                        </div>

                    </div>               
                    
                    <hr />

                    <div>
                        <label className={classes.childDays}>
                            Sunday
                        </label>
                        <Button title="Add Sunday Time" outline color="primary"
                        onClick={() => this._handleAddTimingdd('sunday')}
                        className={[classes.addTimeBtn,'float-right'].join(' ')}>
                            Add <i className="fas fa-plus"></i>
                        </Button>

                        <div className="row">
                            {sundayTiming}

                            {errors && (
                                <div className={[classes.validationError,'col-12'].join(' ')}>
                                    {errors.sunday}
                                </div>
                            )}
                        </div>

                    </div>
                
                    <hr />

                    <div>
                        <button onClick={this._handleSubmitTimingData}
                        className={[classes.timeSubmitBtn,'float-right'].join(' ')}>
                            Save
                        </button>
                    </div>

                </div>
            </div>
        )
    }
}
