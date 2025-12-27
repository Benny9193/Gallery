import './PhotoGrid.css';

const PhotoGrid = ({ photos, onPhotoClick, onToggleFavorite, onDeletePhoto }) => {
  return (
    <div className="photo-grid">
      {photos.length === 0 ? (
        <div className="no-results">
          <p>No photos found. Try a different search or category.</p>
        </div>
      ) : (
        photos.map((photo) => (
          <div
            key={photo.id}
            className="photo-card"
            onClick={() => onPhotoClick(photo)}
          >
            <img
              src={photo.thumbnail}
              alt={photo.title}
              loading="lazy"
              className="photo-img"
            />
            <div className="photo-overlay">
              <div className="overlay-actions">
                <button
                  className={`action-btn favorite-btn ${photo.isFavorite ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(photo.id);
                  }}
                  title={photo.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {photo.isFavorite ? '❤️' : '🤍'}
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePhoto(photo.id);
                  }}
                  title="Delete photo"
                >
                  🗑️
                </button>
              </div>
              <h3 className="photo-title">{photo.title}</h3>
              <div className="photo-tags">
                {photo.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PhotoGrid;
