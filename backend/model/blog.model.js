import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,     // Makes the title field mandatory
    trim: true,         // Removes whitespace from start and end
    maxlength: 100,     // Restricts the title length
  },
  content: {
    type: String,
    required: true,     // Makes the content field mandatory
  },
  author: {
    type: String,
    required: true,     // Requires the author field
  },
  tags: {
    type: [String],     // An array of strings for categorization
    default: [],        // Default value if no tags are provided
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically sets the current date
  },
  isPublished: {
    type: Boolean,
    default: false,     // Indicates if the blog is published
  },
}, { timestamps: true, }    // Automatically adds `createdAt` and `updatedAt` fields
);

export default mongoose.model("Blog", BlogSchema);
