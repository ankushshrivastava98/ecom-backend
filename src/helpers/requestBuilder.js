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

function serverError500(res) {
    const errorMessage = "SERVER ERROR";
    res.status(500).json({
        message: errorMessage
    })
}



module.exports = { success200, created201, badRequest400, serverError500 }