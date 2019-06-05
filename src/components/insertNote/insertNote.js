import React, { Component } from 'react';
import './insertNote.scss';
import Button from 'react-bootstrap/Button';

class InsertNote extends Component {
    constructor(props){
        super(props);
        this.state={
            content:''
        };
    }

    changeValue(evt){
        this.setState({
            content: evt.target.value
        });
    }

    sendTask(evt){
        evt.preventDefault();
        this.props.onSent && this.props.onSent({content: this.state.content, selected: false});
        this.setState({
            content: ''
        }); 
    }
    
    render(){
        return <div> 
            <form onSubmit={submitEvt => this.sendTask(submitEvt)} className="field-insert-note">
                <input type='text' value={this.state.content} name="note-label" className="field-insert-note__text"
                    onChange={changeEvt => this.changeValue(changeEvt)}/>
                <Button type="submit" variant="secondary" disabled={!this.state.content} 
                    className="field-insert-note__insert-note">Enter</Button>
            </form>
        </div>
    }

}

export default InsertNote;