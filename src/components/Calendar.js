import React from 'react';

import CalendarList from './CalendarList'
import CalendarForm from './CalendarForm';
import CalendarApi from './CalendarApi'

import { useDispatch, useSelector } from 'react-redux'
import { loadMeetingsAction, saveMeetingsAction, deleteMeetingsAction } from '../state/calendar'

const Calendar = () => {
    const dataApi = new CalendarApi()
    React.useEffect(() => {
        dataApi.loadMeetingsFromApi()
            .then(resp => {
                dispatch(loadMeetingsAction(resp))
            })
    }, [])

    const dispatch = useDispatch()
    const meetings = useSelector(state => state.calendar.meetings)

    const addMeeting = (meetingData) => {
        console.log(meetingData)
        dataApi.sendMeetingToApi(meetingData)
            .then(() => {
                dispatch(saveMeetingsAction(meetingData))
            })
    }

    const deleteMeeting = (meetingID) => {
        dataApi.removeMeetingFromApi(meetingID)
            .then(() => {
                dispatch(deleteMeetingsAction(meetingID))
            })
    }

    return (
        <>
            <div style={{ textAlign: 'center' }}><h1>Meetings Calendar</h1></div>
            <section style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '90vw',
                maxWidth: '1200px',
                justifyContent: 'center',
                margin: '0 auto 0 auto'
            }}>
                <CalendarForm saveMeeting={addMeeting} />
                <CalendarList meetings={meetings ? meetings : null} deleteMeeting={deleteMeeting} />
            </section>
        </>
    )

}

export default Calendar;