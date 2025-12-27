import './SearchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories, sortBy, setSortBy, showFavoritesOnly, setShowFavoritesOnly }) => {
  return (
    <div className="search-bar">
      <div className="search-row">
        <input
          type="text"
          placeholder="Search photos by title, tags, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date-newest">Newest First</option>
          <option value="date-oldest">Oldest First</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="favorites">Most Favorited</option>
        </select>
      </div>

      <div className="filters-row">
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <button
          className={`favorites-toggle ${showFavoritesOnly ? 'active' : ''}`}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          {showFavoritesOnly ? '❤️ Favorites' : '🤍 All Photos'}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
