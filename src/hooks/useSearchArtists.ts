import axios from "axios";
import { useState } from "react";
import { useRecoilValue } from "recoil";

import { accessTokenState } from "../store/accessTokenState";
import { ArtistResponse } from "../types/api/ArtistResponse";
import { Artist } from "../types/Artist";

export const useSerchArtists = () => {
  const accessToken = useRecoilValue(accessTokenState);
  const [resultArtistDatas, setResultArtistDatas] = useState<Array<Artist>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // アーティスト名で検索し、データ取得
  const searchArtists = async (artistName: string) => {
    setLoading(true);
    setError(false);

    await axios
      .get<ArtistResponse>(
        `https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=20`,
        {
          headers: { Authorization: "Bearer " + accessToken },
          data: {}
        }
      )
      .then((res) => {
        const resultDatas = res.data.artists.items.map((artist) => ({
          id: artist.id,
          name: artist.name,
          img: artist?.images,
          popularity: artist.popularity,
          genres: artist.genres?.join(" / ")
        }));
        setResultArtistDatas(resultDatas);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { searchArtists, resultArtistDatas, loading, error };
};
