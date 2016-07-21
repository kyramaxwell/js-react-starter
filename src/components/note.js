import React, { Component } from 'react';
import Draggable from 'react-draggable';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: true,
    };
  }

// functions

  render() {
    return (
      <Draggable
        handle=".note-mover"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20 }}
        position={null}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div id={this.props.id} className="note-section">
          <div id="top">
            <div id="left">
              <h1> {this.props.note.title} </h1>
              <i className="fa fa-trash-o fa-lg" onClick={(event) => this.props.onDelete(this.props.note.id)}></i>
              <i className="fa fa-check fa-lg"></i>
            </div>
            <div className="note-mover">
              <i className="fa fa-arrows-alt fa-lg"></i>
            </div>
          </div>
          <textarea />
        </div>
      </Draggable>
    );
  }
}

export default Note;
