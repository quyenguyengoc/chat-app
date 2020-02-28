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
    blank: 'Please enter required information!'
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
      notActived: 'your account has not been activated yet!'
    }
  }
}

export const transMailers = {
  activation: {
    subject: 'Account activation'
  }
}
