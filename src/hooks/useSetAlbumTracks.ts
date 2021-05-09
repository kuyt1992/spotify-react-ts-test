import axios from "axios";
import { useState } from "react";
import { TrackResponse } from "../types/api/TrackResponse";
import { Track } from "../types/Track";

export const useSetAlbumTracks = () => {
  const [trackDatas, setTrackDatas] = useState<Array<Track>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // トラック時間をmsからh/m/sへ変換
  const computeTrackDuration = (ms: number): string => {
    const hour = String(Math.floor(ms / 3600000) + 100).substring(1);
    const minutes = String(
      Math.floor((ms - Number(hour) * 3600000) / 60000) + 100
    ).substring(1);
    const second = String(
      Math.round(
        (ms - Number(hour) * 3600000 - Number(minutes) * 60000) / 1000
      ) + 100
    ).substring(1);
    return hour === "00"
      ? minutes + ":" + second
      : hour + ":" + minutes + ":" + second;
  };

  // アルバムトラック情報を取得する
  const fetchAlbumTracks = async (state: Location, accessToken: string) => {
    setLoading(true);
    setError(false);

    await axios
      .get<TrackResponse>(`https://api.spotify.com/v1/albums/${state}/tracks`, {
        headers: { Authorization: "Bearer " + accessToken },
        data: {}
      })
      .then((res) => {
        console.log(res.data.items);
        const resultDatas = res.data.items.map((track) => ({
          id: track.id,
          track_number: track.track_number,
          name: track.name,
          href: track.href,
          preview: track.preview_url,
          duration_ms: track.duration_ms,
          track_time: computeTrackDuration(track.duration_ms),
          disc_number: track.disc_number
        }));
        console.log(resultDatas);
        setTrackDatas(resultDatas);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { fetchAlbumTracks, trackDatas, loading, error };
};
