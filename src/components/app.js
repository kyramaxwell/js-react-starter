import React, { Component } from 'react';
import Immutable from 'immutable';
import TitleBar from './title_bar';
import Note from './note';


// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map(),
      id: 0,
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const id = this.state.id + 1;
    this.state.id = id;
    const note = {
      id: this.state.id,
      title: this.state.id,
      text: '',
      x: 0,
      y: 0,
      zIndex: 0,
    };
    this.setState({
      notes: this.state.notes.set(this.state.id, note),
    });
  }

  onDelete(deleteid) {
    this.setState({
      notes: this.state.notes.delete(deleteid),
    });
  }

  render() {
    if (this.state.notes.size === 0) {
      return (
        <div>
          <TitleBar onSubmit={event => this.onSubmit(event)} />
        </div>
      );
    } else {
      return (
        <div>
          <TitleBar onSubmit={event => this.onSubmit(event)} input />
          {this.state.notes.entrySeq().map(([id, note]) => {
            return <Note key={id} id={id} note={note} onDelete={deleteid => this.onDelete(deleteid)} />;
          })}
        </div>
      );
    }
  }
}

export default App;
