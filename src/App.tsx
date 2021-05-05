import React from "react";

import { useSetAccessToken } from "./hooks/useSetAccessToken";
import { ArtistsSearch } from "./components/ArtistsSearch";

export default function App() {
  const { accessToken } = useSetAccessToken();

  return (
    <div className="App">
      <ArtistsSearch accessToken={accessToken} />
    </div>
  );
}
