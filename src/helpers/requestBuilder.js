const { SERVER_ERROR } = require("../message/common");

function success200(res, message, data) {
    res.status(200).json({ message, ...data });
}

function created201(res, message, data) {
    res.status(201).json({ message, ...data });
}

function badRequest400(res, message) {
    res.status(400).json({
        message,
    })
}
function unauthorized401(res, message) {
    res.status(401).json({
        message,
    })
}
function serverError500(res, customMessage) {
    res.status(500).json({
        message: customMessage || SERVER_ERROR
    })
}



module.exports = { success200, created201, badRequest400, unauthorized401, serverError500 }