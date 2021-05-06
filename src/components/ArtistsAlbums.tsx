import axios from "axios";
import { memo, useEffect, VFC } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  accessToken: string;
};

export const ArtistsAlbums: VFC<Props> = memo((props) => {
  const { state } = useLocation();
  const { accessToken } = props;
  console.log(state);
  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/artists/${state}/albums`, {
        headers: { Authorization: "Bearer " + accessToken },
        data: {}
      })
      .then((res) => {
        console.log(res);
      });
  }, [accessToken, state]);
  return <p>アルバムページ</p>;
});
