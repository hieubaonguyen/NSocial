import React from "react";
import { Message } from "semantic-ui-react";

interface IProps {
    content: string;
}

const ErrorMessage: React.FC<IProps> = ({content}) => {
  return (
    <Message negative color='red'>
      <Message.Content>{content}</Message.Content>
    </Message>
  );
};

export default ErrorMessage;
