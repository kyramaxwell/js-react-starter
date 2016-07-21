/* This code is modified from the code created in SA4 */

import React from 'react';

const TitleBar = (props) => {
  return (
    <div id="titlebar">
      <form className="titleform" onSubmit={(event) => props.onSubmit(event)}>
        <input
          type="text"
          placeholder="new note title"
          onChange={value => event.input.value}
        />
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default TitleBar;
