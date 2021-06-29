import React from "react";
import { List, Image, Popup } from "semantic-ui-react";
import { IAttendee } from "../../../App/Models/Activity";

interface IProps {
  attendees: IAttendee[];
}

const ActivityListItemAttendees: React.FC<IProps> = ({ attendees }) => {
  return (
    <List horizontal>
      {attendees.map((attendee) => (
        <List.Item key={attendee.userName}>
          <Popup
            header={attendee.displayName}
            trigger={
              <Image src={attendee.image || "/assets/user.png"} size="mini" />
            }
          />
        </List.Item>
      ))}
    </List>
  );
};

export default ActivityListItemAttendees;
