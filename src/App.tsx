import Router from 'router';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.scss';

function App() {
    return (
        <Provider store={store}>
            <Router></Router>
        </Provider>
    );
}

export default App;
