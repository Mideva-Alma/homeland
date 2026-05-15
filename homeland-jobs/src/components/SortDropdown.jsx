function SortDropdown({ sortOption, setSortOption }) {

    return (
  
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
  
        <option value="newest">Newest</option>
        <option value="budget-high">Budget High-Low</option>
        <option value="budget-low">Budget Low-High</option>
  
      </select>
    );
  }
  
  export default SortDropdown;