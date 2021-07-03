import { createMuiTheme } from '@material-ui/core/styles';
import { deepOrange, blueGrey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: deepOrange,
  },
  typography: {
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 400,
    h3: {
      color: 'rgba(0, 0, 0, 0.54)',
    },
    h4: {
      color: 'rgba(0, 0, 0, 0.54)',
    },
    caption: {
      color: 'rgba(0, 0, 0, 0.54)',
    },
  },
  /*
  DP - 10/1/2020
  This is not technically part of the options spec, but I think
  we basically expanded this object and use it in several places
  in the code, so I'm making this options object an any for now.
   */
  rootContainer: {
    height: 'calc(100vh - 56px)',
  },
} as any);

export default theme;
