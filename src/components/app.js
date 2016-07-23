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

  onSubmit(intitle, event) {
    event.preventDefault();
    const id = this.state.id + 1;
    this.state.id = id;
    const note = {
      id: this.state.id,
      title: intitle,
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

  onEdit() {
    console.log(event.target.value);
    console.log(this.props.id);
    console.log('hello');
    // this.setState({
    //  notes: this.state.notes.update(editid, (n) => { return Object.assign({}, n, { text: event.target.value }); }),
    // });
  }

  render() {
    if (this.state.notes.size === 0) {
      return (
        <div>
          <TitleBar onSubmit={intitle => this.onSubmit(intitle, event)} />
        </div>
      );
    } else {
      return (
        <div>
          <TitleBar onSubmit={event => this.onSubmit(event)} input />
          {this.state.notes.entrySeq().map(([id, note]) => {
            return <Note key={id} id={id} note={note} onDelete={deleteid => this.onDelete(deleteid)} onEdit={editid => this.onEdit()} />;
          })}
        </div>
      );
    }
  }
}

export default App;
