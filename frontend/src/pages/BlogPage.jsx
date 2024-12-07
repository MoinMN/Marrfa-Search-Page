import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Content from '../components/Content';
import Filter from '../components/Filter.jsx';
import { GetBlogs } from '../api/blog.api.js';
import Loading from '../components/Loading.jsx';

const BlogPage = () => {
  // for data loading animation
  const [loading, setLoading] = useState(true);
  // blogs data store here
  const [blogsData, setBlogsData] = useState([]);
  // search text from user
  const [searchText, setSearchText] = useState('');
  // search condition
  const [searchCondition, setSearchCondition] = useState('all'); // all, title, tags, author or content
  // filter data store here
  const [filterCriteria, setFilterCriteria] = useState({
    sortBy: '', // newToOld, oldToNew, or selectDate
    dateRange: { startDate: '', endDate: '' },
    isPublished: '', // yes or no
  });

  // fetch data from backend
  useEffect(() => {
    GetBlogs()
      .then((res) => setBlogsData(res))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="flex flex-col flex-grow justify-center items-center py-8 max-sm:py-4 w-full">
        {/* Search Bar  */}
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          searchCondition={searchCondition}
          setSearchCondition={setSearchCondition}
        />
        <div className="grid grid-cols-4 gap-4 w-full py-4 px-3 md:py-8 max-lg:grid-cols-1">
          {/* Filter */}
          <Filter setFilterCriteria={setFilterCriteria} />
          {/* Content */}
          {loading
            ? (<Loading />)
            : (<Content
              blogsData={blogsData}
              searchText={searchText}
              searchCondition={searchCondition}
              filterCriteria={filterCriteria}
            />)
          }
        </div>
      </div>
    </>
  );
};

export default BlogPage;
