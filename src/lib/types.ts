export interface Tour {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  rating: number;
  location: string;
  duration: string;
  priceSEK: number;
  category: string;
  availableFrom: string;
  availableTo: string;
  groupOfPeople: number;
  kids: string;
  activity: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  coordinates: { DD: { lat: number; lng: number } };
  description: Array<{
    type: string;
    children: Array<{ type: string; text: string }>;
  }>;
  shortDesc: string;
  imagePoster: { id: number; url: string };
  imageCover: { id: number; url: string };
  images: Array<{ id: number; url: string }>;
  localizations: any[];
}
