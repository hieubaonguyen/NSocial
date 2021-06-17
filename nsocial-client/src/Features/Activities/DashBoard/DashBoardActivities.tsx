import React, { SyntheticEvent, useContext } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { IActivity } from "../../../App/Models/Activity";
import ActivityList from "./ActivityList";
import ActivityDetail from "../Detail/ActivityDetail";
import ActivityForm from "../Form/ActivityForm";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../App/stores/ActivityStore";

interface IProps {
  activities: IActivity[];
  handleSelectActivity: (id: string) => void;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  handleEditActivity: (activity: IActivity) => void;
  handleDeleteActivity: (event: SyntheticEvent<HTMLButtonElement>,id: string) => void;
  submitting: boolean;
  target: string;
}

const DashBoardActivities: React.FC<IProps> = ({
  setEditMode,
  setSelectedActivity,
  handleEditActivity,
  handleDeleteActivity,
  submitting,
  target
}) => {
  const activityStore = useContext(ActivityStore);
  const {selectedActivity, editMode} = activityStore;
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList
          handleDeleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </GridColumn>
      <GridColumn width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetail
            setEditMode={setEditMode}
            setActivity={setSelectedActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
            setEditMode={setEditMode}
            activity={selectedActivity!}
            handleEditActivity={handleEditActivity}
            submitting={submitting}
          />
        )}
      </GridColumn>
    </Grid>
  );
};

export default observer(DashBoardActivities);
