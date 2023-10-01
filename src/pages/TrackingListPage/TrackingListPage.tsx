import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { GetUsers } from "../../services/steamService";
import { ISteamPlayer } from "../../interfaces/ISteamWorks";
import styles from "./tracking-list-page.module.css";
import TrackingItem from "../../components/TrackingItem/TrackingItem";
import Loader from "../../components/Loader/Loader";
import { UpdateUserTrackingList } from "../../services/firebaseService";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

const TrackingListPage: React.FC = () => {
  const [trackingUsers, setTrackingUsers] = useState<ISteamPlayer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const loggedInUser = useSelector(
    (state: RootState) => state.loggedInUser.user
  );

  useEffect(() => {
    (async () => {
      if (
        trackingUsers.length === 0 &&
        loggedInUser &&
        loggedInUser.trackingList &&
        loggedInUser.trackingList.length > 0
      ) {
        const steamUrls = loggedInUser.trackingList
          .map((user) => user.profileurl)
          .join(",");
        const users = await GetUsers(steamUrls);
        if (users) {
          setIsLoading(false);
          setTrackingUsers(
            users.sort(
              (a, b) => b.vacBans.NumberOfVACBans - a.vacBans.NumberOfVACBans
            )
          );
        }
      }
    })();
  }, [loggedInUser]);

  return (
    <div className={styles.container}>
      {loggedInUser ? (
        <>
          <h2>My Tracking list</h2>
          {!isLoading ? (
            <div className={styles.trackingList}>
              {trackingUsers.map((user, key) => (
                <TrackingItem
                  key={key}
                  {...user}
                  onStopTracking={(steamid) => {
                    const updatedTrackingUsers = [...trackingUsers].filter(
                      (user) => user.steamid !== steamid
                    );
                    const updatedTrackingList = [...trackingUsers]
                      .filter((trackItem) => trackItem.steamid !== steamid)
                      .map((user) => {
                        return {
                          id: user.steamid,
                          profileurl: user.profileurl,
                        };
                      });
                    UpdateUserTrackingList(
                      loggedInUser.id,
                      updatedTrackingList
                    );
                    dispatch(
                      setUser({
                        ...loggedInUser,
                        trackingList: updatedTrackingList,
                      })
                    );
                    setTrackingUsers(updatedTrackingUsers);
                  }}
                />
              ))}
            </div>
          ) : (
            <Loader
              cssStyles={{
                height: "50vh",
              }}
            />
          )}
        </>
      ) : null}
    </div>
  );
};

export default TrackingListPage;
