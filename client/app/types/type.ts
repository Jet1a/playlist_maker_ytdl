interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Author {
  id: string;
  name: string;
}

export type VideoDetail = {
  title: string;
  thumbnails: Thumbnail;
  author: Author;
};
