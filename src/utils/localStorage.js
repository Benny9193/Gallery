// localStorage utility functions for photo gallery

const STORAGE_KEYS = {
  PHOTOS: 'gallery_photos',
  SORT_PREFERENCE: 'gallery_sort_preference',
  SHOW_FAVORITES_ONLY: 'gallery_show_favorites_only'
};

export const getPhotos = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PHOTOS);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading photos from localStorage:', error);
    return null;
  }
};

export const savePhotos = (photos) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
    return true;
  } catch (error) {
    console.error('Error saving photos to localStorage:', error);
    if (error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded');
    }
    return false;
  }
};

export const getSortPreference = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SORT_PREFERENCE);
    return stored || 'date-newest';
  } catch (error) {
    console.error('Error loading sort preference:', error);
    return 'date-newest';
  }
};

export const saveSortPreference = (sortBy) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SORT_PREFERENCE, sortBy);
    return true;
  } catch (error) {
    console.error('Error saving sort preference:', error);
    return false;
  }
};

export const getShowFavoritesOnly = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SHOW_FAVORITES_ONLY);
    return stored === 'true';
  } catch (error) {
    console.error('Error loading favorites filter state:', error);
    return false;
  }
};

export const saveShowFavoritesOnly = (value) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SHOW_FAVORITES_ONLY, String(value));
    return true;
  } catch (error) {
    console.error('Error saving favorites filter state:', error);
    return false;
  }
};

export const initializePhotos = (samplePhotos) => {
  const stored = getPhotos();

  if (stored && stored.length > 0) {
    return stored;
  }

  // First time: initialize with sample photos
  const initialPhotos = samplePhotos.map(photo => ({
    ...photo,
    isFavorite: photo.isFavorite !== undefined ? photo.isFavorite : false,
    dateAdded: photo.dateAdded || photo.id
  }));

  savePhotos(initialPhotos);
  return initialPhotos;
};
