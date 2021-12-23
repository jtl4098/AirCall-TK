import React from 'react';
import ReactDOM from 'react-dom';
import BasicTabs from './Tabs/Tabs.jsx';

import Header from './Header.jsx';

import Tabs from './Tabs/Tabs.jsx';
import '../src/main.css';
const App = () => {
  return (
    <div className='container'>
      <Header/>
      <div className="container-view">
      <Tabs/>
      </div>
    </div>
  );
};

//ReactDOM.render(<App/>, document.getElementById('app'));
const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App tab="home" />);
export default App;
