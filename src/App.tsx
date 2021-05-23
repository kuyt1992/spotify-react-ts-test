import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { AppInit } from "./components/AppInit";
import { ArtistsSearch } from "./components/ArtistsSearch";
import { ArtistsAlbums } from "./components/ArtistsAlbums";
import { AlbumTracks } from "./components/AlbumTracks";

export default function App() {
  return (
    <RecoilRoot>
      <AppInit />
      <BrowserRouter>
        <div className="App">
          <Link to="/">アーティスト検索</Link>
          <br />
          <Link to="/albums">アルバム</Link>
        </div>
        <Route>
          <Switch>
            <Route exact path="/">
              <ArtistsSearch />
            </Route>
            <Route
              path="/albums"
              render={({ match: { url } }) => (
                <Switch>
                  <Route exact path={url}>
                    <ArtistsAlbums />
                  </Route>
                  <Route exact path={`${url}/albumTracks`}>
                    <AlbumTracks />
                  </Route>
                </Switch>
              )}
            />
          </Switch>
        </Route>
      </BrowserRouter>
    </RecoilRoot>
  );
}
