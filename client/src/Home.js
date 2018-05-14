import React, { Component } from 'react';

// load css
import 'bulma/css/bulma.css';
import './public/css/App.css';

// load components
import MainNav from './components/navigation/mainNav';

// load sections
import Intro from './components/sections/intro';
import FileDropzone from './components/sections/FileDropzone';
import Examples from './components/sections/examples';


class Home extends Component {
  render() {
    return (
      <div className="Home">
          <MainNav />

          <Intro />
          <FileDropzone />
          <Examples />

      </div>
    );
  }
}

export default Home;
