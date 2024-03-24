// import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import { useEffect, useState } from "react";
import "../posts/posts.scss";
import dataApi from "../../api/dataApi";
import Pagination from "../pagination/Pagination";
import FilterForm from "../filterForm/FilterForm";
import TagsForm from "../tagsForm/TagsForm";
import AddPost from "../addPost/AddPost";
export default function Posts() {
  const [post, setPosts] = useState([
    { description: 1, id: 2, tags: [1, 2, 3], title: 4 },
    { description: 1, id: 2, tags: [1, 2, 3], title: 4 },
    { description: 1, id: 2, tags: [1, 2, 3], title: 4 },
    { description: 1, id: 2, tags: [1, 2, 3], title: 4 },
    { description: 1, id: 2, tags: [1, 2, 3], title: 4 },
    { description: 1, id: 2, tags: [1, 2, 3], title: 4 },
    { description: 1, id: 2, tags: [1, 2, 3], title: 4 },
  ]);
  console.log(post);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [filter, setFilter] = useState({
    tags: "",
    page: 1,
    title: "",
  });
  useEffect(() => {
    const getPosts = async (filter) => {
      const posts = await dataApi.getPosts(filter);
      setPosts(posts.posts);
      setLoading(false);
      delete posts.posts;
      setPagination({ ...posts });
    };
    // getPosts(filter);
  }, [filter]);

  const handlePageChange = (newPage) => {
    setFilter({ ...filter, page: newPage });
  };

  const handleFilter = (value) => {
    setFilter({ ...filter, page: 1, title: value.searchTitle });
  };
  const handleTagsChange = (value) => {
    setFilter({ tags: value });
  };
  return (
    <div className="container">
      <div className="control">
        <AddPost />
        <div className="filter">
          <FilterForm onSubmit={handleFilter} />
          <TagsForm onSubmit={handleTagsChange} />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Tag</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            post.map(({ description, id, tags, title }, index) => (
              <tr key={index}>
                <td data-label="Id">{id}</td>
                <td data-label="Title">{title}</td>
                <td data-label="Description">{description}</td>
                <td data-label="Tags">{tags?.join(", ")}</td>
                <td data-label="Actions">
                  <span>
                    <FaRegTrashAlt size={15} />
                  </span>
                  <span>
                    <MdEdit size={15} />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}
