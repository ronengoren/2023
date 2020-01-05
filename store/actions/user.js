import Firebase, { db } from "../../Fire";

export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";

export const updateEmail = email => {
  return {
    type: UPDATE_EMAIL,
    payload: email
  };
};

export const updatePassword = password => {
  return {
    type: UPDATE_PASSWORD,
    payload: password
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user;
      const response = await Firebase.auth().signInWithEmailAndPassword(
        email,
        password
      );
      dispatch({ type: LOGIN, payload: response.user });
      this.props.navigation.navigate("ProfileCardView");
    } catch (e) {
      console.log(e);
    }
  };
};

export const signup = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user;
      const response = await Firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      );
      if (response.user.uid) {
        const user = {
          uid: response.user.uid,
          email: email
        };

        db.collection("users")
          .doc(response.user.uid)
          .set(user);

        dispatch({ type: SIGNUP, payload: user });
      }
      this.props.navigation.navigate("CreateProfilePage");
    } catch (e) {
      alert(e);
    }
  };
};
