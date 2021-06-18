import React, { SyntheticEvent, useContext } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetail from "../Detail/ActivityDetail";
import ActivityForm from "../Form/ActivityForm";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../App/stores/ActivityStore";

const DashBoardActivities = () => {

  const activityStore = useContext(ActivityStore);
  const {selectedActivity, editMode} = activityStore;

  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList />
      </GridColumn>
      <GridColumn width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetail />
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
          />
        )}
      </GridColumn>
    </Grid>
  );
};

export default observer(DashBoardActivities);
