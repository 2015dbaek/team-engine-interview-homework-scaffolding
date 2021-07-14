import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import { Api } from './util/api';

export const MessagesButton = (props: { employee: any }) => {
    
    const [loadMessage, setLoadMessage] = useState("");

    const handleClickLoadingMessages = async () => {

        const response = await Api.get('/messages?employeeId=' + props.employee.employeeId); 
        const messages = await response.json();
        console.log(messages);
        var jsonObj = JSON.parse(messages);
        var text = "";
        for(let x in jsonObj){
          if(jsonObj[x].sentByName)
          text +=  + jsonObj[x].dateTime + " " + jsonObj[x].sentByName + ": " + jsonObj[x].messageBody;
        } 
        setLoadMessage(text);
        
        //const msg = JSON.parse(messages);


      };

      const handleLoadingMessages = () => {
        return (
          <p>{loadMessage}</p>);
         /*var jsonObj = JSON.parse(loadMessage);
        var text = "";
        for(let x in jsonObj){
          if(jsonObj[x].sentByName)
          text += jsonObj[x].dateTime + " " + jsonObj[x].sentByName + ": " + jsonObj[x].messageBody + "\n";
        } 
        return text; */
      };

      return(
          <div>
        <Button
        size="medium"
        variant="contained"
        color="secondary"
        onClick={handleClickLoadingMessages}
      >
        Load Employee Messages
      </Button>
        <div className="u-padding-lg">
            <div className="u-padding">
                    {handleLoadingMessages()}
            </div>
        </div>

      </div>
      )

}