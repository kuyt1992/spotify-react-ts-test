type CredentialType = {
  ClientId: string;
  ClientSecret: string;
};

export const Credentials = (): CredentialType => {
  return {
    ClientId: process.env.REACT_APP_CLIENT_ID,
    ClientSecret: process.env.REACT_APP_CLIENT_SECRET
  };
};
