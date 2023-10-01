import { useEffect, useState } from "react";
import { GetUser } from "../../services/steamService";
import { IUser } from "../../interfaces/IUser";
import SteamUser from "../../components/SteamUser/SteamUser";
import Search from "../../components/Search/Search";
import Loader from "../../components/Loader/Loader";
import { useLocation, useSearchParams } from "react-router-dom";

const SearchUserPage: React.FC = () => {
  const [queryParameters] = useSearchParams();

  const steamUrlParam = queryParameters.get("steamUrl");
  const location = useLocation();

  const [steamUser, setSteamUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (steamUrlParam) {
      setIsLoading(true);
      (async () => {
        const steamUserData = await GetUser(steamUrlParam);
        setSteamUser(steamUserData);
        setIsLoading(false);
      })();
    }
  }, [location]);

  return (
    <>
      <Search placeholder={"Enter steam profile url"} />
      {isLoading ? <Loader /> : steamUser ? <SteamUser {...steamUser} /> : null}
    </>
  );
};

export default SearchUserPage;
