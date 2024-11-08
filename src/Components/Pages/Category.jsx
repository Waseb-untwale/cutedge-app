import React, { useState } from 'react';
import Styles from './Category.module.css';
import { Link } from 'react-router-dom';

const Category = () => {
  const [entries, setEntries] = useState(1); // Start with minimum value of 1

  const handleChange = (e) => {
    const value = Math.max(1, Math.min(10, Number(e.target.value))); // Ensure value is between 1 and 10
    setEntries(value);
  };

  return (
    <>
      <div className={`${Styles.Blog_header}`}>
        <p>All Blog</p>
        <Link to='/Blog'>
          + Add Blog
        </Link>
      </div>
      <div className={Styles.Blog_Entries}>
        <span > 
          Show 
          <input 
            type="number" 
            value={entries} 
            onChange={handleChange} 
            min="1" 
            max="10" 
            className={Styles.InputField}
          /> 
          entries
        </span>
        <div className={Styles.search}>
        <select 
        className={` ${Styles.SelectInput}`}>
          <option value="">Select a Category</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="health">Health</option>
          <option value="education">Education</option>
        </select>
        <input type="text" placeholder='Search'/>
        </div>
      </div>
    </>
  );
};

export default Category;
