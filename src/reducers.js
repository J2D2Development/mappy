import { createStore } from 'redux';

const initialState = {
    loggedIn: false,
    user: {},
    map: {},
    mapboxAccessToken: 'pk.eyJ1Ijoiam9lZHJpc2NvbGw3OSIsImEiOiJjajhzNnowZGswNmppMnFscWo2b3ByN2IxIn0.OWSNjQU36X8s75_2QGnKqA'
}

function mappyReducer(state = initialState, action) {
    switch(action.type) {
        case 'LOGIN': 
            return Object.assign({}, state, { 
                loggedIn: true,
                user: Object.assign({}, action.loggedInUser)
            });

        case 'LOGOUT':
            return Object.assign({}, state, {
                loggedIn: false,
                user: {}
            });

        case 'SET_MAP':
            return Object.assign({}, state, { map: action.mapObj });

        default:
            return state;
    }
}

const store = createStore(mappyReducer);
export default store;