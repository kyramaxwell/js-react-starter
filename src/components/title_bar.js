/* This code is modified from the code created in SA4 */

import React from 'react';

const TitleBar = (props) => {
  let value;
  return (
    <div id="titlebar">
      <form className="titleform" onSubmit={() => props.onSubmit(value, event)}>
        <input
          type="text"
          placeholder="new note title"
          onChange={(event) => {
            value = event.target.value;
          }}
          value={value}
        />
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default TitleBar;
