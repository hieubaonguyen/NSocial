import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { IActivity } from "../../../App/Models/Activity";
import ActivityStore from "../../../App/stores/ActivityStore";

interface IProps{
  setEditMode: (editMode: boolean) => void;
  setActivity: (activity: IActivity | null) => void;
}

const ActivityDetail: React.FC<IProps> = ({setEditMode, setActivity}) => {
  const activityStore = useContext(ActivityStore);
  const {selectedActivity: activity} = activityStore;
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity!.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
            <Button onClick={() => setActivity(null)} basic color="grey" content="Cancel"/>
            <Button onClick={() => setEditMode(true)} basic color="blue" content="Edit"/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetail);
