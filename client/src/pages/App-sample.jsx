import logo from '../assets/img/react-logo.svg';
import '../css/App.css';
// import '../css/global.css';
import '@fontsource/karla'

// TODO: why isn't Karla font being applied?

function App() {
  // const karla = {
  //   fontFamily: 'Karla, sans-serif', 
  //   fontWeight: '700'
  // };

  return (
    <div className="App">
      {/* <header className="App-header" style={karla}> */} 
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
