import React from 'react';

class CalendarList extends React.Component {
    render() {
        return <div style={{ paddingLeft: '20px' }}> {this.renderMeetingsList()}</div >
    }

    renderMeetingsList() {
        return this.props.meetings.map(item =>
            this.renderMeetingsItem(item)
        );
    }

    deleteMeeting(meetingID) {
        const { deleteMeeting } = this.props;
        if (typeof deleteMeeting === 'function') {
            deleteMeeting(meetingID);
        }
    }

    handleDelete(e, id) {
        e.preventDefault()
        if (window.confirm("Do you really want to remove meeting?")) {
            this.deleteMeeting(id)
        }
    }

    itemStyle = {
        border: '1px solid black',
        padding: '5px',
        background: 'SteelBlue',
        color: 'white'
    }

    renderMeetingsItem(itemData) {
        return (
            <div key={itemData.id} style={{ background: 'LightSkyBlue', padding: '10px', border: '1px solid black', margin: '5px 0 5px 0', textAlign: 'center' }}>
                <div style={{ display: 'flex' }}>
                    <div style={{ padding: '0 5px 0 5px' }}>
                        <p style={this.itemStyle}>{itemData.date}</p>
                    </div>
                    <div style={{ padding: '0 5px 0 5px' }}>
                        <p style={this.itemStyle}>{itemData.time}</p>
                    </div>
                    <div style={{ padding: '0 5px 0 5px' }}>
                        <p style={this.itemStyle}>{itemData.firstName} {itemData.lastName}</p>
                    </div>
                    <div style={{ padding: '0 5px 0 5px' }}>
                        <p style={this.itemStyle}><a href={`mailto: ${itemData.email}`} style={{ color: 'white' }}>
                            {itemData.email}
                        </a></p>
                    </div>
                </div>
                <div>
                    <button
                        style={{ background: 'red', color: 'white', paddding: '5px' }}
                        onClick={(e) => this.handleDelete(e, itemData.id)}
                    >DELETE</button>
                </div>
            </div >
        )
    }
}

export default CalendarList