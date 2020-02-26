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
  register: {
    success: 'You have been successfully registered.',
    failure: 'Registration failed.'
  },
  activation: {
    success: 'Your account has been activated!',
    failure: 'URL is invalid'
  }
}

export const transMailers = {
  activation: {
    subject: 'Account activation'
  }
}
