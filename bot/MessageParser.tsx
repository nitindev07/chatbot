import React from "react";

const MessageParser = ({
  children,
  actions,
}: {
  children: any;
  actions: {
    handleGotIt: () => void;
    handleUserInput: (message: string) => void;
  };
}) => {
  const parse = (message: string) => {
    if (message.includes("got it!")) {
      actions.handleGotIt();
    } else {
      actions.handleUserInput(message);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          parse,
          actions,
        })
      )}
    </div>
  );
};

export default MessageParser;
