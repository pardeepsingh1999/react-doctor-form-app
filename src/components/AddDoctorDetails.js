import React, { Component } from 'react'
import { 
    Form, FormGroup, Label, Input,
} from 'reactstrap';
import classes from '../styles/AddDoctorDetails.module.css';
import { makeGetRequest } from '../https/http-service';
import { connect } from 'react-redux';
import { addDoctorDetails } from '../redux/actions/add-doctor-details';
import { v4 as uuidv4 } from 'uuid';

class AddDoctorDetails extends Component {

    state = {
        doctorDetials: {
            name: '',
            speciality: '',
            experience: '',
            consultFees: '',
            qualification: '',
            practisingAt: '',
            languages: [],
            email: '',
            phone: '',
            gender: '',
            medicalRegistrationNumber: '',
            graduation: '',
            speciallization: '',
            superSpeciallization: ''
        },
        isDirty: {
            name: false,
            speciality: false,
            experience: false,
            consultFees: false,
            qualification: false,
            practisingAt: false,
            languages: false,
            email: false,
            phone: false,
            gender: false,
            medicalRegistrationNumber: false,
            graduation: false,
            speciallization: false,
            superSpeciallization: false
        },
        languages: [
            'Hindi','English','Punjabi','Bengali','Marathi','Telugu',
            'Tamil','Gujrati','Assamese','Kannada','Oriya','Malayalam'
        ],
        specialties: [],
        errors: {}
    }

    componentDidMount() {
        makeGetRequest(
            'http://178.128.127.115:3000/admin/v1/specialties',
            true,
            null
        )
        .then(res => {
            console.log('get specialties res: ', res)
            
            this.setState({ specialties: res.specialties })
        })
        .catch(err => {
            console.log('AddDoctorComponent server error: ',err)
            alert('somthing went wrong')
        })
    }

    _handleOnChange = (field, value) => {
        // console.log(field, value)
        const { doctorDetials, isDirty } = this.state;
        if(typeof value === 'number' && !value) {
            doctorDetials[field] = '';
            isDirty[field] = true
            this.setState({ doctorDetials, isDirty }, () => {
                this._validateForm();
                // console.log(this.state)
            });
            return;
        }
        if(field === 'languages') {
            if(value.checked) {
                doctorDetials[field].push(value.value)
            } else {
                doctorDetials[field].splice(doctorDetials[field].indexOf(value.value),1)
            }
        } else {
            doctorDetials[field] = value;
        }
        isDirty[field] = true
        this.setState({ doctorDetials, isDirty }, () => {
            this._validateForm();
            // console.log(this.state)
        });
    }

    _validateForm() {
        const { doctorDetials, errors, isDirty } = this.state;
        Object.keys(doctorDetials).forEach((each) => {
            switch(each) {
                case 'name': {
                    if (isDirty.name) {
                        if (!doctorDetials.name.trim().length) {
                            errors[each] = "*Required";
                        } else if (doctorDetials.name.trim().length < 3) {
                            errors[each] = "*Should be minimum of 3 characters";
                        } else {
                            delete errors[each];
                            isDirty.name = false;
                        }
                    }
                    break;
                }
                case 'speciality': {
                    if (isDirty.speciality) {
                        if (!doctorDetials.speciality.trim().length) {
                            errors[each] = "*Required";
                        } else {
                            delete errors[each];
                            isDirty.speciality = false;
                        }
                    }
                    break;
                }
                case 'experience': {
                    if (isDirty.experience) {
                        if (!doctorDetials.experience) {
                            errors[each] = "*Required";
                        } else if (doctorDetials.experience < 0) {
                            errors[each] = "*Should be positive number";
                        } else {
                            delete errors[each];
                            isDirty.experience = false;
                        }
                    }
                    break;
                }
                case 'consultFees': {
                    if (isDirty.consultFees) {
                        if (!doctorDetials.consultFees) {
                            errors[each] = "*Required";
                        } else if (doctorDetials.consultFees < 0) {
                            errors[each] = "*Should be positive number";
                        } else {
                            delete errors[each];
                            isDirty.consultFees = false;
                        }
                    }
                    break;
                }
                case 'qualification': {
                    if (isDirty.qualification) {
                        if (!doctorDetials.qualification.trim().length) {
                            errors[each] = "*Required";
                        } else {
                            delete errors[each];
                            isDirty.qualification = false;
                        }
                    }
                    break;
                }
                case 'practisingAt': {
                    if (isDirty.practisingAt) {
                        if (!doctorDetials.practisingAt.trim().length) {
                            errors[each] = "*Required";
                        } else {
                            delete errors[each];
                            isDirty.practisingAt = false;
                        }
                    }
                    break;
                }
                case 'languages': {
                    if (isDirty.languages) {
                        if (!doctorDetials.languages.length) {
                            errors[each] = "*At Least one language is required";
                        } else {
                            delete errors[each];
                            isDirty.languages = false;
                        }
                    }
                    break;
                }
                case 'phone': {
                    if (isDirty.phone) {
                        if (!doctorDetials.phone) {
                            errors[each] = "*Required";
                        } else if ((doctorDetials.phone).toString().length < 10 || (doctorDetials.phone).toString().length > 10) {
                            errors[each] = "*Must be of 10 digits";
                        } else {
                            delete errors[each];
                            isDirty.phone = false;
                        }
                    }
                    break;
                }
                case 'email': {
                    if (isDirty.email) {
                        if (!doctorDetials.email.trim().length) {
                            errors.email = "*Required";
                        } else if (
                            doctorDetials.email.trim().length &&
                            !new RegExp(
                                "^[a-zA-Z0-9]{1}[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$"
                            ).test(doctorDetials.email)
                            ) {
                                errors.email = "*Invalid Email";
                            } else {
                                delete errors[each];
                                isDirty.email = false;
                        }
                    } 
                    break;
                }
                case 'gender': {
                    if (isDirty.gender) {
                        if (!doctorDetials.gender.trim().length) {
                            errors[each] = "*Required";
                        } else {
                            delete errors[each];
                            isDirty.gender = false;
                        }
                    }
                    break;
                }
                case 'medicalRegistrationNumber': {
                    if (isDirty.medicalRegistrationNumber) {
                        if (!doctorDetials.medicalRegistrationNumber.trim().length) {
                            errors[each] = "*Required";
                        } else {
                            delete errors[each];
                            isDirty.medicalRegistrationNumber = false;
                        }
                    }
                    break;
                }
                case 'graduation': {
                    if (isDirty.graduation) {
                        if (!doctorDetials.graduation.trim().length) {
                            errors[each] = "*Required";
                        } else {
                            delete errors[each];
                            isDirty.graduation = false;
                        }
                    }
                    break;
                }
                case 'speciallization': {
                    if (isDirty.speciallization) {
                        if (!doctorDetials.speciallization.trim().length) {
                            errors[each] = "*Required";
                        } else {
                            delete errors[each];
                            isDirty.speciallization = false;
                        }
                    }
                    break;
                }
                case 'superSpeciallization': {
                    if (isDirty.superSpeciallization) {
                        if (!doctorDetials.superSpeciallization.trim().length) {
                            errors[each] = "*Required";
                        } else {
                            delete errors[each];
                            isDirty.superSpeciallization = false;
                        }
                    }
                    break;
                }
                default: {
                    console.log('error: not found key in validation');
                    break;
                }
            } 
        });
        this.setState({ errors });
        return Object.keys(errors).length ? errors : null;
    }

    _handleOnSubmit = (e) => {
        e.preventDefault();
        let isDirty = {
            name: true,
            speciality: true,
            experience: true,
            consultFees: true,
            qualification: true,
            practisingAt: true,
            languages: true,
            email: true,
            phone: true,
            gender: true,
            medicalRegistrationNumber: true,
            graduation: true,
            speciallization: true,
            superSpeciallization: true
        };
        this.setState({ isDirty }, () => {
          let errors = this._validateForm();
          console.log(errors);
          if (!errors) {
                const { doctorDetials } = this.state;
                // doctorDetials['speciality'] = specialties.find(e => e.id === this.state.doctorDetials.speciality)
                console.log("Make API call: ", doctorDetials);
                const obj = {
                    id: uuidv4(),
                    ...doctorDetials
                }
                this.props.addDoctorDetails(obj)
          }
        });
    };

    render() {
        const { doctorDetials, specialties, errors, languages } = this.state;

        const specialtiesOptions = specialties.map( s => {
            return <option key={s.id} value={s.name}>{s.name}</option>
        })

        const languagesCheckbox = languages.map( lang => {
            return <FormGroup check key={lang}
                    className={[classes.childCheckboxLanguage].join(' ')}>
                        <Label check>
                            <Input type="checkbox" 
                            value={lang}
                            onChange={(e) => 
                                this._handleOnChange("languages",e.target)
                            }
                            checked={doctorDetials.languages.includes(lang)?true:false}
                            />{' '}
                            {lang}
                        </Label>
                    </FormGroup>
        })

        return (
            <div className="container">

                <h4 className={classes.HeaderText}>Add Doctor Details</h4>
                <hr />

                <div className={classes.doctorInfoForm}>
                    <Form onSubmit={this._handleOnSubmit}>
                        <div className="row">
                        <FormGroup className="col-6">
                            <Label for="exampleName">Name</Label>
                            <Input type="text" name="name" id="exampleName" 
                            onChange={(e) => 
                                this._handleOnChange("name",e.target.value.trim())
                            }
                            value={doctorDetials.name}
                            placeholder="Enter your name" />
                            {errors && (
                                <div className={classes.validationError}>{errors.name}</div>
                                )}
                        </FormGroup>
                        <FormGroup className="col-6">
                            <Label for="exampleSpeciality">Speciality</Label>
                            <Input type="select" 
                            onChange={(e) => 
                                this._handleOnChange("speciality",e.target.value)
                            }
                            value={doctorDetials.speciality}
                            name="speciality" id="exampleSpeciality">
                            <option value="">Select Speciality</option>

                            { specialtiesOptions }
                            
                            </Input>
                            {errors && (
                                <div className={classes.validationError}>{errors.speciality}</div>
                                )}
                        </FormGroup>

                        <FormGroup className="col-6">
                            <Label for="exampleExperience">Experience</Label>
                            <Input type="number" name="experience" id="exampleExperience" 
                            onChange={(e) => 
                                this._handleOnChange("experience",parseInt(e.target.value))
                            }
                            min={0}
                            value={doctorDetials.experience}
                            placeholder="Enter your experience" />
                            {errors && (
                                <div className={classes.validationError}>{errors.experience}</div>
                                )}
                        </FormGroup>
                        <FormGroup className="col-6">
                            <Label for="exampleConsultFees">Consult Fees</Label>
                            <Input type="number" name="consultFees" id="exampleConsultFees" 
                            onChange={(e) => 
                                this._handleOnChange("consultFees",parseInt(e.target.value))
                            }
                            min={0}
                            value={doctorDetials.consultFees}
                            placeholder="Enter Consult Fees" />
                            {errors && (
                                <div className={classes.validationError}>{errors.consultFees}</div>
                                )}
                        </FormGroup>
                        
                        <FormGroup className="col-6">
                            <Label for="exampleQualification">Qualification</Label>
                            <Input type="text" name="qualification" id="exampleQualification" 
                            onChange={(e) => 
                                this._handleOnChange("qualification",e.target.value.trim())
                            }
                            value={doctorDetials.qualification}
                            placeholder="Enter your Qualification" />
                            {errors && (
                                <div className={classes.validationError}>{errors.qualification}</div>
                                )}
                        </FormGroup>
                        <FormGroup className="col-6">
                            <Label for="examplePractisingAt">Practising At</Label>
                            <Input type="text" name="practisingAt" id="examplePractisingAt" 
                            onChange={(e) => 
                                this._handleOnChange("practisingAt",e.target.value.trim())
                            }
                            value={doctorDetials.practisingAt}
                            placeholder="Practising At" />
                            {errors && (
                                <div className={classes.validationError}>{errors.practisingAt}</div>
                                )}
                        </FormGroup>

                        <FormGroup className="col-12">
                            <Label>Languages</Label>

                            <div className={classes.allLangulageCheckbox}>

                                {languagesCheckbox}

                            </div>
                            
                            {errors && (
                                <div className={classes.validationError}>{errors.languages}</div>
                                )}
                        </FormGroup>

                        <FormGroup className="col-6">
                            <Label for="examplePhone">Phone</Label>
                            <Input type="number" name="phone" id="examplePhone" 
                            onChange={(e) => 
                                this._handleOnChange("phone",parseInt(e.target.value))
                            }
                            value={doctorDetials.phone}
                            min={0}
                            placeholder="Enter your phone number" />
                            {errors && (
                                <div className={classes.validationError}>{errors.phone}</div>
                                )}
                        </FormGroup>
                        <FormGroup className="col-6">
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" 
                            onChange={(e) => 
                                this._handleOnChange("email",e.target.value.trim())
                            }
                            value={doctorDetials.email}
                            placeholder="Enter your email id" />
                            {errors && (
                                <div className={classes.validationError}>{errors.email}</div>
                                )}
                        </FormGroup>

                        <FormGroup className="col-6" tag="fieldset">
                            <Label>Gender</Label>
                            <div className="d-flex flex-wrap">
                            <FormGroup check className="mr-4">
                                <Label check>
                                    <Input type="radio" value="Male" 
                                    onChange={(e) => 
                                        this._handleOnChange("gender",e.target.value)
                                    }
                                    checked={doctorDetials.gender==='Male'?true:false}
                                    name="gender" />{' '}
                                    Male
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" value="Female" 
                                    onChange={(e) => 
                                        this._handleOnChange("gender",e.target.value)
                                    }
                                    checked={doctorDetials.gender==='Female'?true:false}
                                    name="gender" />{' '}
                                    Femail
                                </Label>
                            </FormGroup>
                            </div>
                            {errors && (
                                <div className={classes.validationError}>{errors.gender}</div>
                                )}
                        </FormGroup>
                        <FormGroup className="col-6">
                            <Label for="exampleMedicalRegistrationNumber">Medical Registration Number</Label>
                            <Input type="text" name="medicalRegistrationNumber" id="exampleMedicalRegistrationNumber" 
                            onChange={(e) => 
                                this._handleOnChange("medicalRegistrationNumber",e.target.value.trim())
                            }
                            value={doctorDetials.medicalRegistrationNumber}
                            min={0}
                            placeholder="Enter your Medical Registration Number" />
                            {errors && (
                                <div className={classes.validationError}>{errors.medicalRegistrationNumber}</div>
                                )}
                        </FormGroup>

                        <FormGroup className="col-6">
                            <Label for="exampleGraduation">Graduation</Label>
                            <Input type="textarea" name="text" 
                            onChange={(e) => 
                                this._handleOnChange("graduation",e.target.value.trim())
                            }
                            value={doctorDetials.graduation}
                            id="exampleGraduation" />
                            {errors && (
                                <div className={classes.validationError}>{errors.graduation}</div>
                                )}
                        </FormGroup>

                        <FormGroup className="col-6">
                            <Label for="exampleSpeciallization">Speciallization</Label>
                            <Input type="textarea" name="text" 
                            onChange={(e) => 
                                this._handleOnChange("speciallization",e.target.value.trim())
                            }
                            value={doctorDetials.speciallization}
                            id="exampleSpeciallization" />
                            {errors && (
                                <div className={classes.validationError}>{errors.speciallization}</div>
                                )}
                        </FormGroup>

                        <FormGroup className="col-6">
                            <Label for="exampleSuperSpeciallization">Super Speciallization</Label>
                            <Input type="textarea" name="text" 
                            onChange={(e) => 
                                this._handleOnChange("superSpeciallization",e.target.value.trim())
                            }
                            value={doctorDetials.superSpeciallization}
                            id="exampleSuperSpeciallization" />
                            {errors && (
                                <div className={classes.validationError}>{errors.superSpeciallization}</div>
                                )}
                        </FormGroup>
                        </div>

                        <hr />
                        
                        <button type="submit" 
                        className={[classes.formSubmitBtn,'float-right'].join(' ')}>
                            Save
                        </button>
                    </Form>
                </div>
            </div>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//       doctorDetails: state.addDoctor.doctorDetails
//     }
// }
  
const mapDispatchToProps = dispatch => {
    return {
        addDoctorDetails: (doctorDetailsObj) => dispatch(addDoctorDetails(doctorDetailsObj))
    }
}
  
export default connect(null,mapDispatchToProps)(AddDoctorDetails)