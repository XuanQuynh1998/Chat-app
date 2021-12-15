const initialState = { showProfile: false, showSettings: false };

const rightbar = (state = initialState, action) => {
    switch (action.type) {
        case "showProfile":
            return { ...initialState, showProfile: !state.showProfile };

        case "showSettings":
            return { ...initialState, showSettings: !state.showSettings };

        default:
            return state;
    }
};

const editProfile = (state = false, action) => {
    switch (action.type) {
        case "editProfile":
            return !state;
        default:
            return state;
    }
};

export { rightbar, editProfile };
