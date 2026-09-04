export const galleryCategories = ["study", "gathering", "hospitality", "teaching", "video"] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryImage = {
  id: string;
  type: "image";
  src: `/${string}`;
  width: number;
  height: number;
  category: GalleryCategory;
  featured?: boolean;
};

export type GalleryVideo = {
  id: string;
  type: "video";
  src: `/${string}`;
  poster: `/${string}`;
  width: number;
  height: number;
  category: "video";
};

export type GalleryItem = GalleryImage | GalleryVideo;

export const galleryImages: GalleryImage[] = [
  { id: "community-study", type: "image", src: "/media/gallery/community-study.webp", width: 1600, height: 900, category: "study", featured: true },
  { id: "hospitality", type: "image", src: "/media/gallery/hospitality.webp", width: 1200, height: 1600, category: "hospitality", featured: true },
  { id: "learning-together", type: "image", src: "/media/gallery/learning-together.webp", width: 1536, height: 864, category: "study", featured: true },
  { id: "weekly-gathering", type: "image", src: "/media/gallery/weekly-gathering.webp", width: 1600, height: 1200, category: "gathering", featured: true },
  { id: "shared-table", type: "image", src: "/media/gallery/shared-table.webp", width: 1600, height: 900, category: "hospitality" },
  { id: "study-partners", type: "image", src: "/media/gallery/study-partners.webp", width: 1600, height: 900, category: "study", featured: true },
  { id: "teaching-circle", type: "image", src: "/media/gallery/teaching-circle.webp", width: 1600, height: 900, category: "teaching" },
  { id: "full-room", type: "image", src: "/media/gallery/full-room.webp", width: 1600, height: 1200, category: "gathering", featured: true },
  { id: "torah-class", type: "image", src: "/media/gallery/torah-class.webp", width: 1600, height: 1200, category: "teaching" },
  { id: "gathering-wide", type: "image", src: "/media/gallery/gathering-wide.webp", width: 1600, height: 900, category: "gathering" },
  { id: "evening-class", type: "image", src: "/media/gallery/evening-class.webp", width: 1600, height: 1200, category: "teaching" },
  { id: "community-in-session", type: "image", src: "/media/gallery/community-in-session.webp", width: 1600, height: 1200, category: "gathering" }
];

export const galleryVideos: GalleryVideo[] = [
  { id: "community-arriving", type: "video", src: "/media/gallery/community-arriving.mp4", poster: "/media/gallery/community-arriving-poster.webp", width: 720, height: 1280, category: "video" },
  { id: "weekly-class", type: "video", src: "/media/gallery/weekly-class.mp4", poster: "/media/gallery/weekly-class-poster.webp", width: 720, height: 1280, category: "video" },
  { id: "learning-in-community", type: "video", src: "/media/gallery/learning-in-community.mp4", poster: "/media/gallery/learning-in-community-poster.webp", width: 720, height: 1280, category: "video" },
  { id: "room-in-session", type: "video", src: "/media/gallery/room-in-session.mp4", poster: "/media/gallery/room-in-session-poster.webp", width: 720, height: 1280, category: "video" }
];

export const galleryItems: GalleryItem[] = [...galleryImages, ...galleryVideos];
export const featuredGalleryImages = galleryImages.filter((item) => item.featured);
