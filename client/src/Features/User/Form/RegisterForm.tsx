import { FORM_ERROR } from "final-form";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Button, Form, Header } from "semantic-ui-react";
import TextInput from "../../../App/Commons/Form/TextInput";
import { IUserFormValue } from "../../../App/Models/User";
import { RootStoreContext } from "../../../App/stores/RootStore";
import ErrorMessage from "../../../App/Commons/Form/ErrorMessage";

const validateForm = combineValidators({
  displayname: isRequired("password"),
  username: isRequired("password"),
  email: isRequired("email"),
  password: isRequired("password"),
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;

  return (
    <FinalForm
      validate={validateForm}
      onSubmit={(value: IUserFormValue) =>
        register(value).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
        form,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Header
            as="h2"
            content="Sign up to Reactivities"
            color="teal"
            textAlign="center"
          />
          <Field
            name="displayname"
            render={TextInput}
            placeholder="Display Name"
          />
          <Field name="email" render={TextInput} placeholder="Email" />
          <Field name="username" render={TextInput} placeholder="Username" />
          <Field
            name="password"
            type="password"
            render={TextInput}
            placeholder="Password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage content={JSON.stringify(submitError.data.errors)} />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            fluid
            color="teal"
            content="Register"
          />
        </Form>
      )}
    />
  );
};

export default observer(RegisterForm);
