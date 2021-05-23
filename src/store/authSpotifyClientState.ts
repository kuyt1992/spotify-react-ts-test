import { atom } from "recoil";

import { Credentials } from "../Credentials";

const spotifyClientInfo = Credentials();

export const spotifyClientState = atom({
  key: "spotifyClientState",
  default: { spotifyClientInfo }
});
