import axios from "axios";
import { Link } from "react-router-dom";
import React, { memo, useEffect, useRef } from "react";
import { useState, VFC } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

import { accessTokenState } from "../store/accessTokenState";
import { ArtistsAlbum } from "../types/ArtistsAlbum";
import { SearchAlbumResponse } from "../types/api/SearchAlbumResponse";

export const SearchAlbums: VFC = memo(() => {
  const accessToken = useRecoilValue(accessTokenState);
  const [resultAlbumDatas, setAlbumDatas] = useState<Array<ArtistsAlbum>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchName, setSearchName] = useState("");
  const isFirstRender = useRef(false);

  const searchAlbums = async (searchName: string) => {
    setLoading(true);
    setError(false);

    await axios
      .get<SearchAlbumResponse>(
        `https://api.spotify.com/v1/search?q=${searchName}&type=album&market=JP&limit=30`,
        {
          headers: { Authorization: "Bearer " + accessToken },
          data: {}
        }
      )
      .then((res) => {
        const resultDatas = res.data.albums.items.map((album) => ({
          id: album.id,
          name: album.name,
          images: album?.images,
          release_date: album.release_date,
          album_group: album.album_group,
          album_type: album.album_type,
          href: album.href,
          total_tracks: album.total_tracks
        }));
        setAlbumDatas(resultDatas);
        console.log(resultDatas);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    // このeffectは初回レンダー時のみ呼ばれるeffect
    isFirstRender.current = true;
  }, []);

  // アルバム検索実行
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      if (searchName !== "") {
        searchAlbums(searchName);
      }
    }
  }, [searchName]);

  return (
    <>
      <input
        value={searchName}
        // onInput={handleSearchInputChanges}
        onChange={(e) => setSearchName(e.target.value)}
        type="text"
        placeholder="アーティスト名/アルバム名で検索"
      />
      {/* <button onClick={onClickSearchArtist} type="submit">
        検索
      </button> */}
      {error ? (
        <p style={{ color: "red" }}>データの取得に失敗しました</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {resultAlbumDatas.map((album) => (
            <SDl key={album.id}>
              <img
                height={160}
                width={160}
                src={album.images[1]?.url || ""}
                alt={album.name}
              />
              <br />
              <dt>アルバム名: </dt>
              <Link to={{ pathname: "/albums/albumTracks", state: album.id }}>
                <dd>{album.name}</dd>
              </Link>
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
