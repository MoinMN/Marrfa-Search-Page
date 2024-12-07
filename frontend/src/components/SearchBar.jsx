import React from 'react';
import Form from 'react-bootstrap/Form';

const SearchBar = ({ searchText, setSearchText, searchCondition, setSearchCondition }) => {
  // function when condtion changed from user
  const handleConditionChange = (e) => setSearchCondition(e.target.value);

  return (
    <div className="w-11/12 flex lg:w-2/3 text-sm md:text-base">
      {/* Search input box */}
      <input
        type="text"
        name="searchbar"
        placeholder={
          searchCondition === 'title'
            ? 'Find by title'
            : searchCondition === 'content'
              ? 'Search within content'
              : searchCondition === 'author'
                ? 'Look up by author'
                : searchCondition === 'tags'
                  ? 'Search tags (separate multiple tags with commas)'
                  : 'Search across all categories'
        }
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="outline-none w-full px-4 py-3 rounded-full rounded-r border-r border-gray-500"
      />
      {/* dropdown for conditional search  */}
      <Form.Select
        className="outline-none cursor-pointer px-4 rounded-full rounded-l max-sm:px-1"
        onChange={handleConditionChange}
      >
        <option value="all" defaultValue={true}>All</option>
        <option value="title">Title</option>
        <option value="content">Content</option>
        <option value="author">Author</option>
        <option value="tags">Tags</option>
      </Form.Select>
    </div>
  );
};

export default SearchBar;
