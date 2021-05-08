export type ArtistsAlbum = {
  id: string;
  name: string;
  images?: [
    {
      height: number;
      url?: string;
      width: number;
    }
  ];
  release_date: string;
  album_group: string;
  album_type: string;
  href: string;
  total_tracks: number;
};
