export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(user, token) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { user, token },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function setLoading(status) {
  return {
    type: '@auth/SET_LOADING',
    payload: status,
  };
}

export function signUpRequest(name, email, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {
      name,
      email,
      password,
    },
  };
}