export const transModels = {
  users: {
    validation: {
      username: {
        blank: "Username is required.",
        uniq: "Username already in use."
      },
      password: {
        blank: "Password is required.",
        incorrect: "Password must contain at least 6 characters, including uppercase, lowercase letters and numbers."
      },
      passwordConfirmation: {
        notMatch: "Password confirmation does not match password."
      },
      fullname: {
        blank: "Fullname is required."
      },
      local: {
        email: {
          blank: "Email is required.",
          uniq: "Email already in use.",
          incorrect: "Email is invalid."
        }
      }
    }
  }
};

export const transMessages = {
  common: {
    blank: 'Please enter required information!',
    requireLogin: 'Please login first!',
    loggedIn: 'You are already logged in!',
    serverError: 'Something went wrong, please try again!',
  },
  register: {
    success: 'You have been successfully registered!',
    failure: 'Registration failed!'
  },
  activation: {
    success: 'Your account has been activated!',
    failure: 'URL is invalid!'
  },
  login: {
    validation: {
      loginid: {
        blank: "LoginID is required.",
      },
      pwd: {
        blank: "Password is required.",
      }
    },
    success: (fullname) => { return `Welcome ${fullname}!`; },
    failure: {
      invalid: 'Your information you entered is incorrect!',
      notActived: 'Your account has not been activated yet!',
      deleted: 'Your account has been disabled!'
    }
  },
  logout: {
    success: (fullname) => { return `See you again, ${fullname}`; }
  }
}

export const transMailers = {
  activation: {
    subject: 'Account activation'
  }
}
