import React, { Component } from 'react';
import './App.scss';

import InsertNote from './components/insertNote/insertNoteClass';
import DisplayNotes from './components/displayNotes/displayNotesFn';
import FilterTypeSelector from './components/filterTypeSelector/filterTypeSelector';

import { Button, Container, Row, Col } from 'react-bootstrap';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrashAlt, faPenSquare } from '@fortawesome/free-solid-svg-icons';
library.add(faSearch);
library.add(faTrashAlt);
library.add(faPenSquare);

class App extends Component {

  filterModes = {ALL_NOTES: 'all-notes', JUST_BEGIN: 'just-begin'}
  displayFullList = '';

  constructor(props){
    super(props);
    this.state={
      list: [],
      filterMode: this.filterModes.ALL_NOTES,
      filterSubstr: ''
    };
  }

  addNewNote(newNote){
    this.setState({
      list: [...this.state.list, newNote]
    });
  }

  deleteNote(index){
    const updatedList = [...this.state.list];
    updatedList.splice(index, 1);
    this.setState({list: updatedList});
  }

  modifyNote(content, index){
    const {list} = this.state;

    const newList = list.map((note, noteIndex)=>(noteIndex === index) ? {
      ...note,
      content
    } : note);
    this.setState({list: newList});
  }

  switchSelection(index){
    const {list} = this.state;
    const selected = !this.state.list[index].selected;
    const newSelection = list.map((note, noteIndex)=>(noteIndex === index) ?{
      ...note,
      selected
    } : note);
    this.setState({list: newSelection})
  }

  deleteSelectedNotes(){
    const filteredNotesList = this.state.list.filter(element=>!element.selected);
    this.setState({
      list: filteredNotesList
    });
  }

  selectFilterType(type){
    this.setState({
      filterMode: type
    }, console.log(this.state.filterMode))
  }

  findFilteredSubstring(subStr){
    this.setState({
      filterSubstr: subStr
    })
  }

  render() {
    const filteredList = this.state.list.filter(element=>{
      const result = element.content.indexOf(this.state.filterSubstr);
      if (this.state.filterMode===this.filterModes.JUST_BEGIN){
        return result === 0;
      }
      return result!==-1;
    });
    const noSelectedNotes = this.state.list.every(note=>!note.selected);
    return (
      <Container className="App">
        <Row>
          <Col className="insert-note">
            <InsertNote onSent={content => this.addNewNote(content)} />
          </Col>
        </Row>
        <Row>
          <Col className="delete-selected-notes">
            <Button variant="secondary" onClick={()=>this.deleteSelectedNotes()} disabled={noSelectedNotes}
              className="delete-selected-notes__button text">Delete selected notes</Button>
          </Col>
          <Col>
            <div className="elements-to-filter">
                <label>
                  <FontAwesomeIcon icon="search" />
                  <input type='text' className="filter-text text" onChange={subStr=>this.findFilteredSubstring(subStr.target.value)} />
                </label>
                <FilterTypeSelector mode={this.state.filterMode} filterSelection={newMode => this.selectFilterType(newMode)} />
            </div>
          </Col>
        </Row>
        <DisplayNotes list={filteredList} toDelete={index=>this.deleteNote(index)} 
          toModify={(newContent, index)=>this.modifyNote(newContent, index)}
          toSwitchSelection={(index)=>this.switchSelection(index)} />
      </Container>
    );
  };
}

export default App;
