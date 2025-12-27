// Sorting utility functions for photo gallery

export const sortPhotos = (photos, sortMethod) => {
  const photosCopy = [...photos];

  switch (sortMethod) {
    case 'date-newest':
      return photosCopy.sort((a, b) => {
        const dateA = a.dateAdded || a.id;
        const dateB = b.dateAdded || b.id;
        return dateB - dateA; // Newest first
      });

    case 'date-oldest':
      return photosCopy.sort((a, b) => {
        const dateA = a.dateAdded || a.id;
        const dateB = b.dateAdded || b.id;
        return dateA - dateB; // Oldest first
      });

    case 'title-asc':
      return photosCopy.sort((a, b) => {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      });

    case 'title-desc':
      return photosCopy.sort((a, b) => {
        return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
      });

    case 'favorites':
      return photosCopy.sort((a, b) => {
        // Favorited photos first
        if (a.isFavorite === b.isFavorite) {
          // If both favorited or both not favorited, sort by date
          const dateA = a.dateAdded || a.id;
          const dateB = b.dateAdded || b.id;
          return dateB - dateA;
        }
        return a.isFavorite ? -1 : 1;
      });

    default:
      return photosCopy;
  }
};
