import React from 'react';
import Home from "./components/page/Home";
import Background from './components/page/Background';
import './style/App.scss';

function App()  {

    return(
      <div>
        <Home isLoading={false} fetchedData={[]} />
        <Background colors={["#00518B", "#003a5a", "#003a5a", "#00518B"]} />
      </div>
      )
}

export default App;