let generate = (err, message, status, data) =>{
    let response = {
        error: err,
        message: message,
        status: status,
        data: data
    }
    return Response
}
module.exports = {
    generate: generate
}