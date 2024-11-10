import React from 'react';
import './AddCategory.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const AddCategory = () => {
  return (
   <>
      <div className="AddBlog_header">
        Add Category
      </div>

      <form className="category-form">
        <div className="form_container">
          <div className="form_control">
            <label htmlFor="name">Category Name</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="form_control">
            <label htmlFor="slug">Slug*</label>
            <input type="text" id="slug" name="slug" />
          </div>
          <div className="Save_control text-center">
           Save
          </div>
        </div>
      </form>
      <div classname="addCategory">
      <div className="Table  px-5 py-2">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>01</td>
                <td>Latest News</td>
                <td><span>Active</span></td>
                <td> <i><FaEdit /></i>
                <i><MdDelete /></i></td>
              </tr>
              <tr>
                <td>02</td>
                <td>Paralympics 2024</td>
                <td><span>Active</span></td>
                <td> <i><FaEdit /></i>
                <i><MdDelete /></i></td>
              </tr>
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
}

export default AddCategory;
