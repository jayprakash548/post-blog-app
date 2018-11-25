let nameMiddlewareFunction = (req, res, next) =>{
    req.user = {'firstName': 'Jay Prakash', 'lastName': 'Kumar' }
    next();
}
module.exports = {
    nameMiddlewareFunction: nameMiddlewareFunction
}