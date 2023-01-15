import React from 'react';


class CalendarApi extends React.Component {
    apiUrl = 'http://localhost:3005/meetings';


    loadMeetingsFromApi = () => {
        return fetch(this.apiUrl)
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                }
                throw new Error('Network error!');
            })
            .catch(err => {
                console.error(err);
            });
    }

    sendMeetingToApi = (meetingData) => {
        return fetch(this.apiUrl, {
            method: 'POST',
            body: JSON.stringify(meetingData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                }
                throw new Error('Network error!');
            })
            .catch(err => {
                console.log(err);
            });
    }

    addMeetingToState(meetingData) {
        this.setState({
            meetings: [...this.state.meetings, meetingData],
        })
    }
    removeMeetingFromApi = (meetingID) => {
        return fetch(this.apiUrl + `/${meetingID}`, {
            method: 'DELETE'
        })
            .catch(err => {
                console.error(err)
            })
    }
}

export default CalendarApi