import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';

const Filter = ({ setFilterCriteria }) => {
  // check is Between Dates are select to display date inputs
  const [isSelectDate, setIsSelectDate] = useState(false);
  // for mobile device toggle filter box
  const [showFilter, setShowFilter] = useState(false);

  // function to hide/show filter box
  const handleToggleShowFilter = () => setShowFilter(!showFilter);

  // store criteria
  const [criteria, setCriteria] = useState({
    sortBy: '', // newToOld, oldToNew, selectDate
    dateRange: { startDate: '', endDate: '' },
    isPublished: '', // yes, no
  });

  // set criteria from user
  const handleSortChange = (e, value) => {
    setCriteria((prev) => ({
      ...prev,
      sortBy: value,
    }));
    // returns "true" if value is selectDate to display date inputs
    setIsSelectDate(value === 'selectDate');
  };

  // date range is handled
  const handleDateChange = (key, value) => {
    setCriteria((prev) => ({
      ...prev,
      dateRange: { ...prev.dateRange, [key]: value },
    }));
  };

  // set published is "yes" or "no"
  const handlePublishedChange = (value) => {
    setCriteria((prev) => ({
      ...prev,
      isPublished: value,
    }));
  };

  // when apply button is trigger then finally setFilterCriteria
  const applyFilters = () => setFilterCriteria(criteria);

  // when clear button trigger then search all criterias
  const clearFilters = () => {
    setCriteria({
      sortBy: '',
      dateRange: { startDate: '', endDate: '' },
      isPublished: '',
    });
    setFilterCriteria({
      sortBy: '',
      dateRange: { startDate: '', endDate: '' },
      isPublished: '',
    });
    // hidden dates
    setIsSelectDate(false);

    // Reset all states related to radio buttons
    document.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.checked = false;
    });
  };

  return (
    <>
      <div className="h-fit lg:sticky top-10 bg-slate-100/50 py-2 px-4 max-lg:px-2 rounded-lg text-sm md:text-base max-lg:w-3/4 max-lg:mx-auto border border-black">
        <div className="flex justify-between">
          <h3 className="text-lg md:text-xl font-semibold">Advanced Filter</h3>
          {/* for mobile device show and hide button  */}
          <span onClick={handleToggleShowFilter} className="lg:hidden cursor-pointer underline">
            {showFilter ? 'Hide' : 'Show'}
          </span>
        </div>

        <div
          className={`overflow-hidden px-2 max-lg:px-1 duration-300 transition-all ${showFilter ? 'max-sm:max-h-[500px] max-sm:opacity-100 max-sm:scale-100' : 'max-sm:max-h-0 max-sm:opacity-0 max-sm:scale-95'
            }`}
        >
          <div className="">
            {/* Sort */}
            <div className="mb-3">
              <h5 className="text-base md:text-lg">Sort By</h5>
              {/* Newest to Oldest */}
              <div className="cursor-pointer flex">
                <Form.Check
                  className="px-2 cursor-pointer"
                  name="sort"
                  id="newToOld"
                  type="radio"
                  onChange={(e) => handleSortChange(e, 'newToOld')}
                />
                <label htmlFor="newToOld" className="cursor-pointer">
                  Newest to Oldest
                </label>
              </div>
              {/* Oldest to Newest */}
              <div className="cursor-pointer flex">
                <Form.Check
                  className="px-2 cursor-pointer"
                  name="sort"
                  id="OldTonew"
                  type="radio"
                  onChange={(e) => handleSortChange(e, 'oldToNew')}
                />
                <label htmlFor="OldTonew" className="cursor-pointer">
                  Oldest to Newest
                </label>
              </div>
              {/* Select Dates */}
              <div className="">
                <div className="cursor-pointer flex">
                  <Form.Check
                    className="px-2 cursor-pointer"
                    name="sort"
                    id="selectDate"
                    type="radio"
                    onChange={(e) => handleSortChange(e, 'selectDate')}
                  />
                  <label htmlFor="selectDate" className="cursor-pointer">
                    Between Dates
                  </label>
                </div>
                {/* Dates Input  */}
                {isSelectDate && (
                  <table className="mx-7">
                    <tbody>
                      <tr className="space-y-4">
                        <td className="pr-4 max-lg:px-2">
                          <label htmlFor="startDate">Start Date:</label>
                        </td>
                        <td>
                          <Form.Control
                            className="outline-none"
                            type="date"
                            id="startDate"
                            onChange={(e) => handleDateChange('startDate', e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr className="space-y-4">
                        <td className="pr-4 max-lg:px-2">
                          <label htmlFor="endDate">End Date:</label>
                        </td>
                        <td>
                          <Form.Control
                            className="outline-none"
                            type="date"
                            id="endDate"
                            onChange={(e) => handleDateChange('endDate', e.target.value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* isPublished */}
            <div className="">
              <h5 className="text-base md:text-lg">Published?</h5>
              <div className="cursor-pointer flex">
                <Form.Check
                  className="px-2 cursor-pointer"
                  name="published"
                  id="yes"
                  type="radio"
                  onChange={() => handlePublishedChange('yes')}
                />
                <label htmlFor="yes" className="cursor-pointer">
                  Yes
                </label>
              </div>
              <div className="cursor-pointer flex">
                <Form.Check
                  className="px-2 cursor-pointer"
                  name="published"
                  id="no"
                  type="radio"
                  onChange={() => handlePublishedChange('no')}
                />
                <label htmlFor="no" className="cursor-pointer">
                  No
                </label>
              </div>
            </div>
          </div>
          {/* Buttons  */}
          <div className="w-full py-3 flex justify-evenly gap-4 max-lg:flex-col">
            {/* clear */}
            <button
              onClick={clearFilters}
              className="bg-slate-400 text-white px-6 py-1 rounded-md border border-black hover:bg-slate-600 duration-300 ease-in-out outline-none"
            >
              Clear
            </button>
            {/* apply */}
            <button
              onClick={applyFilters}
              className="bg-green-500 text-white px-6 py-1 rounded-md border border-black hover:bg-green-700 duration-300 ease-in-out outline-none"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Filter
