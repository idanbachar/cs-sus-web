import Image from "next/image";
import { ISteamPlayer } from "@/lib/types/steam";

interface FriendsSidebarProps {
  friends: ISteamPlayer[];
  trackedIds: Set<string>;
  viewerSteamId?: string;
  onOpenFriendProfile: (profileUrl: string) => void;
  onToggleFriendTrack: (friendSteamId: string, friendProfileUrl: string) => void;
}

export function FriendsSidebar({
  friends,
  trackedIds,
  viewerSteamId,
  onOpenFriendProfile,
  onToggleFriendTrack,
}: FriendsSidebarProps) {
  if (!friends.length) return null;

  return (
    <aside className="friends-side-sticky">
      <section className="friends-panel friends-panel-side">
        <div className="friends-panel-head">
          <h3>Steam Friends</h3>
          <p>{friends.length} profiles</p>
        </div>

        <div className="friends-grid">
          {friends.map((friend) => {
            const friendTracked = trackedIds.has(friend.steamid);
            const canTrackFriend = !!viewerSteamId && viewerSteamId !== friend.steamid;

            return (
              <div key={friend.steamid} className="friend-card">
                <button
                  type="button"
                  className="friend-main-btn"
                  onClick={() => onOpenFriendProfile(friend.profileurl)}
                >
                  <Image
                    src={friend.avatarfull}
                    alt={friend.personaname}
                    width={44}
                    height={44}
                    className="friend-avatar"
                  />
                  <div>
                    <strong>{friend.personaname}</strong>
                    <span>{friend.loccountrycode ?? "N/A"}</span>
                  </div>
                </button>

                {canTrackFriend ? (
                  <button
                    type="button"
                    className={`friend-track-btn ${friendTracked ? "tracked" : ""}`.trim()}
                    onClick={() => onToggleFriendTrack(friend.steamid, friend.profileurl)}
                  >
                    {friendTracked ? "Tracked" : "Track"}
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </aside>
  );
}
