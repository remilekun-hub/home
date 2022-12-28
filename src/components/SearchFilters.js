import React, { useState } from "react";
import { useRouter } from "next/router";
import { filterData, getFilterValues } from "../../util/FilterData";

function SearchFilters() {
  const router = useRouter();
  const [filters, setFilters] = useState(filterData);

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });
    router.push({ pathname: path, query });
  };

  return (
    <div className="flex flex-wrap justify-center p-3">
      {filters.map((filter) => (
        <label
          htmlFor="select"
          key={filter.queryName}
          className="mr-[3px] text-[14px]"
        >
          {filter.queryName}:
          <span>
            <select
              placeholder={filter.queryName}
              id="select"
              className="cursor-pointer border border-zinc-500 rounded-md text-sm mb-[15px] mx-[3px] p-[3px]"
              onChange={(e) =>
                searchProperties({ [filter.queryName]: e.target.value })
              }
            >
              {filter?.items?.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </span>
        </label>
      ))}
    </div>
  );
}

export default SearchFilters;
