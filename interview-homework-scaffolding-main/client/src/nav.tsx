import React from 'react';
import { Link } from 'react-router-dom';

import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { LOGO_WITH_NAME_WHITE_PATH } from './config/logo-config';

const styles = (theme: any) => createStyles({
  root: {
    width: '100%',
    height: '56px',
  },
  appBar: {
    backgroundColor: theme.palette.secondary[900],
    color: 'black',
  },
  link: {
    color: 'white',
    height: '64px',
  },
});

interface Props extends WithStyles<typeof styles> {
  width: string;
}

export const Nav = withWidth()(withStyles(styles)(({ classes, width }: Props) => {
  return (
    <div className={classes.root}>
      <AppBar color="default" className={classes.appBar}>
        <Toolbar className="u-display-flex u-justifyContent-spaceBetween">
          <div className="u-display-flex u-alignItems-center">
            <Link to="/" className="u-margin-right-lg">
              <img src={LOGO_WITH_NAME_WHITE_PATH} height={width === 'xs' ? '30' : '50'} alt="Home" />
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}));
