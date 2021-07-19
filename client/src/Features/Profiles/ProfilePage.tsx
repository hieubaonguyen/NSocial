import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { RouteComponentProps } from "react-router-dom";
import { RootStoreContext } from "../../App/stores/RootStore";
import LoadingComponent from "../../App/Layout/LoadingComponent";
import { observer } from "mobx-react-lite";

interface RouteParams {
  userName: string;
}

const ProfilePage: React.FC<RouteComponentProps<RouteParams>> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    getUserProfile,
    loadingProfile,
    profile,
    follow,
    unfollow,
    isCurrentUser,
    loading,
    setActiveTab,
  } = rootStore.profileStore;

  useEffect(() => {
    getUserProfile(match.params.userName);
  }, [getUserProfile, match.params.userName]);

  if (loadingProfile) return <LoadingComponent content="Loading Profile..." />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader
          profile={profile!}
          follow={follow}
          unfollow={unfollow}
          isCurrentUser={isCurrentUser}
          loading={loading}
        />
        <ProfileContent setActiveTab={setActiveTab} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProfilePage);
