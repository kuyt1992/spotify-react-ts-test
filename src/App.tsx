import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import { useSetAccessToken } from "./hooks/useSetAccessToken";
import { ArtistsSearch } from "./components/ArtistsSearch";
import { ArtistsAlbums } from "./components/ArtistsAlbums";
import { AlbumTracks } from "./components/AlbumTracks";

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
          <Route
            path="/albums"
            render={({ match: { url } }) => (
              <Switch>
                <Route exact path={url}>
                  <ArtistsAlbums accessToken={accessToken} />
                </Route>
                <Route exact path={`${url}/albumTracks`}>
                  <AlbumTracks accessToken={accessToken} />
                </Route>
              </Switch>
            )}
          />
        </Switch>
      </Route>
    </BrowserRouter>
  );
}
