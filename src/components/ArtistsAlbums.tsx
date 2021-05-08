import { memo, useEffect, useState, VFC } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { useSetArtistsAlbums } from "../hooks/useSetArtistsAlbums";

type Props = {
  accessToken: string;
};

export const ArtistsAlbums: VFC<Props> = memo((props) => {
  const { state } = useLocation<Location>();
  const { accessToken } = props;
  const {
    artistsAlbumsDatas,
    fetchArtistsAlbums,
    loading,
    error
  } = useSetArtistsAlbums();

  useEffect(() => {
    fetchArtistsAlbums(state, accessToken);
  }, [accessToken, state]);

  return (
    <>
      {error ? (
        <p style={{ color: "red" }}>データの取得に失敗しました</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {artistsAlbumsDatas.map((album) => (
            <SDl key={album.id}>
              <img
                height={160}
                width={160}
                src={album.images[1]?.url || ""}
                alt={album.name}
              />
              <br />
              <dt>アルバム名: </dt>
              <dd>{album.name}</dd>
              <dt>リリース日: </dt>
              <dd>{album.release_date}</dd>
              <dt>種別: </dt>
              <dd>{album.album_type}</dd>
              <dt>曲数: </dt>
              <dd>{album.total_tracks}曲</dd>
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
