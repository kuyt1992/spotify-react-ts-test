import axios from "axios";
import { useState } from "react";

import { ArtistsAlbum } from "../types/ArtistsAlbum";
import { ArtistsAlbumsResponse } from "../types/api/ArtistsAlbumsResponse";

export const useSetArtistsAlbums = () => {
  const [artistsAlbumsDatas, setArtistsAlbumsDatas] = useState<
    Array<ArtistsAlbum>
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // アーティストのアルバム情報取得
  const fetchArtistsAlbums = async (
    artistId: Location,
    accessToken: string
  ) => {
    setLoading(true);
    setError(false);

    await axios
      .get<ArtistsAlbumsResponse>(
        `https://api.spotify.com/v1/artists/${artistId}/albums?market=JP`,
        {
          headers: { Authorization: "Bearer " + accessToken },
          data: {}
        }
      )
      .then((res) => {
        const resultDatas = res.data.items.map((album) => ({
          id: album.id,
          name: album.name,
          images: album?.images,
          release_date: album.release_date,
          album_group: album.album_group,
          album_type: album.album_type,
          href: album.href,
          total_tracks: album.total_tracks
        }));
        setArtistsAlbumsDatas(resultDatas);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { fetchArtistsAlbums, artistsAlbumsDatas, loading, error };
};
