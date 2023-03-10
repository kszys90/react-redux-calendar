import React from 'react';

class CalendarForm extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        date: '',
        time: '',
        errors: [],
    }
    style = {
        display: 'flex',
        justifyContent: 'space-between'
    }

    render() {
        return (
            <div style={{ background: 'LightSkyBlue', padding: '10px', border: '1px solid black', margin: '5px 0 5px 0', width: '280px' }}>
                <form action="" onSubmit={this.handleSubmit}>

                    <div >
                        <label style={this.style}>
                            Data: <input
                                name="date"
                                onChange={this.handleFieldChange}
                                value={this.state.date}
                                placeholder="RRRR-MM-DD"
                            />
                        </label>
                    </div>
                    <div >
                        <label style={this.style}>
                            Godzina: <input
                                name="time"
                                onChange={this.handleFieldChange}
                                value={this.state.time}
                                placeholder="HH:MM"
                            />
                        </label>
                    </div>

                    <div>
                        <label style={this.style}>
                            Imię: <input
                                name="firstName"
                                onChange={this.handleFieldChange}
                                value={this.state.firstName}
                            />
                        </label>
                    </div>
                    <div>
                        <label style={this.style}>
                            Nazwisko: <input
                                name="lastName"
                                onChange={this.handleFieldChange}
                                value={this.state.lastName}
                            />
                        </label>
                    </div>
                    <div>
                        <label style={this.style}>
                            Email: <input
                                name="email"
                                onChange={this.handleFieldChange}
                                value={this.state.email}
                                placeholder="nazwa@poczty.pl"
                            />
                        </label>
                    </div>
                    <div style={{ textAlign: 'center', paddingTop: '15px' }}>
                        <input type="submit" value="zapisz" />
                    </div>
                    <ul>{this.renderErrors()}</ul>
                </form>
            </div>
        )
    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validateForm();
        this.setState({
            errors,
        });

        if (errors.length === 0) {
            this.saveMeeting();
            this.clearFormFields();
        }
    }

    validateForm() {
        const errors = [];

        if (!this.isDateCorrect()) {
            errors.push('Popraw wprowadzoną datę');
        }

        if (!this.isTimeCorrect()) {
            errors.push('Popraw wprowadzoną godiznę')
        }

        if (!this.isFirstNameCorrect()) {
            errors.push('Wprowadź imię');
        }

        if (!this.isLastNameCorrect()) {
            errors.push('Wprowadż nazwisko')
        }

        if (!this.isEmailCorrect()) {
            errors.push('Wprowadź poprawny adres email');
        }


        return errors;
    }

    isDateCorrect() {
        const pattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

        return pattern.test(this.state.date);
    }

    isTimeCorrect() {
        const pattern = /^[0-9]{2}:[0-9]{2}$/

        return pattern.test(this.state.time);
    }

    isFirstNameCorrect() {
        return this.state.firstName.length > 0;
    }

    isLastNameCorrect() {
        return this.state.lastName.length > 0;
    }

    isEmailCorrect() {
        const pattern = /^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,3}$/;

        return pattern.test(this.state.email);
    }

    handleFieldChange = e => {
        if (this.isFieldNameCorrect(e.target.name)) {
            this.setState({
                [e.target.name]: e.target.value,
            });
        }
    }

    saveMeeting() {
        const { saveMeeting } = this.props;

        if (typeof saveMeeting === 'function') {
            saveMeeting(this.getFieldsData());
        }
    }


    clearFormFields() {
        const fieldsData = this.getFieldsData();
        for (const prop in fieldsData) {
            fieldsData[prop] = '';
        }

        this.setState(fieldsData);
    }

    getFieldsData() {
        const fieldsData = Object.assign({}, this.state);
        delete fieldsData['errors'];

        return fieldsData;
    }

    isFieldNameCorrect(name) {
        const fieldsData = this.getFieldsData();

        return typeof fieldsData[name] !== 'undefined';
    }

    renderErrors() {
        return this.state.errors.map((err, index) => <li key={index}>{err}</li>);
    }
}

export default CalendarForm