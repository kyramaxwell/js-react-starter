import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      textvalue: '',
    };
    this.onEdit = this.onEdit.bind(this);
  }

// functions
  onEdit() {
    if (this.state.editing) {
      this.props.onEdit(this.props.id, this.state.textvalue);
    }
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
      return (
        <textarea
          onChange={(event) => {
            this.setState({ textvalue: event.target.value });
          }}
          value={this.state.textvalue}
        />
      );
    } else {
      return <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />;
    }
  }

  render() {
    return (
      <Draggable
        handle=".note-mover"
        grid={[25, 25]}
        defaultPosition={{ x: this.props.note.x, y: this.props.note.y }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStartDrag}
        onDrag={(event, ui) => this.props.onMove(this.props.id, ui)}
        onStop={this.onStopDrag}
      >
        <div id={this.props.id} className="note-section">
          <div id="top">
            <div id="left">
              <h1> {this.props.note.title} </h1>
              <i className="fa fa-trash-o fa-lg" onClick={(event) => this.props.onDelete(this.props.id)}></i>
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
