import React, { useState, useEffect } from 'react';
import Styles from './Category.module.css';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate for routing
import { TiPin } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { APIURL } from '../../utils/common';
import axios from 'axios'; // Import axios for API requests

const Category = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(2); // Items per page
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [blogEntries, setBlogEntries] = useState([]); 
  const [categories, setCategories] = useState([]); // Categories state
  const [selectedCategory, setSelectedCategory] = useState(''); // Selected category
  const navigate = useNavigate(); // For redirecting

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${APIURL}/api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch blogs based on selected category
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let url = `${APIURL}/api/blogs`;
        if (selectedCategory) {
          url += `?category=${selectedCategory}`; 
        }
        const response = await axios.get(url);
        
        // Fix the image path if necessary
        const updatedBlogs = response.data.map(blog => {
          blog.image = `${APIURL}${blog.image}`; 
          return blog;
        });

        setBlogEntries(updatedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [selectedCategory]);

  // Handle entries per page change
  const handleEntriesPerPageChange = (e) => {
    setEntriesPerPage(Math.max(1, Math.min(4, Number(e.target.value))));
    setCurrentPage(1);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  let filteredEntries = blogEntries.filter((entry) => {
    return (
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCategory || entry.category.toLowerCase() === selectedCategory.toLowerCase())
    );
  });
  

 

  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedEntries = filteredEntries.slice(startIndex, startIndex + entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle Blog Deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog post?');
    if (confirmDelete) {
      try {
        await axios.delete(`${APIURL}/api/deleteBlog/${id}`);
        // Remove deleted blog from the list without re-fetching
        setBlogEntries(blogEntries.filter(blog => blog._id !== id));
        alert('Blog post deleted successfully!');
      } catch (error) {
        console.error('Error deleting blog post:', error);
      }
    }
  };

  // Handle Edit
  const handleEdit = (id) => {
    navigate(`/blo/${id}`);  // Navigate to the edit blog page (make sure the route is set up)
  };

  return (
    <>
      <div className={`${Styles.Blog_header}`}>
        <p>All Blog</p>
        <Link to='/blo'>+ Add Blog</Link>
      </div>
      <div className={Styles.Blog_Entries}>
        <span>
          Show 
          <input 
            type="number" 
            value={entriesPerPage} 
            onChange={handleEntriesPerPageChange} 
            min="1" 
            max="10" 
            className={Styles.InputField}
          /> 
          entries
        </span>
        <div className={Styles.search}>
          <select 
            className={`${Styles.SelectInput}`} 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} // Update selected category
          >
            <option value="">Select a Category</option>
            {categories.map(category => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <input 
            type="text" 
            placeholder='Search'
            value={searchTerm}
            onChange={handleSearchChange}
            className={Styles.SearchInput}
          />
        </div>
      </div>
      
      <div className={Styles.Table}>
  <table>
    <thead>
      <tr>
        <th>S.No</th>
        <th>Title</th>
        <th>Category</th>
        <th>Image</th>
        <th>Date</th>
        <th>Pin</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {paginatedEntries.length === 0 ? (
        <tr>
          <td colSpan="7" className={Styles.NoItemsRow}>
          Sorry, no blogs found!<br></br>
          <p>Please check the spelling or try searching for something else</p>
          </td>
        </tr>
      ) : (
        paginatedEntries.map((entry, index) => (
          <tr key={entry._id}>
            <td>{startIndex + index + 1}</td>
            <td>{entry.title}</td>
            <td>{entry.category}</td>
            <td>
              <img 
                src={entry.image} 
                alt="Blog Entry" 
                className={Styles.Image} 
              />
            </td>
            <td>{new Date(entry.date).toLocaleDateString()}</td>
            <td><TiPin size={28} /></td>
            <td>
              <i onClick={() => handleEdit(entry._id)}><FaEdit /></i>
              <i onClick={() => handleDelete(entry._id)}><MdDelete /></i>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>


      <div className={Styles.Pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? Styles.ActivePage : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Category;
