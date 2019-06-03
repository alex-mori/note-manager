import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('App component', ()=>{
  let AppComponent;
  beforeEach(()=>{
    AppComponent = shallow(<App />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('InsertNote sub component',()=>{
    let InsertNote;
    beforeEach(()=>{
      InsertNote = AppComponent.find('InsertNote');
    });

    it('should contain InsertNote sub component', ()=>{
      expect(InsertNote.length).toBe(1);
    });

    it('should update the state list on onSent callback call', ()=>{
      const inputList = [{content: ''}, {content: ''}, {content: ''}];
      inputList.forEach(input=>{
        InsertNote.props().onSent(input);
      });
      expect(AppComponent.state().list).toEqual(inputList);
    });
  })

  describe('FilterTypeSelector sub component',()=>{
    let FilterTypeSelector;
    beforeEach(()=>{
      FilterTypeSelector = AppComponent.find('FilterTypeSelector');
    });

    it('should contain FilterTypeSelector sub component', ()=>{
      expect(FilterTypeSelector.length).toBe(1);
    });
  });

  describe('DisplayNotes sub component',()=>{
    let DisplayNotes;
    beforeEach(()=>{
      DisplayNotes = AppComponent.find('DisplayNotes');
    });

    it('should contain DisplayNotes sub component', ()=>{
      expect(AppComponent.find('DisplayNotes').length).toBe(1); 
    });
  });
});
