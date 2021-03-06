import Firebase, { db } from "../../../Fire";
import * as types from "./actionsTypes";

export const restoreSession = () => dispatch => {
  dispatch(sessionLoading());
  dispatch(sessionRestoring());

  Firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(sessionSuccess(user));
    } else {
      dispatch(sessionLogout());
    }
  });
};

export const loginUser = (email, password) => dispatch => {
  dispatch(sessionLoading());

  Firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(sessionSuccess(user));
    })
    .catch(error => {
      dispatch(sessionError(error.message));
    });
};

export const signupUser = (email, password) => dispatch => {
  dispatch(sessionLoading());
  const tmpString = email.split("@");
  const username = tmpString[0];
  const response = Firebase.auth()
    .createUserWithEmailAndPassword(email, password)

    .then(user => {
      Firebase.database()
        .ref(`/users/${response.uid}/`)
        .set({
          profile: {
            name_profile: username,
            email,
            username,
            password,
            userpic:
              "https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png",
            posts_number: 0,
            followers: 0,
            following: 0,
            bio: null,
            sex: null
          }
          // uid: user.user.uid,
          // email: user.user.email
        });
      dispatch(signupSuccess(user));
    })
    .catch(error => {
      dispatch(sessionError(error.message));
    });
};
export const logoutUser = () => dispatch => {
  dispatch(sessionLoading());

  Firebase.auth()
    .signOut()
    .then(() => {
      dispatch(sessionLogout());
    })
    .catch(error => {
      dispatch(sessionError(error.message));
    });
};

const sessionRestoring = () => ({
  type: types.SESSION_RESTORING
});

const sessionLoading = () => ({
  type: types.SESSION_LOADING
});

const sessionSuccess = user => ({
  type: types.SESSION_SUCCESS,
  user
});

const signupSuccess = user => ({
  type: types.SIGNUP_SUCCESS,
  user
});

const sessionError = error => ({
  type: types.SESSION_ERROR,
  error
});

const sessionLogout = () => ({
  type: types.SESSION_LOGOUT
});
