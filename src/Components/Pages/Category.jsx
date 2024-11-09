import React, { useState } from 'react';
import Styles from './Category.module.css';
import { Link } from 'react-router-dom';
import EntryImg from '../../Images/Entries_image.png';
import { TiPin } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Category = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(2); // Items per page
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  // Sample data for blog entries
  const blogEntries = [
    { id: 1, title: "State-wise distribution...", category: "Shooting", date: "27-09-2024", image: EntryImg },
    { id: 2, title: "The Future of Technology", category: "Technology", date: "15-08-2024", image: EntryImg },
    { id: 3, title: "Business Strategies", category: "Business", date: "10-07-2024", image: EntryImg },
    { id: 4, title: "Health and Wellness", category: "Health", date: "05-06-2024", image: EntryImg },
    { id: 5, title: "Education Reforms", category: "Education", date: "01-05-2024", image: EntryImg },
    { id: 6, title: "New Tech Trends", category: "Technology", date: "02-04-2024", image: EntryImg },
    { id: 7, title: "Business Growth", category: "Business", date: "20-03-2024", image: EntryImg },
    { id: 8, title: "Mindfulness Practices", category: "Health", date: "14-02-2024", image: EntryImg },
    { id: 9, title: "Higher Education Advances", category: "Education", date: "30-01-2024", image: EntryImg },
    { id: 10, title: "AI in Healthcare", category: "Technology", date: "15-01-2024", image: EntryImg },
    { id: 11, title: "State-wise distribution...", category: "Shooting", date: "27-09-2024", image: EntryImg },
    { id: 12, title: "The Future of Technology", category: "Technology", date: "15-08-2024", image: EntryImg },
    { id: 13, title: "Business Strategies", category: "Business", date: "10-07-2024", image: EntryImg },
    { id: 14, title: "Health and Wellness", category: "Health", date: "05-06-2024", image: EntryImg },
    { id: 15, title: "Education Reforms", category: "Education", date: "01-05-2024", image: EntryImg },
    { id: 16, title: "New Tech Trends", category: "Technology", date: "02-04-2024", image: EntryImg },
    { id: 17, title: "Business Growth", category: "Business", date: "20-03-2024", image: EntryImg },
    { id: 18, title: "Mindfulness Practices", category: "Health", date: "14-02-2024", image: EntryImg },
    { id: 19, title: "Higher Education Advances", category: "Education", date: "30-01-2024", image: EntryImg },
    { id: 20, title: "AI in Healthcare", category: "Technology", date: "15-01-2024", image: EntryImg },
  ];

  const handleEntriesPerPageChange = (e) => {
    setEntriesPerPage(Math.max(1, Math.min(4, Number(e.target.value))));
    setCurrentPage(1); // Reset to the first page on change
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  // Filter entries by search term
  const filteredEntries = blogEntries.filter((entry) =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedEntries = filteredEntries.slice(startIndex, startIndex + entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className={`${Styles.Blog_header}`}>
        <p>All Blog</p>
        <Link to='/Blog'>+ Add Blog</Link>
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
          <select className={`${Styles.SelectInput}`}>
            <option value="">Select a Category</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
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
            {paginatedEntries.map((entry, index) => (
              <tr key={entry.id}>
                <td>{startIndex + index + 1}</td>
                <td>{entry.title}</td>
                <td>{entry.category}</td>
                <td><img src={entry.image} alt="Blog Entry" /></td>
                <td>{entry.date}</td>
                <td><TiPin size={28} /></td>
                <td>
                  <i><FaEdit /></i>
                  <i><MdDelete /></i>
                </td>
              </tr>
            ))}
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
