import BlogModel from "../model/blog.model.js";


export const GetBlogs = async (req, res) => {
  try {
    // retrive all blogs data
    const blogs = await BlogModel.find();
    // send response
    return res.status(200).json(blogs);
  } catch (error) {
    // error handle
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}

export const AddBlogs = async (req, res) => {
  try {
    // retrive data sended from frontend
    const { title, content, author, tags, isPublished } = req.body;

    // validation
    if (!title || !content || !author) return res.status(403).json({ message: "Title, Content, Author Required!" });

    // create new object
    const newBlog = new BlogModel({ title, content, author, tags, isPublished });

    // save data
    const response = await newBlog.save();

    return res.status(200).json({ message: `Successfully Added ${response.title}` });
  } catch (error) {
    // error handle
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}

export const DeleteBlogs = async (req, res) => {
  try {
    // retrive data sended from frontend
    const { _id } = req.body;

    // validation
    if (!_id) return res.status(403).json({ message: "ID Required!" });

    // delete blog
    const response = await BlogModel.findByIdAndDelete(_id);

    return res.status(200).json({ message: `Successfully Deleted ${response.title}` });
  } catch (error) {
    // error handle
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}

