export const getPostStats = async (
  profileId,
  setTotalLinks,
  setProfilePosts,
  setTotalPosts
) => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/profile/getprofilestats`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: profileId,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTotalLinks(data.totalLinks);
        if (data.postData) {
          setProfilePosts(data.postData);
          setTotalPosts(data.postData.length);
        }
      });
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getAllLinksandUser = async (
  profileId,
  currentUserId,
  setallLinks,
  setUser,
  setisGotData
) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/links/getLinksAndUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        curr_user_id: currentUserId,
        user_id: profileId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setallLinks(data.Links);
        setUser(data.User);
        setisGotData(true);
      });
  } catch (error) {
    console.error("Error:", error);
  }
};

export const handleAddFriend = async (
  currentUserId,
  profileId,
  setIsInteracting,
  setisFriend
) => {
  setIsInteracting(true);
  try {
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/links/addlink`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: currentUserId, friend_id: profileId }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.success) {
          throw new Error("Failed to insert in db");
        } else {
          setisFriend(true);
        }
      });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setIsInteracting(false);
  }
};
export const handleremoveFriend = async (
  currentUserId,
  profileId,
  setIsInteracting,
  setisFriend
) => {
  setIsInteracting(true);
  try {
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/links/removelink`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: currentUserId, friend_id: profileId }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.success) {
          throw new Error("Failed to delete db");
        } else {
          setisFriend(false);
        }
      });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setIsInteracting(false);
  }
};
