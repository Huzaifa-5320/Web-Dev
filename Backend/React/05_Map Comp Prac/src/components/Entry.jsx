import React from "react";
import emojipedia from "../emojipedia";
import App from "./App";

function Entry(props) {
    return (
        <div className="term">
          <dt>
            <span className="emoji" role="img" aria-label="Tense Biceps">
              {props.img}
            </span>
            <span>{props.name}</span>
          </dt>
          <dd>
            {props.meaning}
          </dd>
        </div>
    );


}


export default Entry;