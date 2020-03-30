import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <div>
      <input
        value={value}
        type="text"
        name="query"
        placeholder="Search..."
        className="form-control my-3"
        // style={{ marginBottom: 20 }}
        onChange={e => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default Search;
