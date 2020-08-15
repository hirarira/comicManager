import React from 'react';
import {Switch, Route} from 'react-router';
import Home from './pages/home';
import Sample from './pages/Sample';
import ComicDetail from './pages/comicDetail';
import createComicInfo from './pages/createComicInfo';

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sample" component={Sample} />
        <Route exact path="/detail/:comicID" component={ComicDetail} />
        <Route exact path="/createComicInfo/:comicID/:volID" component={createComicInfo} />
      </Switch>
    </React.Fragment>
  )
};

export default App;
