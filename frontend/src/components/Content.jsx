import React, { useState } from 'react';

const Content = ({ blogsData, searchText, searchCondition, filterCriteria }) => {
  // current page for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // set limit per page entries
  const blogsPerPage = 10;

  // retrive filterCriteria from 'Filter.jsx'
  const { sortBy, dateRange, isPublished } = filterCriteria;

  // Date & Time formatted of Blogs 
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    // get hours, minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // format Time as "04:35"
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    // get date, month
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100; // get year last 2 digit only
    // format Date as "06/12/2024"
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

    return `${formattedTime} ${formattedDate}`;
  };

  // filter blogs based on applied filter if any
  const filterBlogs = () => {
    let filteredBlogs = blogsData;

    // Search Text Filter
    if (searchText) {
      filteredBlogs = filteredBlogs.filter((blog) => {
        if (searchCondition === 'all') {
          //search in all
          return (
            blog.title?.toLowerCase().includes(searchText.toLowerCase()) ||
            blog.content?.toLowerCase().includes(searchText.toLowerCase()) ||
            blog.author?.toLowerCase().includes(searchText.toLowerCase()) ||
            blog.tags?.some((tag) =>
              tag.toLowerCase().includes(searchText.toLowerCase())
            )
          );
        } else if (searchCondition === 'title') {
          //search by title only
          return blog.title?.toLowerCase().includes(searchText.toLowerCase());
        } else if (searchCondition === 'content') {
          //search by content only
          return blog.content?.toLowerCase().includes(searchText.toLowerCase());
        } else if (searchCondition === 'author') {
          //search by author only
          return blog.author?.toLowerCase().includes(searchText.toLowerCase());
        } else if (searchCondition === 'tags') {
          //search related tags only
          return blog.tags?.some((tag) =>
            tag.toLowerCase().includes(searchText.toLowerCase())
          );
        }
        return false;
      });
    }

    // Published Filter
    if (isPublished) {
      filteredBlogs = filteredBlogs.filter((blog) =>
        isPublished === 'yes' ? blog.isPublished : !blog.isPublished
      );
    }

    // Date Range Filter
    if (sortBy === 'selectDate' && dateRange.startDate && dateRange.endDate) {
      filteredBlogs = filteredBlogs.filter((blog) => {
        const createdAt = new Date(blog.createdAt);
        return (
          createdAt >= new Date(dateRange.startDate) &&
          createdAt <= new Date(dateRange.endDate)
        );
      });
    }

    // Sort Filter
    if (sortBy === 'newToOld')
      filteredBlogs = filteredBlogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (sortBy === 'oldToNew')
      filteredBlogs = filteredBlogs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));


    return filteredBlogs;
  };

  const filteredBlogs = filterBlogs();

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

  // on page chneg
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="col-span-3 flex flex-col gap-4">
      {filteredBlogs.length === 0 ? (
        <h1>No Data Found!</h1>
      ) : (
        currentBlogs.map((blogData, index) => (
          <div
            key={index}
            className="py-2 px-4 bg-slate-300/50 rounded-md border"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl">{blogData?.title}</h2>
              <div className="flex justify-between max-sm:flex-col">
                <div className="flex items-start gap-1 text-sm">
                  {blogData?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-1.5 py-0.5 bg-white rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="italic max-sm:text-right">- {blogData?.author}</span>
              </div>
            </div>
            <div>
              <p className="py-2">{blogData?.content}</p>
              <div className="flex max-sm:flex-col justify-around">
                <div>
                  <span className="px-1 font-bold">Published?</span>
                  <span className="px-1 font-semibold text-gray-200">
                    {blogData?.isPublished ? 'Yes' : 'No'}
                  </span>
                </div>
                <div>
                  <span className="px-1 font-bold">Created On:</span>
                  <span className="px-1 font-semibold text-gray-200">
                    {formatDateTime(blogData?.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {/* Pagination Controls */}
      {filteredBlogs.length > blogsPerPage && (
        <div className="flex justify-center flex-wrap gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 mx-1 rounded-md ${currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
                }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Content;
