import React from 'react';
import './App.css';
import Content from './components/Content';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const options = ['Lizzo', 'Bad Bunny']
const App = () => {
  return (
    <div className="app">
    <DndProvider backend={HTML5Backend}>
      <Content options={options.sort()}/>
      </DndProvider>
    </div>
  );
};

export default App;