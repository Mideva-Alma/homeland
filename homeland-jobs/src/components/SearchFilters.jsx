function SearchFilters({ filters, setFilters }) {

    return (
  
      <section>
  
        <input
          type="text"
          placeholder="Search jobs"
          value={filters.search}
          onChange={(e) =>
            setFilters({
              ...filters,
              search: e.target.value
            })
          }
        />
  
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters({
              ...filters,
              category: e.target.value
            })
          }
        >
          <option value="">All Categories</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
        </select>
  
        <select
          value={filters.location}
          onChange={(e) =>
            setFilters({
              ...filters,
              location: e.target.value
            })
          }
        >
          <option value="">All Locations</option>
          <option value="Nairobi">Nairobi</option>
          <option value="Remote">Remote</option>
        </select>
  
        <input
          type="number"
          placeholder="Maximum Budget"
          value={filters.budget}
          onChange={(e) =>
            setFilters({
              ...filters,
              budget: e.target.value
            })
          }
        />
  
      </section>
    );
  }
  
  export default SearchFilters;