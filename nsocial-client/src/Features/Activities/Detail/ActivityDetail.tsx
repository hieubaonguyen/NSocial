import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { IActivity } from "../../../App/Models/Activity";

interface IProps{
  activity: IActivity;
  setEditMode: (editMode: boolean) => void;
  setActivity: (activity: IActivity | null) => void;
}

const ActivityDetail: React.FC<IProps> = ({activity, setEditMode, setActivity}) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
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
