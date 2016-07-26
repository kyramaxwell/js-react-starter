import React, { Component } from 'react';
import Immutable from 'immutable';
import TitleBar from './title_bar';
import Note from './note';
import * as firebasedb from '../firebasedb';


// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map(),
    };
  }

  componentDidMount() {
    const updateNotes = (snapshot) => {
      const tempMap = Immutable.Map(snapshot.val());
      this.setState({
        notes: tempMap,
      });
    };
    firebasedb.fetchNotes(updateNotes);
  }

  onSubmit(intitle, event) {
    event.preventDefault();
    const note = {
      title: intitle,
      text: '',
      x: 20,
      y: 20,
      zIndex: 0,
    };
    const id = firebasedb.createNote(note);
    this.setState({
      notes: this.state.notes.set(id, note),
    });
  }

  onDelete(deleteid) {
    firebasedb.removeNote(deleteid);
    this.setState({
      notes: this.state.notes.delete(deleteid),
    });
  }

  onEdit(editid, textvalue) {
    this.setState({
      notes: this.state.notes.update(editid, (n) => { return Object.assign({}, n, { text: textvalue }); }),
    });
    firebasedb.updateNoteText(editid, textvalue);
  }

  onMove(moveid, ui) {
    this.setState({
      notes: this.state.notes.update(moveid, (n) => { return Object.assign({}, n, { x: ui.x, y: ui.y }); }),
    });
    firebasedb.updateNoteLoc(moveid, ui);
  }

  render() {
    if (this.state.notes.size === 0) {
      return (
        <div>
          <TitleBar onSubmit={(intitle, event) => this.onSubmit(intitle, event)} />
        </div>
      );
    } else {
      return (
        <div>
          <TitleBar onSubmit={(intitle, event) => this.onSubmit(intitle, event)} input />
          {this.state.notes.entrySeq().map(([id, note]) => {
            return (<Note key={id} id={id} note={note}
              onMove={(moveid, ui) => this.onMove(moveid, ui)}
              onDelete={deleteid => this.onDelete(deleteid)}
              onEdit={(editid, textvalue) => this.onEdit(editid, textvalue)}
            />);
          })}
        </div>
      );
    }
  }
}

export default App;
