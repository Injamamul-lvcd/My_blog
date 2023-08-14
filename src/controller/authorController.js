const mongoose = require('mongoose');
const responseLib=require('../libs/responseLib');
const Article = require('../model/BlogPost');

// Controller actions for the author

// Create a new article
let createArticle = async (req, res) => {
  try {
    const { title, content} = req.body;
    const photo=req.file.path;
    const article = new Article.Post({ 
      title: title, 
      content:content, 
      author:req.user._id, 
      photo: photo 
    });
    await article.save();
    let apiResponse=responseLib.generate(false,"article saved successfully",article)
    res.status(201).send(apiResponse);
  } catch (error) {
    let apiResponse=responseLib.generate(true,error.message,null);
    res.status(500).send(apiResponse);
  }
};

// Get all articles by the author
let getArticlesByAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const articles = await Article.Post.find({ author: authorId });
    res.status(200).json(responseLib.generate(false,null,articles));
  } catch (error) {
    res.status(500).json(responseLib.generate(true, error.message,null));
  }
};

//Get article by id
let getArticleById = async (req, res) => {
  try {
    const articleId = (req.params.id).toObject();
    const article = await Article.Post.findById(articleId);
    res.status(200).json(responseLib.generate(false,"the article fetch successfully", article));
  } catch (error) {
    res.status(500).json(responseLib.generate(true,error.message,null));
  }
};

// Update an article by the author
let updateArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const { title, content } = req.body;
    const article = Article.Post.findById(articleId);
      const updatedArticle = await Article.Post.findByIdAndUpdate(
        articleId,
        { title, content },
        { new: true });
      res.status(200).json(responseLib.generate(false,"updated successfully",updatedArticle));
  } catch (error) {
    res.status(500).json(responseLib.generate(true,error.message,null));
  }
};

// Delete an article by the author
let deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article =await Article.Post.findById(articleId);
    if(article.author===req.user._id)
    {
      await Article.Post.findByIdAndDelete(articleId);
      res.status(200).json(responseLib.generate(false,"deleted successfully",null));
    }
    else
      res.status(401).json(responseLib.generate(true,"You are not allowed to delete",null));
  } catch (error) {
    res.status(500).json(responseLib.generate(true,error.message,null));
  }
};

module.exports = {
    createArticle:createArticle,
    getArticlesByAuthor:getArticlesByAuthor,
    getArticleById:getArticleById,
    updateArticle:updateArticle,
    deleteArticle:deleteArticle
};
