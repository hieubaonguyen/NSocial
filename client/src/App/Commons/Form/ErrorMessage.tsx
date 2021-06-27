import React, { ReactNode } from "react";
import { Message } from "semantic-ui-react";
import { AxiosResponse } from "axios";

interface IProps {
  error: AxiosResponse;
  content?: string;
}

const ErrorMessage: React.FC<IProps> = ({ content, error }) => {
  return (
    <Message positive color="red">
      {error.data && Object.keys(error.data.errors).length > 0 && (
        <Message.List>
          {Object.values(error.data.errors)
            .flat()
            .map((err, index) => (
              <Message.Item key={index}>{err as ReactNode}</Message.Item>
            ))}
        </Message.List>
      )}
      {content && <Message.Content>{content}</Message.Content>}
    </Message>
  );
};

export default ErrorMessage;
