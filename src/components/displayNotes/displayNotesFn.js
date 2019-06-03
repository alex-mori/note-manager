import React from 'react';
import './displayNotes.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';

function DisplayNotes(props){

    function sendElementToRemove(index){
        props.toDelete && props.toDelete(index);
    }

    function modifyElement(content, index){
        const newText = prompt('Please insert your note', content);
        if(newText===null){
            return;
        }
        if(newText===''){
            alert('Insert a content');
            return;
        }
        props.toModify && props.toModify(newText, index);
    }

    function changeSelection(index){
        props.toSwitchSelection && props.toSwitchSelection(index);
    }

    return <Container>
        <Row className="display-notes">
            {props.list.map((note, index)=><Col className="display-notes__item text" key={index} 
                xs={12} sm={6} lg={4}>
                <input type="checkbox" onChange={()=>changeSelection(index)} checked={note.selected} />
                {note.content}
                <div className="display-notes__cmd">
                    <FontAwesomeIcon icon="trash-alt" onClick={()=>sendElementToRemove(index)} 
                        className="customized-btn" />
                    <FontAwesomeIcon icon="pen-square" onClick={()=>modifyElement(note.content, index)}
                        className="customized-btn" />
                </div>
            </Col>)}
        </Row>
    </Container>
}

export default DisplayNotes;
