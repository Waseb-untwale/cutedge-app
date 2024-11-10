import React from 'react';
import ReactQuill from 'react-quill';
// import '../node_modules/react-quill/dist/quill.snow.css'
import '../../../node_modules/react-quill/dist/quill.snow.css';
import { useState } from 'react';

const Blog = () => {
  const [body, setBody] = useState("");

  const handleBody = (value) => {
    setBody(value);
  };

  return (
    <>
      <div className="AddBlog_header">
         Add Blog
      </div>
      <div className="addBlog">
        <form action="">
          <div className="form_container">
            <div className="form_control">
              <label htmlFor="file">Photo*</label>
              <input
                type="file"
                id="file"
                name="first_name"
                className="p-0"
              />
            </div>
            <div className="form_control">
              <label htmlFor="Last_name">Select Category*</label>
              <input
                type="text"
                id="Last_name"
                name="Last_name"
                placeholder="Enter Last name..."
              />
            </div>
            <div className="form_control">
              <label htmlFor="title">Meta Title*</label>
              <input
                type="text"
                id="title"
                name="title"
              />
            </div>
            <div className="form_control">
              <label htmlFor="slug">Slug*</label>
              <input
                type="text"
                id="slug"
                name="slug"
              />
            </div>
            <div className="form_control">
              <label htmlFor="Date">Date*</label>
              <input
                type="Date"
                id="Date"
                name="Date"
              />
            </div>
            <div className="form_control">
              <label htmlFor="email">Meta Description*</label>
              <input
                type="text"
                id="email"
                name="email"
              />
            </div>
          </div>
        </form>
      </div>
      
      <div className="Text-Editor">
        <ReactQuill
          placeholder="Write your blog content here..."
          modules={modules}
          formats={formats}
          onChange={handleBody}
          value={body}
        />
      </div>
      <div className='text-center save-btn'>
      save
      </div>
    </>
  );
};

// Define modules and formats outside of the component (no need for App)
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];

export default Blog;
