import * as paillierBigint from 'paillier-bigint';
import React, { useState } from 'react';

import './App.css';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
        publicKey: { n: 0, n2 : 0, q : 0 },
        privateKey: [],
    }
  }

  generate_key = async()=> {
    const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(3072);
    
    this.setState({ publicKey: { n: publicKey.n } })
  
    // Optionally, you can create your public/private keys from known parameters
    // const publicKey = new paillierBigint.PublicKey(n, g)
    // const privateKey = new paillierBigint.PrivateKey(lambda, mu, publicKey)
  
    const m1 = 12345678901234567890n
    const m2 = 5n
  
    // encryption/decryption
    const c1 = publicKey.encrypt(m1)
    //console.log(privateKey.decrypt(c1)) // 12345678901234567890n
  
    // homomorphic addition of two ciphertexts (encrypted numbers)
    const c2 = publicKey.encrypt(m2)
    const encryptedSum = publicKey.addition(c1, c2)
    //console.log(privateKey.decrypt(encryptedSum)) // m1 + m2 = 12345678901234567895n
  
    // multiplication by k
    const k = 10n
    const encryptedMul = publicKey.multiply(c1, k)
    //console.log(privateKey.decrypt(encryptedMul))
  }
  render(){
    console.log(typeof(this.state.publicKey.n));
    return (
        <div className="App">
          <header className="App-header">
            <h1>Paillier Demo CS 3180</h1>
            <div>
              <h4 className='side push'>Generate Key:</h4>
              <button onClick={this.generate_key} className='side'>press me</button>
            </div>
            <p>Public Key: {JSON.stringify(this.state.publicKey.n)}</p>
            <p>Private Key: {this.state.privateKey}</p>
            <h6>**Special thanks to the contributor for this package at: https://www.npmjs.com/package/paillier-bigint</h6>
          </header>
        </div>
      );
  }
}

export default App;
