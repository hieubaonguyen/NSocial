import { Grid, GridColumn } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import { RootStoreContext } from "../../../App/stores/RootStore";

const DashBoardActivities = () => {

  const rootStore = useContext(RootStoreContext);
  const {loadActivities, loadingInitial} = rootStore.activityStore;

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loadingInitial)
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
