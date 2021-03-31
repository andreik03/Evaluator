import { Login, Logout } from "../actions/types/connection";

const initialState = {
    loggedIn: false,
};

type Action = {
    type: string;
    payload: any;
}

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case Login:
            return { ...state, loggedIn: true };
        case Logout:
            return { ...state, loggedIn: false };
        default:
            return state;
    }
};
export default reducer;
    