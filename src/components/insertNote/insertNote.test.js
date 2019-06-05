import React from 'react';
import ReactDOM from 'react-dom';
import InsertNote from './insertNote';
import Enzyme, { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe.only('InsertNote component', ()=>{
    let InsertNoteCmp;
    let onSent;
    beforeEach(()=>{
        onSent = jest.fn();
        InsertNoteCmp = shallow(<InsertNote 
            onSent={onSent}
        />);
    });

    it('check initial state', ()=>{
        expect(InsertNoteCmp.state()).toEqual({content: ''});
    });

    describe('input dom behaviour', ()=>{
        let inputText;
        beforeEach(()=>{
            inputText = InsertNoteCmp.find('input');
        });

        it('should exist and be unique',()=>{
            expect(inputText.length).toBe(1);
        });

        it('should change state.content when we change input text value', ()=>{
            const text = 'Hello';
            inputText.simulate('change', { target: { value: text } });
            expect(InsertNoteCmp.state()).toEqual({ content: text });
        });
    });

    describe('button dom behaviour', ()=>{
        const BUTTON_SELECTOR = '[type="submit"]';

        it('should exist and be unique', ()=>{
            const buttonComponent = InsertNoteCmp.find(BUTTON_SELECTOR);
            expect(buttonComponent.length).toBe(1);
        });

        it('should be disabled when state.content is empty string', ()=>{
            InsertNoteCmp.setState({content: ''});
            const buttonComponent = InsertNoteCmp.find(BUTTON_SELECTOR);
            expect(buttonComponent.props().disabled).toBe(true);
        });

        it('should be enabled when state.content is not an empty string', ()=>{
            InsertNoteCmp.setState({content: 'Hello'});
            const buttonComponent = InsertNoteCmp.find(BUTTON_SELECTOR);
            expect(buttonComponent.props().disabled).toBe(false);            
        });
    });

    describe('inner form', ()=>{
        let formComponent;
        beforeEach(()=>{
            formComponent = InsertNoteCmp.find('form');
        });

        it('should exist and be unique', ()=>{
            expect(formComponent.length).toBe(1);
        });

        describe('submit event',()=>{
            let submitEvt;
            const text = 'Hello';
            beforeEach(()=>{
                submitEvt = {
                    preventDefault: jest.fn()
                };
                InsertNoteCmp.setState({content: text});
                formComponent.simulate('submit', submitEvt);
            });

            it('should call the submit prevent default', ()=>{
                expect(submitEvt.preventDefault).toBeCalled();
            });

            it('should send state value to the parent', ()=>{
                expect(onSent).toBeCalledWith({
                    content: text,
                    selected: false
                });
            });

            it('should reset state after submit', ()=>{
                expect(InsertNoteCmp.state()).toEqual({content:""})
            });
        });
    });
   
});