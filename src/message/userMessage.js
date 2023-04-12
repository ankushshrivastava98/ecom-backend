const EMAIL_TAKEN = {
    heading: "Email is registered",
    description: "Please check your email because it is already registered."
}

const SIGNUP = {
    heading: "Account created",
    description: "Siggned up successfully"
}
const LOGIN = {
    heading: "LOGGED IN",
    description: "Siggned in successfully"
}
const INVALID_EMAIL_FORMAT = {
    heading: "Invalid email",
    description: "Please enter valid email address!"
}

const INVALID_CREDENTIALS = {
    heading: "Invalid credentials",
    description: "Incorrect email or password."
}

const EMAIL_NOT_FOUND = {
    heading: "User not found",
    description: "Please check your email address!"
}
const VERIFICATION_EMAIL_SENT = {
    heading: "Confirmation email",
    description: "Please check your email to confirm and login into your account."
}

const INFORMATION_LIMIT = {
    heading: "Sorry",
    description: "Can not add new delivery information, Please delete one existing to add new"
}
const AUTHORIZED = "Authorized user"
const UNAUTHORIZED = "Unauthorized user"
const TOKEN_REQUIRED = "A token is required for authentication"

module.exports = { EMAIL_TAKEN, SIGNUP, LOGIN, INVALID_EMAIL_FORMAT, INVALID_CREDENTIALS, EMAIL_NOT_FOUND, AUTHORIZED, UNAUTHORIZED, TOKEN_REQUIRED, INFORMATION_LIMIT }