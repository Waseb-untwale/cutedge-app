import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import '../../../node_modules/react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { APIURL } from '../../utils/common';

const Blog = () => {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [errors, setErrors] = useState({}); // Initialize errors as an empty object.

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${APIURL}/api/categories`);
        if (response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch blog details if editing
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`${APIURL}/api/getBlogById/${id}`);
        if (response.data) {
          const blog = response.data;
          setTitle(blog.title);
          const text = blog.title;
          const result = text.replace(/\s+/g, '-');
          setSlug(result);
          setCategory(blog.category);
          setDescription(blog.description);
          setDate(blog.date);
          setBody(blog.body);
        }
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };

    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  const handleBody = (value) => {
    setBody(value);
    setErrors((prev) => ({ ...prev, body: '' })); // Clear body error on input change.
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setErrors((prev) => ({ ...prev, image: '' })); // Clear image error on input change.
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    setErrors((prev) => ({ ...prev, title: '' })); // Clear title error on input change.

    // Replace spaces with hyphens to form the slug
    const slugValue = value.replace(/\s+/g, '-').toLowerCase();
    setSlug(slugValue);
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!title) {
      formErrors.title = 'Title is required.';
      isValid = false;
    }

    if (!slug) {
      formErrors.slug = 'Slug is required.';
      isValid = false;
    }

    if (!category) {
      formErrors.category = 'Category is required.';
      isValid = false;
    }

    if (!description) {
      formErrors.description = 'Description is required.';
      isValid = false;
    }

    if (!date) {
      formErrors.date = 'Date is required.';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      return; // Do not submit if form is invalid
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('category', isNewCategory ? newCategory : category);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('body', body);
    formData.append('isNewCategory', isNewCategory);

    try {
      let response;
      if (id) {
        response = await axios.put(`${APIURL}/api/update-blog/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await axios.post(`${APIURL}/api/add-blog`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      alert('Blog post saved');
      setErrors({}); // Clear errors after successful submission.
      navigate('/Blog');
    } catch (error) {
      console.error('Error saving blog post:', error);
    }
  };

  return (
    <>
      <div className="AddBlog_header">{id ? 'Edit Blog' : 'Add Blog'}</div>
      <div className="addBlog">
        <form onSubmit={handleSubmit}>
          <div className="form_container">
            <div className="form_control">
              <label>Photo*</label>
              <input
                type="file"
                id="file"
                name="image"
                onChange={handleFileChange}
                className="p-0"
              />
              {errors.image && (
                <span className="error">{`**${errors.image}**`}</span>
              )}
            </div>

            <div className="form_control">
              <label htmlFor="category">Select Category*</label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setErrors((prev) => ({ ...prev, category: '' })); // Clear category error on change.
                }}
              >
                <option value="">Select a Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="error">{`**${errors.category}**`}</span>
              )}
            </div>

            <div className="form_control">
              <label htmlFor="title">Meta Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                placeholder="Enter Meta Title"
                onChange={handleTitleChange}
              />
              {errors.title && (
                <span className="error">{`**${errors.title}**`}</span>
              )}
            </div>

            <div className="form_control">
              <label htmlFor="slug">Slug*</label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={slug}
                placeholder="Enter Slug"
                onChange={(e) => setSlug(e.target.value)}
              />
              {errors.slug && (
                <span className="error">{`**${errors.slug}**`}</span>
              )}
            </div>

            <div className="form_control">
              <label htmlFor="date">Date*</label>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setErrors((prev) => ({ ...prev, date: '' })); // Clear date error on change.
                }}
              />
              {errors.date && (
                <span className="error">{`**${errors.date}**`}</span>
              )}
            </div>

            <div className="form_control">
              <label htmlFor="description">Meta Description*</label>
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                placeholder="Enter Meta Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors((prev) => ({ ...prev, description: '' })); // Clear description error on change.
                }}
              />
              {errors.description && (
                <span className="error">{`**${errors.description}**`}</span>
              )}
            </div>
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

          <div className="button-submit text-center save-btn">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block'],
  ],
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block',
];

export default Blog;
