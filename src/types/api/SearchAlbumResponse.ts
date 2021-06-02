export type SearchAlbumResponse = {
  albums: {
    href: string;
    items: [
      {
        album_group: string;
        album_type: string;
        artists: [
          {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }
        ];
        available_markets: Array<string>;
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        images?: [
          {
            height: number;
            url?: string;
            width: number;
          }
        ];
        name: string;
        release_date: string;
        release_date_precision: string;
        total_tracks: number;
        type: string;
        uri: string;
      }
    ];
    limit?: number;
    next?: string;
    offset?: number;
    previous?: string;
    total?: number;
  };
};
