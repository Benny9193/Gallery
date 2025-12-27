import { useState } from 'react';
import { useGallery } from './hooks/useGallery';
import { categories } from './data/samplePhotos';
import SearchBar from './components/SearchBar';
import PhotoGrid from './components/PhotoGrid';
import Lightbox from './components/Lightbox';
import UploadForm from './components/UploadForm';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import './App.css';

function App() {
  const {
    photos,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    showFavoritesOnly,
    setShowFavoritesOnly,
    addPhoto,
    deletePhoto,
    toggleFavorite,
  } = useGallery();

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseLightbox = () => {
    setSelectedPhoto(null);
  };

  const handleNextPhoto = () => {
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
  };

  const handlePreviousPhoto = () => {
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    const previousIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[previousIndex]);
  };

  const handleUpload = (photo) => {
    addPhoto(photo);
  };

  const handleToggleFavorite = (id) => {
    toggleFavorite(id);
    // If currently viewing in lightbox, update selectedPhoto
    if (selectedPhoto?.id === id) {
      setSelectedPhoto({
        ...selectedPhoto,
        isFavorite: !selectedPhoto.isFavorite
      });
    }
  };

  const handleDeletePhoto = (id) => {
    const photo = photos.find(p => p.id === id);
    setPhotoToDelete({ id, title: photo?.title || 'this photo' });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    deletePhoto(photoToDelete.id);
    setShowDeleteConfirm(false);
    // Close lightbox if deleting current photo
    if (selectedPhoto?.id === photoToDelete.id) {
      setSelectedPhoto(null);
    }
    setPhotoToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setPhotoToDelete(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Photo Gallery</h1>
        <button
          className="upload-btn"
          onClick={() => setShowUploadForm(true)}
        >
          + Upload Photo
        </button>
      </header>

      <div className="app-container">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showFavoritesOnly={showFavoritesOnly}
          setShowFavoritesOnly={setShowFavoritesOnly}
        />

        <div className="photo-count">
          Showing {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
        </div>

        <PhotoGrid
          photos={photos}
          onPhotoClick={handlePhotoClick}
          onToggleFavorite={handleToggleFavorite}
          onDeletePhoto={handleDeletePhoto}
        />
      </div>

      {selectedPhoto && (
        <Lightbox
          photo={selectedPhoto}
          onClose={handleCloseLightbox}
          onNext={handleNextPhoto}
          onPrevious={handlePreviousPhoto}
          onToggleFavorite={handleToggleFavorite}
          onDeletePhoto={handleDeletePhoto}
        />
      )}

      {showUploadForm && (
        <UploadForm
          onUpload={handleUpload}
          onClose={() => setShowUploadForm(false)}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmModal
          isOpen={showDeleteConfirm}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          photoTitle={photoToDelete?.title}
        />
      )}
    </div>
  );
}

export default App;
