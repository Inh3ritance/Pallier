import * as paillierBigint from 'paillier-bigint';
import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
        publicKey: { n: 0, g : 0 },
        privateKey: {lambda: 0, mu: 0, publicKey: {}},
        m1: 0,
        m2: 0,
        c1: 0,
        c2: 0,
        c3: 0,
        d: 0,
        key_size:400,
    }
    this.handleChangem1 = this.handleChangem1.bind(this);
    this.handleChangem2 = this.handleChangem2.bind(this);
    this.generate_key = this.generate_key.bind(this);
  }

  handleChangem1(ev){
    this.setState({m1: ev.currentTarget.value});
  }

  handleChangem2(ev){
    this.setState({m2: ev.currentTarget.value});
  }

  async generate_key(){

    console.time();

    const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(this.state.key_size);
    
    this.setState({ publicKey: { n: publicKey.n, g:publicKey.g } });
    this.setState({ privateKey: { lambda: privateKey.lambda, privateKey: privateKey.mu, publicKey: this.state.publicKey } });
  
    if(this.state.m1 > 0  && this.state.m2 > 0){
      // Do not remove BigInt comments below!!! //
      /* global BigInt */
      const m1 = BigInt(this.state.m1);
      const m2 = BigInt(this.state.m2);
    
      // encryption/decryption
      const c1 = publicKey.encrypt(m1)
      this.setState({c1: c1});
      //console.log(privateKey.decrypt(c1)) // 12345678901234567890n
    
      // homomorphic addition of two ciphertexts (encrypted numbers)
      const c2 = publicKey.encrypt(m2)
      this.setState({c2:c2});

      const encryptedSum = publicKey.addition(c1, c2)
      //console.log(privateKey.decrypt(encryptedSum)) // m1 + m2 = 12345678901234567895n
    
      // multiplication by 2n
      const encryptedMul = publicKey.multiply(encryptedSum, 2n);
      this.setState({c3: encryptedMul});

      // Decrypt c3
      const d = privateKey.decrypt(encryptedMul);
      this.setState({d:d});

      console.timeEnd();
    } else {
      this.setState({c1: 0});
      this.setState({c2: 0});
      this.setState({c3: 0});
      this.setState({d: 0});
    }
      console.timeEnd();
  }

  render(){
    return (
        <div className="App">
          <header className="App-header">
            <h1>Paillier Demo CS 3180</h1>
            <p className='side'>Message 1:</p><input type="number" onClick={this.handleChangem1} className='side'/>
            <p className='side'>Message 2:</p><input type="number" onClick={this.handleChangem2} className='side'/>
            <div>
              <p className='side push'>Key Size({this.state.key_size}):</p>
              <input type="range" min="1" max="3720" step="1" value={this.state.key_size}
                className="slider" id="myRange" onChange={(ev) => {
                const x = parseInt(ev.target.value, 10);
                this.setState({key_size: x});
              }}/>
            </div>
            <div>
              <h4 className='side push'>Generate Key:</h4>
              <button onClick={this.generate_key} className='side'>press me</button>
            </div>
            <p>Public Key(n,g): </p>
            <div>
              <p className='side push'>n: </p>
              <p className='side sol'>{this.state.publicKey.n.toString()}</p>
            </div>
            <div>
              <p className='side push'>g: </p>
              <p className='side sol'>{this.state.publicKey.g.toString()}</p>
            </div>
            <p>Private Key(lambda): </p>
            <div>
              <p className='side push'>lambda: </p>
              <p className='side sol'>{this.state.privateKey.lambda.toString()}</p>
            </div>
            <p>Encrypted messages m1 and m2: </p>
            <div>
              <p className='side push'>c1: </p>
              <p className='side sol'>{this.state.c1.toString()}</p>
            </div>
            <div>
              <p className='side push'>c2: </p>
              <p className='side sol'>{this.state.c2.toString()}</p>
            </div>
            <p>Encrypted messages 2*(c1 + c2): <i>*Note 2 is just an arbitrary Constant to show property of homomorphicism</i></p>
            <div>
              <p className='side push'>c3: </p>
              <p className='side sol'>{this.state.c3.toString()}</p>
            </div>
            <p>Decrypt c3:</p>
            <div>
              <p className='side push'>d: </p>
              <p className='side sol'>{this.state.d.toString()}</p>
            </div>
            <h6>**Special thanks to the contributor for this package at: https://www.npmjs.com/package/paillier-bigint</h6>
          </header>
        </div>
      );
  }
}

export default App;
