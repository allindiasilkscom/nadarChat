const postModel = require("../models/postModel");

const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "please Add the Field",
      });
    }

    const post = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    }).save();
    res.status(201).send({
      success: true,
      message: "Post Created successfully",
      post,
    });
    
  } catch (error) {
    
    res.status(500).send({
      success: true,
      message: "error in Create Post API",
      error,
    });
  }
};

const getAllPostController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Post Data",
      posts,
    });
  } catch (error) {
   
    res.status(500).send({
      success: false,
      message: "error In get all post ",
      error,
    });
  }
};
const getUserPostController = async (req, res) => {
  try {
    const userPosts = await postModel.find({ postedBy: req.auth._id });
    res.status(200).send({
      success: true,
      message: "user Posts",
      userPosts,
    });
  } catch (error) {
   
    return res.status(500).send({
      success: false,
      message: "Error In User Post API",
      error,
    });
  }
};

const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Your Post Been Deleted",
    });
  } catch (error) {
    
    res.status(500).send({
      success: false,
      message: "error in delete Post Api",
    });
  }
};

const updatePostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = await postModel.findById({ _id: req.params.id });
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please provide the Post title",
      });
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: title || post?.title,
        description: description || post?.description,
      },
      { new: true }
    );
    res.status(200).send({
      success:true,
      message:"Post updated Succesfully",
      updatedPost,
    })
  } catch (error) {
    
    res.status(500).send({
      success: false,
      message: "Error in Update Post API",
      error,
    });
  }
};
module.exports = {
  createPostController,
  getAllPostController,
  getUserPostController,
  deletePostController,
  updatePostController,
};
