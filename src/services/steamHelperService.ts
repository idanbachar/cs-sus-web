export const CheckIsSteamProfileValid = (steamURL: string) => {
  const regex =
    /^https:\/\/steamcommunity\.com\/(id\/[a-zA-Z0-9_-]+|profiles\/[0-9]{17})\/?$/;
  return regex.test(steamURL);
};
