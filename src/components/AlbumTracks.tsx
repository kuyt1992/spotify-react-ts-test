import { memo, useEffect, VFC } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { useSetAlbumTracks } from "../hooks/useSetAlbumTracks";

export const AlbumTracks: VFC = memo(() => {
  const { state } = useLocation<Location>();

  const { fetchAlbumTracks, trackDatas, loading, error } = useSetAlbumTracks();

  // アルバムトラック情報を取得する
  useEffect(() => {
    fetchAlbumTracks(state);
  }, []);

  return (
    <>
      {error ? (
        <p style={{ color: "red" }}>データの取得に失敗しました</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {trackDatas.map((track) => (
            <SDl key={track.id}>
              <dt>{track.track_number}</dt>
              <dd>
                {`${track.name}  `}
                <a href={track.preview}>{track.preview ? "プレビュー" : ""}</a>
              </dd>
              <br />
              <dt>時間</dt>
              <dd>{track.track_time}</dd>
            </SDl>
          ))}
        </>
      )}
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
