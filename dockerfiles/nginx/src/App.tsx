import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Sample from './pages/Sample';
import ComicDetail from './pages/comicDetail';
import createComicInfo from './pages/createComicInfo';
import createComic from './pages/createComic';
import AuthorManager from './pages/authotManager';
import ComicAboutEdit from './pages/comicAboutEdit';

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Router basename={'/comicManager'}>
          <Route exact path="/" component={Home} />
          <Route exact path="/sample" component={Sample} />
          <Route exact path="/detail/:comicID" component={ComicDetail} />
          <Route exact path="/editComicAbout/:comicID" component={ComicAboutEdit} />
          <Route exact path="/createComicInfo/:comicID/:volID" component={createComicInfo} />
          <Route exact path="/createComic" component={createComic} />
          <Route exact path="/authorManager" component={AuthorManager} />
        </Router>
      </Switch>
    </React.Fragment>
  )
};

export default App;
