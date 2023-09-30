import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { GetUsers } from "../../services/steamService";
import { ISteamPlayer } from "../../interfaces/ISteamWorks";
import SteamUserPreview from "../../components/SteamUser/SteamUserPreview/SteamUserPreview";
import styles from "./tracking-list-page.module.css";

const TrackingListPage: React.FC = () => {
  const [trackingUsers, setTrackingUsers] = useState<ISteamPlayer[]>([]);

  const loggedInUser = useSelector(
    (state: RootState) => state.loggedInUser.user
  );

  useEffect(() => {
    (async () => {
      if (
        loggedInUser &&
        loggedInUser.trackingList &&
        loggedInUser.trackingList.length > 0
      ) {
        const steamUrls = loggedInUser.trackingList
          .map((user) => user.profileurl)
          .join(",");
        const users = await GetUsers(steamUrls);
        if (users) setTrackingUsers(users);
      }
    })();
  }, [loggedInUser]);

  return (
    <div className={styles.container}>
      <h1>My Tracking list</h1>
      <div className={styles.trackingList}>
        {trackingUsers.map((user, key) => (
          <SteamUserPreview key={key} {...user} />
        ))}
      </div>
    </div>
  );
};

export default TrackingListPage;
