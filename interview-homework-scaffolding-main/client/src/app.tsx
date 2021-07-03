import React from 'react';
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

import { Nav } from './nav';
import { LandingPage } from './landing-page';

export const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <div>
        <CssBaseline />
        <Nav />
        <Switch>
          <Route
            path={'/'}
            component={LandingPage}
          />
        </Switch>
      </div>
      </Router>
    </ThemeProvider>
);

