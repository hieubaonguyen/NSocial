import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../App/Models/Activity";

interface IProps{
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({setEditMode, activity:InitialFormState }) => {
  
  const initialForm = () => {
    if(InitialFormState)
    {
      return InitialFormState;
    }
    else{
      return {
        id: '',
        title: '',
        category: '',
        city: '',
        date: '',
        description: '',
        venue: ''
      }
    }
  }

  const [activity, setActivity] = useState<IActivity>(initialForm);

  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title" value={activity.title}/>
        <Form.TextArea rows={2} placeholder="Description" value={activity.description}/>
        <Form.Input placeholder="Category" value={activity.category}/>
        <Form.Input type="date" placeholder="Date" value={activity.date}/>
        <Form.Input placeholder="City" value={activity.city}/>
        <Form.Input placeholder="Venue" value={activity.venue}/>
        <Button floated="right" positive type="submit" content="Submit" />
        <Button onClick={() => setEditMode(false)} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
