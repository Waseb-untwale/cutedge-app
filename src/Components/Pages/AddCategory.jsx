import React, { useState, useEffect } from 'react';
import './AddCategory.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', slug: '' });
  const [error, setError] = useState(''); // For error messages
  const [isEditing, setIsEditing] = useState(false); // Track if we are editing a category

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://dangal.gocoolcare.com/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      // If the name field changes, generate the slug by replacing spaces with hyphens
      const slugValue = value.replace(/\s+/g, '-').toLowerCase();
      setFormData({ ...formData, name: value, slug: slugValue });
    } else {
      // For other fields, just update the state
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission to create or update a category
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing
        ? `https://dangal.gocoolcare.com/api/categories/${formData._id}`
        : 'https://dangal.gocoolcare.com/api/categories';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchCategories(); // Refresh the categories list
        setFormData({ name: '', slug: '' }); // Reset the form
        setIsEditing(false); // Reset editing mode
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save category');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      setError('Error connecting to the server');
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://dangal.gocoolcare.com/api/categories/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchCategories(); // Refresh the categories list
      } else {
        console.error('Error deleting category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Handle edit action
  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      slug: category.slug,
      _id: category._id, // Include the ID for updating
    });
    setIsEditing(true); // Enable editing mode
  };

  return (
    <>
      <div className="AddBlog_header">{isEditing ? 'Edit Category' : 'Add Category'}</div>

      <form className="category-form" onSubmit={handleFormSubmit}>
        <div className="form_container">
          <div className="form_control">
            <label htmlFor="name">Category Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter category name"
            />
          </div>
          <div className="form_control">
            <label htmlFor="slug">Slug*</label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              placeholder="Enter slug"
            />
          </div>
          <div className="Save_control text-center">
            <button type="submit">{isEditing ? 'Update' : 'Save'}</button>
          </div>
        </div>
      </form>

      {error && <p className="error-message">{error}</p>} {/* Display error message */}

      <div className="addCategory">
        <div className="Table px-5 py-2">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Category</th>
                <th>Slug</th>
                <th>status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>{category.slug}</td>
                  <td><span className='categoryStatus' style={{display:"flex",gap:"5px",alignItems:'center',justifyContent:"center"}}>
                    <span style={{display:'inline-block',height:"7px",width:"7px",borderRadius:
                    "50%",backgroundColor:"green"
                  }}></span>{category.status}</span></td>
                  <td>   
                    <i  onClick={() => handleEdit(category)}>
                      <FaEdit />
                    </i>
                    <i
                      className="icon-button"
                      onClick={() => handleDelete(category._id)}
                    >
                      <MdDelete />
                    </i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
