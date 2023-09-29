import { useEffect, useState } from "react";
import { GetUser } from "../../services/steamService";
import { IUser } from "../../interfaces/IUser";
import { useLocation, useSearchParams } from "react-router-dom";
import SteamUser from "../../components/SteamUser/SteamUser";
import Search from "../../components/Search/Search";

const SearchUserPage: React.FC = () => {
  const [queryParameters] = useSearchParams();
  const [steamUser, setSteamUser] = useState<IUser | null>(null);
  const steamUrlParam = queryParameters.get("steamUrl");

  const location = useLocation();

  useEffect(() => {
    if (steamUrlParam) {
      (async () => {
        const steamUserData = await GetUser(steamUrlParam);
        setSteamUser(steamUserData);
      })();
    }
  }, [location]);

  return (
    <>
      <Search placeholder={"Who is sus?"} />
      {steamUser && <SteamUser {...steamUser} />}
    </>
  );
};

export default SearchUserPage;
