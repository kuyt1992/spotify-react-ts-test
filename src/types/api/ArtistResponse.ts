export type ArtistResponse = {
  artists: {
    href: string;
    items: [
      {
        external_urls: {
          spotify: string;
        };
        genres?: Array<string>;
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
        popularity: number;
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
