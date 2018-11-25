const express = require('express')
const appController = require('../controller/appController'); //Import Controller
const appConfig = require('../config/appConfig') //Import Config
const middleware = require('../middlewares/appMiddleware') //Import Middleware

//create a setRouter Function standard way
const setRouter = (app) =>{
    let baseUrl = appConfig.apiVersion + '/blog'
    app.post(baseUrl + '/create', appController.createBlog)
    app.get(baseUrl + '/all', appController.getAllBlog)
    app.get(baseUrl + '/view/:blogId', middleware.nameMiddlewareFunction, appController.viewByBlogId)
    app.get(baseUrl + '/view/by/author/:author', appController.viewByBlogAuthor)
    app.get(baseUrl + '/view/by/category/:category', appController.viewByBlogcategory)
    app.put(baseUrl + '/:blogId/edit', appController.editBlog) 
    app.post(baseUrl + '/:blogId/delete', appController.deleteBlog)       
    app.get(baseUrl + '/:blogId/count/view', appController.increaseBlogView)    
}//End setRouter Function

module.exports = {
    setRouter: setRouter
}