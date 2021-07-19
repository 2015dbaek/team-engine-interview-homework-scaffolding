import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import { Api } from '../util/api';

export const MessagesButton = (props: { employee: any }) => {

  const [loadMessage, setLoadMessage] = useState([{ dateTime: "", employeeId: -1, isInbound: false, messageBody: "", sentByName: "" }]);

  const handleClickLoadingMessages = async () => {

    const response = await Api.get('/messages?employeeId=' + props.employee.employeeId);
    const messages = await response.json();
    console.log(messages);
    setLoadMessage(messages);
  };

  return (
    <div>
      <div className="u-padding-lg">
        <Button
        data-testid="messagesButtonTest"
          size="medium"
          variant="contained"
          color="secondary"
          onClick={handleClickLoadingMessages}
        >
          Load Employee Messages
        </Button>
        {loadMessage ? loadMessage.length === 0 ? <p className="emptyMessage">{" No Message History"}</p> :
          loadMessage.filter(message => message.employeeId !== -1).map((message, index) =>
            <div className={message.sentByName ? "message" : "selfmessage"} key={index}>
              <p><div className="messageName">{message.sentByName ? message.sentByName : props.employee.firstName}</div>
               Sent at {message.dateTime.split(".").shift()?.replace("T", " ")}</p>
              <p>{message.messageBody}</p>
            </div>
          ) : "Loading..."}
      </div>
    </div>
  )

}