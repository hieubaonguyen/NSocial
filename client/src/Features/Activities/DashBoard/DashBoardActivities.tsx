import { Grid, GridColumn } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import ActivityStore from "../../../App/stores/ActivityStore";
import LoadingComponent from "../../../App/Layout/LoadingComponent";

const DashBoardActivities = () => {

  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading Activities..." />;
    
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList />
      </GridColumn>
      <GridColumn width={6}>
        <h1>Activity</h1>
      </GridColumn>
    </Grid>
  );
};

export default observer(DashBoardActivities);
