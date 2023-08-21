import React from 'react';
import './App.css';
import logo from './assets/logo.png';
import MainBody from './components/MainBody';
import SearchBar from './components/SearchBar';
import NavigationPane from './components/NavigationPane';
import ArtistProfile from './components/ArtistProfile';
import AutocompleteMenu from './components/AutocompleteMenu';

const options = ['one', 'two']
const App = () => {
  return (
    <div className="app">
      <div className="app-header">
        <h1>My Music App</h1>
        <AutocompleteMenu options={options}/>
      </div>
      <div className="app-content">
        <div className="app-navigation">
          <NavigationPane />
        </div>
        <div className="app-main-body">
          <SearchBar />
          <MainBody />
        </div>
      </div>
      <div className="app-footer">
        <p>Footer content goes here.</p>
      </div>
    </div>
  );
};

export default App;