const express = require('express')
const mongoose = require('mongoose')
const shortid = require('short-id')//Imported Short ID to generate random ID
const appModel = mongoose.model('App');//Imported 'App' Model
const response = require('../libs/response')// Imported Libs

//function to create the blog
let createBlog = (req,res) =>{
    let today = Date.now()
    let blogId = shortid.generate();

    let newBlog = new appModel({
        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.bodyHtml,        
        isPublished: true,
        category: req.body.category,
        author: req.body.author,
        created: today,
        lastModified: today
    })// end new blog model
    let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
    newBlog.tags = tags

    newBlog.save((err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(result)
        }
    }) // end new blog save
}//End to create the blog
//Function get all blogs
let getAllBlog = (req, res) =>{
    appModel.find()
    .select('-__v -__id')// Find by Universal ID
    .lean()
    .exec((err, result) =>{
        if(err){
            console.log(err)
            res.send(err)
        } else if(result == undefined || result ==null || result ==''){
            console.log('No Blog Found!')
            res.send('No Blog Found!')
        }else{
            res.send(result)
        }
    })
} //end get all blogs

//function to read single blog by ID
let viewByBlogId = (req, res) =>{
    console.log(req.user)
    appModel.findOne({ 'blogId': req.params.blogId }, (err, result) =>{
            if(err){
                console.log(err)
                res.send(err)
            }else if(result == undefined || result ==null || result == ''){
                console.log('No Blog Found')
                res.send('No Blog Found')
            }else{
                res.send(result)
            }
        })
}//End to read single blog by ID

//function to read single blog by Author
let viewByBlogAuthor = (req, res) =>{
    appModel.findOne({ 'author': req.params.author }, (err, result) =>{
            if(err){
                console.log(err)
                res.send(err)
            }else if(result == undefined || result ==null || result == ''){
                console.log('No Blog Found')
                res.send('No Blog Found')
            }else{
                res.send(result)
            }
        })
} //End to read single blog by Author

//function to read single blog by Category
let viewByBlogcategory = (req, res) =>{
    appModel.findOne({ 'category': req.params.category }, (err, result) =>{
            if(err){
                console.log(err)
                res.send(err)
            }else if(result == undefined || result ==null || result == ''){
                console.log('No Blog Found')
                res.send('No Blog Found')
            }else{
                res.send(result)
            }
        })
} //End to read single blog by Category

//function to edit blog by admin
let editBlog = (req,res) =>{
    let options = req.body;
    console.log(options);
    appModel.update({ 'blogId': req.params.blogId }, options, { multi: true })
    .exec((err, result) =>{
        if(err){
            console.log(err)
            res.send(err)
        }else if(result == undefined || result == null || result == ''){
            console.log('No Blog Found')
            res.send('No Blog Found')
        }else
        {
            res.send(result)
        }
    })
}//End edit blog by admin

//function to delete the assignment collection
let deleteBlog = (req, res) =>{
    appModel.remove({ 'blogId': req.params.blogId }, (err, result) =>{
            if(err){
                console.log(err)
                res.send(err)
            }else if (result == undefined || result == null || result == '') {
                console.log('No Blog Found')
                res.send("No Blog Found")
            } else {
                res.send(result)
            }
        })
}//End to delete the assignment collection

//function to increase views of a blog
let increaseBlogView = (req, res) => {
    appModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {            
            result.views += 1;
            result.save(function (err, result) {
                if (err) {
                    console.log(err)
                    res.send(err)
                }
                else {
                    console.log("Blog updated successfully")
                    res.send(result)

                }
            });// end result

        }
    })
}//function to increase views of a blog

module.exports = {
    createBlog: createBlog,
    getAllBlog: getAllBlog,
    viewByBlogId: viewByBlogId,
    viewByBlogAuthor: viewByBlogAuthor,
    viewByBlogcategory: viewByBlogcategory,
    editBlog: editBlog,
    deleteBlog: deleteBlog,
    increaseBlogView: increaseBlogView
}