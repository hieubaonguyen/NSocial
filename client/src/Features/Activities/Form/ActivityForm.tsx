import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { IActivity } from "../../../App/Models/Activity";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../App/stores/ActivityStore";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from '../../../App/Commons/Form/TextInput';
import TextAreaInput from '../../../App/Commons/Form/TextAreaInput';
import SelectInput from '../../../App/Commons/Form/SelectInput';
import {category} from '../../../App/Commons/Options/CategoryOptions';

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    activity: InitialFormState,
    submitting,
    loadActivity,
    clearActivity,
  } = activityStore;

  useEffect(() => {
    if (match.params.id) {
      loadActivity(match.params.id).then(
        () => InitialFormState && setActivity(InitialFormState)
      );
    }

    return () => {
      clearActivity();
    };
  }, [loadActivity, match.params.id, clearActivity, InitialFormState]);

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    city: "",
    date: "",
    description: "",
    venue: "",
  });

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  // const handleSubmitForm = () => {
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid(),
  //     };
  //     createActivity(newActivity).then(() =>
  //       history.push(`/activities/${newActivity.id}`)
  //     );
  //   } else {
  //     editActivity(activity).then(() =>
  //       history.push(`/activities/${activity.id}`)
  //     );
  //   }
  // };

  const handleSubmitFinalForm = (values: any) => {
    console.log(values);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleSubmitFinalForm}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={activity.title}
                  render={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Description"
                  value={activity.description}
                  rows={3}
                  render={TextAreaInput}
                />
                <Field
                  name="category"
                  placeholder="Category"
                  value={activity.category}
                  render={SelectInput}
                  options={category}
                />
                <Field
                  name="date"
                  placeholder="Date"
                  value={activity.date}
                  render={TextInput}
                />
                <Field
                  name="city"
                  placeholder="City"
                  value={activity.city}
                  render={TextInput}
                />
                <Field
                  name="venue"
                  placeholder="Venue"
                  value={activity.venue}
                  render={TextInput}
                />
                <Button
                  loading={submitting}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={() => history.push("/activities")}
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
