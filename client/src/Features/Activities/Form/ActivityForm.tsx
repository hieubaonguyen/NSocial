import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { ActivityFormValues } from "../../../App/Models/Activity";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../App/Commons/Form/TextInput";
import TextAreaInput from "../../../App/Commons/Form/TextAreaInput";
import SelectInput from "../../../App/Commons/Form/SelectInput";
import { category } from "../../../App/Commons/Options/CategoryOptions";
import DateInput from "../../../App/Commons/Form/DateInput";
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan,
} from "revalidate";
import { RootStoreContext } from "../../../App/stores/RootStore";

const formValidate = combineValidators({
  title: isRequired({
    message: "Is Required",
  }),
  category: isRequired({
    message: "Is Required",
  }),
  city: isRequired({
    message: "Is Required",
  }),
  date: isRequired({
    message: "Is Required",
  }),
  description: composeValidators(
    isRequired({
      message: "Is Required",
    }),
    hasLengthGreaterThan(5)({
      message: "Must be 5 characters or less",
    })
  )(),
  venue: isRequired({
    message: "Is Required",
  }),
});

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity,
  } = rootStore.activityStore;

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then((activity) => setActivity(activity))
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);

  const [activity, setActivity] = useState(new ActivityFormValues());

  const [loading, setLoading] = useState(false);

  const handleSubmitFinalForm = (values: any) => {
    const { ...activity } = values;
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={formValidate}
            initialValues={activity}
            onSubmit={handleSubmitFinalForm}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
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
                  value={activity.date!}
                  render={DateInput}
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
                  disabled={loading}
                />
                <Button
                  onClick={
                    activity.id
                      ? () => history.push(`/activities${activity.id}`)
                      : () => history.push("/activities")
                  }
                  floated="right"
                  type="button"
                  content="Cancel"
                  disabled={loading}
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
