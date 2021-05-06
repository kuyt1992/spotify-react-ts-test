import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import { useSetAccessToken } from "./hooks/useSetAccessToken";
import { ArtistsSearch } from "./components/ArtistsSearch";
import { ArtistsAlbums } from "./components/ArtistsAlbums";

export default function App() {
  const { accessToken } = useSetAccessToken();

  return (
    <BrowserRouter>
      <div className="App">
        <Link to="/">アーティスト検索</Link>
        <br />
        <Link to="/albums">アルバム</Link>
      </div>
      <Route>
        <Switch>
          <Route exact path="/">
            <ArtistsSearch accessToken={accessToken} />
          </Route>
          <Route path="/albums">
            <ArtistsAlbums accessToken={accessToken} />
          </Route>
        </Switch>
      </Route>
    </BrowserRouter>
  );
}
