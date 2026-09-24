// Photos uploaded through the admin, resized automatically at build time.
//
// Content files store the upload's repo path (e.g.
// "/src/content/media/gallery/bouldering.jpeg"). These maps turn that path
// into a small, optimised WebP, so a 5MB phone photo never reaches visitors.
// Nothing to do by hand: any image dropped into these folders is picked up.

// Gallery columns are at most ~600px wide on a retina screen.
const gallery = import.meta.glob(
  '/src/content/media/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default', query: '?w=1200&format=webp&quality=78' },
);

// Headshots display as a small square; 3x covers high-density screens.
const leadership = import.meta.glob(
  '/src/content/media/leadership/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default', query: '?w=240&h=240&fit=cover&format=webp&quality=80' },
);

/** Optimised URL for a gallery upload, or null if the file is missing. */
export const galleryImage = (path) => (path && gallery[path]) || null;

/** Optimised URL for a headshot, or null if none is set or the file is missing. */
export const leadershipPhoto = (path) => (path && leadership[path]) || null;
