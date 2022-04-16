export interface ImageAttributesEntry {
  url: string;
  caption: string;
  name: string;
}
export interface ImageEntry {
  data: {
    attributes: ImageAttributesEntry;
  }[];
}
