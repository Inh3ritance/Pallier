import * as paillierBigint from 'paillier-bigint';
import React, { useState } from 'react';

import './App.css';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
        publicKey: { n: 0, g : 0 },
        privateKey: {lambda: 0, mu: 0, publicKey: {}},
        m1: 0,
        m2: 0,
    }
    this.handleChangem1 = this.handleChangem1.bind(this);
    this.handleChangem1 = this.handleChangem2.bind(this);
  }

  handleChangem1(ev){
    this.setState({m1: ev.target.value});
  }

  handleChangem2(ev){
    this.setState({m2: ev.target.value});
  }

  generate_key = async()=> {
    const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(12);
    
    this.setState({ publicKey: { n: publicKey.n, g:publicKey.g } });
    this.setState({ privateKey: { lambda: privateKey.lambda, privateKey: privateKey.mu, publicKey: this.state.publicKey } });
  
    // Optionally, you can create your public/private keys from known parameters
    // const publicKey = new paillierBigint.PublicKey(n, g)
    // const privateKey = new paillierBigint.PrivateKey(lambda, mu, publicKey)
  
    if(this.state.m1 > 0  && this.state.m2 > 0){
      // Do not remove BigInt comments below!!! //
      /* global BigInt */
      const m1 = BigInt(this.state.m1);
      const m2 = BigInt(this.state.m2);
    
      // encryption/decryption
      const c1 = publicKey.encrypt(m1)
      //console.log(privateKey.decrypt(c1)) // 12345678901234567890n
    
      // homomorphic addition of two ciphertexts (encrypted numbers)
      const c2 = publicKey.encrypt(m2)
      const encryptedSum = publicKey.addition(c1, c2)
      //console.log(privateKey.decrypt(encryptedSum)) // m1 + m2 = 12345678901234567895n
    
      // multiplication by k
      const k = 4n
      const encryptedMul = publicKey.multiply(c1, k)
      //console.log(privateKey.decrypt(encryptedMul))
    } else {
      console.log("values must be > 0")
    }
  }

  render(){
    return (
        <div className="App">
          <header className="App-header">
            <h1>Paillier Demo CS 3180</h1>
            <p className='side push'>Message 1:</p><input type="number" onChange={(ev) => this.handleChangem1(ev)} className='side'/>
            <p className='side push'>Message 2:</p><input type="number" onChange={(ev) => this.handleChangem2(ev)} className='side'/>
            <div>
              <h4 className='side push'>Generate Key:</h4>
              <button onClick={this.generate_key} className='side'>press me</button>
            </div>
            <p>Public Key(n,g): </p>
            <div>
              <p className='side push left'>n: </p>
              <p className="side left">{this.state.publicKey.n.toString()}</p>
            </div>
            <div>
              <p className='side push'>g: </p>
              <p className="side">{this.state.publicKey.g.toString()}</p>
            </div>
            <p>Private Key(lambda): </p>
            <div>
              <p className='side push'>lambda: </p>
              <p className="side">{this.state.privateKey.lambda.toString()}</p>
            </div>
            <h6>**Special thanks to the contributor for this package at: https://www.npmjs.com/package/paillier-bigint</h6>
          </header>
        </div>
      );
  }
}

export default App;
