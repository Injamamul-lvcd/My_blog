/**
 * @purpose dkhlljl
 * @author Inja
 * @version 1.0
 * @createdBy inja
 * @created Date Jun 14 2023
 * @updated Date Jun 14 2023
 * @updated By Inja
 */

/* Import modules */
const mongoose = require('mongoose');
const responseLib=require('../libs/responseLib');
const check=require('../libs/checkLib');
const Article = require('../model/BlogPost');

// Controller actions for the admin


/**
 * Get all articles (including pending and approved)
 * @param {*} req JSON request Object { }
 * @param {*} res JSON response object 
 * 
 * 
 */
let getAllArticles = async (req, res) => {
  try {
    let pageSize=2;
    let page=1;
    const articles = await Article.Post.find({}).limit(pageSize).skip(pageSize*page);
    res.status(200).json(responseLib.generate(false,"article fetch successfully",articles));
  } catch (error) {
    res.status(500).json(responseLib.generate(true,error.message,null));
  }
};

// Approve an article
let approveArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
      await Article.Post.findByIdAndUpdate(articleId,{approved:true});
      res.status(200).json(responseLib.generate(false,"approved successfully",articleId));
  } catch (error) {
      res.status(500).json(responseLib.generate(true,error.message,null));
  }
};

// Delete an article
let deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    if(req.user.role==='admin'){
      await Article.Post.findByIdAndDelete(articleId);
      res.status(200).json(responseLib.generate(false,"deleted successfully",null));
    }
    else
      throw new Error("You don't have permission to delete");
  } catch (error) {
      res.status(500).json(responseLib.generate(true,error.message,null));
  }
};

module.exports = {
    getAllArticles: getAllArticles,
    approveArticle:approveArticle,
    deleteArticle: deleteArticle
}