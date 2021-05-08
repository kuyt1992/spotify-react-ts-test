export type TrackResponse = {
  href: string;
  items: [
    {
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
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      preview_url: string;
      track_number: number;
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
