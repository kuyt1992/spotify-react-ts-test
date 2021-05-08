import axios from "axios";
import { memo, useEffect, useState, VFC } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { TrackResponse } from "../types/api/TrackResponse";
import { Track } from "../types/Track";

type Props = {
  accessToken: string;
};

export const AlbumTracks: VFC<Props> = memo((props) => {
  const { state } = useLocation<Location>();
  const { accessToken } = props;

  const [trackDatas, setTrackDatas] = useState<Array<Track>>([]);

  useEffect(() => {
    axios
      .get<TrackResponse>(`https://api.spotify.com/v1/albums/${state}/tracks`, {
        headers: { Authorization: "Bearer " + accessToken },
        data: {}
      })
      .then((res) => {
        const resultDatas = res.data.items.map((track) => ({
          id: track.id,
          track_number: track.track_number,
          name: track.name,
          href: track.href,
          preview: track.preview_url,
          duration_ms: track.duration_ms,
          disc_number: track.disc_number
        }));
        setTrackDatas(resultDatas);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken, trackDatas, state]);

  // トラック時間数をミリ秒から分へ変換
  const toMinutes = (trackTime: number) => {
    const minutes = Math.floor(trackTime / 1000 / 60) % 60;
    console.log(minutes);
    return minutes;
  };

  console.log(state);
  return (
    <>
      {trackDatas.map((track) => (
        <SDl key={track.id}>
          <dt>{track.track_number}</dt>
          <dd>
            {track.name}
            <a href={track.preview}> プレビュー</a>
          </dd>
          <br />
          <dt>時間</dt>
          <dd>{toMinutes(track.duration_ms)}</dd>
        </SDl>
      ))}
    </>
  );
});

const SDl = styled.dl<any>`
  text-align: left;
  margin-bottom: 0;
  dt {
    float: left;
  }
  dd {
    padding-left: 32px;
    padding-bottom: 8px;
    overflow-wrap: break-word;
  }
`;
