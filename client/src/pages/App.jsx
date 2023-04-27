import React from 'react'
import '@fontsource/karla'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard-sample';
import POSOrderPage from './POSOrderPage';

const mainTheme = createTheme({
  direction: 'ltr',
  typography: {
    fontFamily: 'karla',
    fontWeight: '700'
  }
})

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      {/* <SignUp/> */}
      {/* <SignIn/> */}
      {/* <Dashboard/> */}
      <POSOrderPage/>
    </ThemeProvider>
  );
}

export default App;
