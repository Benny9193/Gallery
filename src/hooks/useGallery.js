import { useState, useEffect } from 'react';
import { samplePhotos } from '../data/samplePhotos';
import { initializePhotos, savePhotos, getSortPreference, saveSortPreference, getShowFavoritesOnly, saveShowFavoritesOnly } from '../utils/localStorage';
import { sortPhotos as sortPhotosUtil } from '../utils/sorting';

export const useGallery = () => {
  const [photos, setPhotos] = useState(() => initializePhotos(samplePhotos));
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState(() => getSortPreference());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(() => getShowFavoritesOnly());

  // Save photos to localStorage whenever they change
  useEffect(() => {
    savePhotos(photos);
  }, [photos]);

  // Save sort preference whenever it changes
  useEffect(() => {
    saveSortPreference(sortBy);
  }, [sortBy]);

  // Save favorites filter state whenever it changes
  useEffect(() => {
    saveShowFavoritesOnly(showFavoritesOnly);
  }, [showFavoritesOnly]);

  // Filter and sort photos
  useEffect(() => {
    let result = photos;

    // 1. Filter by favorites (if enabled)
    if (showFavoritesOnly) {
      result = result.filter(photo => photo.isFavorite);
    }

    // 2. Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(photo => photo.category === selectedCategory);
    }

    // 3. Filter by search term
    if (searchTerm) {
      result = result.filter(photo =>
        photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        photo.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 4. Apply sorting
    result = sortPhotosUtil(result, sortBy);

    setFilteredPhotos(result);
  }, [photos, searchTerm, selectedCategory, showFavoritesOnly, sortBy]);

  const addPhoto = (photo) => {
    const newPhoto = {
      ...photo,
      id: Date.now(),
      isFavorite: false,
      dateAdded: Date.now()
    };
    setPhotos([newPhoto, ...photos]);
  };

  const deletePhoto = (id) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  const toggleFavorite = (id) => {
    setPhotos(photos.map(photo =>
      photo.id === id
        ? { ...photo, isFavorite: !photo.isFavorite }
        : photo
    ));
  };

  return {
    photos: filteredPhotos,
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
  };
};
