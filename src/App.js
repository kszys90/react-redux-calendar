import React from 'react';
import { Provider } from 'react-redux'
import Calendar from './components/Calendar';
import { store } from './store'


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Calendar />
            </Provider>
        )
    }
}

export default App;