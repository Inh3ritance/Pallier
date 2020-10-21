import * as paillierBigint from 'paillier-bigint';
import React, { useState } from 'react';

import './App.css';

function App() {

  const [m1, m2] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Paillier Demo CS 3180</h1>
        <form>
          <label> Name: <input type="text" name="name" /> </label>
          <input type="submit" value="Submit" />
          </form>
        <h6>**Special thanks to the contributor for this package at: https://www.npmjs.com/package/paillier-bigint</h6>
      </header>
    </div>
  );
}

export default App;
