export type Artist = {
  id: string;
  name: string;
  img?: [
    {
      height: number;
      url?: string;
      width: number;
    }
  ];
  popularity: number;
  genres?: string;
};
