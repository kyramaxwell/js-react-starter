import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = { editing: true };
    this.onEdit = this.onEdit.bind(this);
  }

// functions
  onEdit() {
    this.setState({ editing: !this.state.editing });
  }

  renderEditingIcon() {
    if (this.state.editing) {
      return <i className="fa fa-check fa-lg" onClick={this.onEdit}></i>;
    } else {
      return <i className="fa fa-pencil fa-lg" onClick={this.onEdit}></i>;
    }
  }

  renderEditingText() {
    if (this.state.editing) {
      return <textarea />;
    } else {
      return <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />;
    }
  }

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
              {this.renderEditingIcon()}
            </div>
            <div className="note-mover">
              <i className="fa fa-arrows-alt fa-lg"></i>
            </div>
          </div>
          {this.renderEditingText()}
        </div>
      </Draggable>
    );
  }
}

export default Note;
