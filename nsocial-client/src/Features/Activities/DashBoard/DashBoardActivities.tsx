import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { IActivity } from "../../../App/Models/Activity";
import ActivityList from "./ActivityList";
import ActivityDetail from "../Detail/ActivityDetail";
import ActivityForm from "../Form/ActivityForm";

interface IProps {
  activities: IActivity[];
  handleSelectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  handleCreateActivity: (activity: IActivity) => void;
  handleEditActivity: (activity: IActivity) => void;
}

const DashBoardActivities: React.FC<IProps> = ({
  activities,
  handleSelectActivity,
  selectedActivity,
  editMode,
  setEditMode,
  setSelectedActivity,
  handleCreateActivity,
  handleEditActivity
}) => {
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList
          activities={activities}
          handleSelectActivity={handleSelectActivity}
        />
      </GridColumn>
      <GridColumn width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetail
            activity={selectedActivity}
            setEditMode={setEditMode}
            setActivity={setSelectedActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            setEditMode={setEditMode}
            activity={selectedActivity!}
            handleCreateActivity={handleCreateActivity}
            handleEditActivity={handleEditActivity}
          />
        )}
      </GridColumn>
    </Grid>
  );
};

export default DashBoardActivities;
