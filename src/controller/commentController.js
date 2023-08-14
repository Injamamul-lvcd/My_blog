const fs=require('fs');
const express=require('express');
const CommentModel= require('../model/Comment');
const responseLib=require('../libs/responseLib');

// Create a new comment
let createComment = async (req, res) => {
  try {
    const article =req.params.id;
    const author=req.user._id;
    const comment = new CommentModel({
      content:req.body.content,
      article:article,
      author:author
    });
    await comment.save();
    res.status(201).json(responseLib.generate(false,"Comment created",comment));
  } catch (error) {
    res.status(500).json(responseLib.generate(true,error.message,null));
  }
};

// Get all comments for an article
let getCommentsByArticle = async (req, res) => {
  try {
    const articleId = req.params.articleId;
    const comments = await Comment.find({ article: articleId });
    res.status(200).json(responseLib.generate(false,"The comments are following",comments));
  } catch (error) {
    res.status(500).json(responseLib.generate(true,error.message,null));
  }
};

// Update a comment
let updateComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { content } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );
    res.status(200).send(responseLib.generate(false,"Comment updated successfully",updatedComment));
  } catch (error) {
    res.status(500).json(responseLib.generate(true, error.message,null));
  }
};

// Delete a comment
let deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    await Comment.findByIdAndDelete(commentId);
    res.json(responseLib.generate(false,"comment deleted successfully",null));
  } catch (error) {
    res.status(500).json(responseLib.generate(true, error.message,null));
  }
};

module.exports = {
    createComment: createComment,
    getCommentsByArticle: getCommentsByArticle,
    updateComment: updateComment,
    deleteComment: deleteComment
}
