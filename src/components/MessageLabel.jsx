import React, { useState } from "react";

const MessageLabel = (props) => {

  return (
    <div>
      <div className={`copied text-white absolute top-12 text-center left-1/2 -translate-x-1/2 py-2 px-6 rounded-md bg-${props.bg}-900 border border-${props.bg}-400 transition-all duration-150`}>
        {props.text}
      </div>
    </div>
  );
};

export default MessageLabel;
