import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

class FilterTypeSelector extends Component{

    filterModes = {ALL_NOTES: 'all-notes', JUST_BEGIN: 'just-begin'};
    selectedColor =  '#343a40';
    deselectedColor = '#6c757d';

    constructor(props){
        super(props);
        this.state={
            allNotesColor: this.selectedColor,
            justBeginColor: this.deselectedColor
        };
    }

    selectJustBeginType(filterMode){
        this.setState({
            allNotesColor: this.deselectedColor,
            justBeginColor: this.selectedColor
        })
        this.props.filterSelection && this.props.filterSelection(filterMode);
    }

    selectAllNotesType(filterMode){
        this.setState({
            allNotesColor: this.selectedColor,
            justBeginColor: this.deselectedColor
        })
        this.props.filterSelection && this.props.filterSelection(filterMode);
    }

    render(){
        return <ButtonGroup>
            <Button variant="secondary" size="sm" className="text" 
                checked={this.props.mode === this.filterModes.JUST_BEGIN}
                onClick={()=>this.selectJustBeginType(this.filterModes.JUST_BEGIN)} 
                style={{backgroundColor: this.state.justBeginColor, border: this.state.justBeginColor}}>
                Check at begin</Button>
            <Button variant="secondary" size="sm" className="text" 
                checked={this.props.mode === this.filterModes.ALL_NOTES}
                onClick={()=>this.selectAllNotesType(this.filterModes.ALL_NOTES)}
                style={{backgroundColor: this.state.allNotesColor, border: this.state.allNotesColor}}>
                Check in all note</Button>
        </ButtonGroup>
    }
}

export default FilterTypeSelector;