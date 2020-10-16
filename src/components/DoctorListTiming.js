import React from 'react'
import classes from '../styles/DoctorList.module.css';
import { 
    UncontrolledPopover, 
    PopoverHeader, 
    PopoverBody,
} from 'reactstrap';

export default function DoctorListTiming(props) {

    const timingLabels = {
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
        t23:'11 PM',
    }

    const {id, availability} = props.data;

    const monday = availability.monday.map( (ee, i) => {
        return <span key={i}>
                {timingLabels['t'+ee.from]} - {timingLabels['t'+ee.to]}
                {availability.monday[i+1] ? ' & ' : ' '}
            </span>
    })

    const tuesday = availability.tuesday.map( (ee, i) => {
        return <span key={i}>
                {timingLabels['t'+ee.from]} - {timingLabels['t'+ee.to]}
                {availability.tuesday[i+1] ? ' & ' : ' '}
            </span>    
    }) 
    const wednesday = availability.wednesday.map( (ee, i) => {
        return <span key={i}>
                {timingLabels['t'+ee.from]} - {timingLabels['t'+ee.to]}
                {availability.wednesday[i+1] ? ' & ' : ' '}
            </span>    
    }) 
    const thursday = availability.thursday.map( (ee, i) => {
        return <span key={i}>
                {timingLabels['t'+ee.from]} - {timingLabels['t'+ee.to]}
                {availability.thursday[i+1] ? ' & ' : ' '}
            </span>    
    }) 
    const friday = availability.friday.map( (ee, i) => {
        return <span key={i}>
                {timingLabels['t'+ee.from]} - {timingLabels['t'+ee.to]}
                {availability.friday[i+1] ? ' & ' : ' '}
            </span>    
    }) 
    const saturday = availability.saturday.map( (ee, i) => {
        return <span key={i}>
                {timingLabels['t'+ee.from]} - {timingLabels['t'+ee.to]}
                {availability.saturday[i+1] ? ' & ' : ' '}
            </span>    
    }) 
    const sunday = availability.sunday.map( (ee, i) => {
        return <span key={i}>
                {timingLabels['t'+ee.from]} - {timingLabels['t'+ee.to]}
                {availability.sunday[i+1] ? ' & ' : ' '}
            </span>    
    }) 

    return (
        <>
            <UncontrolledPopover 
            trigger="legacy" 
            placement="bottom" 
            target={'availability_'+id}>
                <PopoverHeader>Schedule</PopoverHeader>
                <PopoverBody>
                    {
                        monday.length ? (
                            <>
                                <p className={classes.Doctor__timing__popoverTxt}>
                                    <b>Mon:</b> {monday}
                                </p>
                                <hr  className={classes.Popver__line}/>
                            </>
                        ) : null
                    }

                    {
                        tuesday.length ? (
                            <>
                                <p className={classes.Doctor__timing__popoverTxt}>
                                    <b>Tue:</b> {tuesday}
                                </p>
                                <hr  className={classes.Popver__line}/>
                            </>
                        ) : null
                    }

                    
                    {
                        wednesday.length ? (
                            <>
                                <p className={classes.Doctor__timing__popoverTxt}>
                                    <b>Wed:</b> {wednesday}
                                </p>
                                <hr  className={classes.Popver__line}/>
                            </>
                        ) : null
                    }

                    
                    {
                        thursday.length ? (
                            <>
                                <p className={classes.Doctor__timing__popoverTxt}>
                                    <b>Thur:</b> {thursday}
                                </p>
                                <hr  className={classes.Popver__line}/>
                            </>
                        ) : null
                    }

                    
                    {
                        friday.length ? (
                            <>
                                <p className={classes.Doctor__timing__popoverTxt}>
                                    <b>Fri:</b> {friday}
                                </p>
                                <hr  className={classes.Popver__line}/>
                            </>
                        ) : null
                    }

                    
                    {
                        saturday.length ? (
                            <>
                                <p className={classes.Doctor__timing__popoverTxt}>
                                    <b>Sat:</b> {saturday}
                                </p>
                                <hr  className={classes.Popver__line}/>
                            </>
                        ) : null
                    }

                    
                    {
                        sunday.length ? (
                            <>
                                <p className={classes.Doctor__timing__popoverTxt}>
                                    <b>Sun:</b> {sunday}
                                </p>
                                <hr  className={classes.Popver__line}/>
                            </>
                        ) : null
                    }
                    
                    
                </PopoverBody>
            </UncontrolledPopover>
        </>
    )
}
