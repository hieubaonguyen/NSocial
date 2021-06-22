import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityStore from "../../../App/stores/ActivityStore";
import { RouteComponentProps } from "react-router";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

interface DetailParams {
  id: string;
}

const ActivityDetail: React.FC<RouteComponentProps<DetailParams>> = ({
  match
}) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loadingInitial } =
    activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial)
    return <LoadingComponent content="Loading Activity..." />;

  if(!activity)
    return <h2>Not found</h2>

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity}/>
        <ActivityDetailedInfo activity={activity}/>
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetail);
