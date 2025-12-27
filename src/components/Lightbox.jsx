import { useEffect } from 'react';
import './Lightbox.css';

const Lightbox = ({ photo, onClose, onNext, onPrevious, onToggleFavorite, onDeletePhoto }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrevious]);

  if (!photo) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-header">
          <div className="lightbox-actions">
            <button
              className={`lightbox-action-btn lightbox-favorite ${photo.isFavorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(photo.id)}
              title={photo.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {photo.isFavorite ? '❤️ Favorited' : '🤍 Favorite'}
            </button>
            <button
              className="lightbox-action-btn lightbox-delete"
              onClick={() => onDeletePhoto(photo.id)}
              title="Delete photo"
            >
              🗑️ Delete
            </button>
          </div>
          <button className="lightbox-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <button className="lightbox-nav lightbox-prev" onClick={onPrevious}>
          ‹
        </button>

        <div className="lightbox-image-container">
          <img
            src={photo.url}
            alt={photo.title}
            className="lightbox-image"
          />
        </div>

        <button className="lightbox-nav lightbox-next" onClick={onNext}>
          ›
        </button>

        <div className="lightbox-info">
          <h2>{photo.title}</h2>
          <p>{photo.description}</p>
          <div className="lightbox-tags">
            {photo.tags.map((tag, index) => (
              <span key={index} className="lightbox-tag">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
