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
  email: isRequired("email"),
  password: isRequired("password"),
});

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;

  return (
    <FinalForm
      validate={validateForm}
      onSubmit={(value: IUserFormValue) =>
        login(value).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      render={({
        handleSubmit,
        submitError,
        submitting,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Header
            as="h2"
            content="Login to Reactivities"
            color="teal"
            textAlign="center"
          />
          <Field name="email" render={TextInput} placeholder="Email" />
          <Field
            name="password"
            type="password"
            render={TextInput}
            placeholder="Password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage content="Invalid username or password" />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            fluid
            color="teal"
            content="Login"
          />
        </Form>
      )}
    />
  );
};

export default observer(LoginForm);
