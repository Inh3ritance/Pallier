(this.webpackJsonppaillier=this.webpackJsonppaillier||[]).push([[0],[,,,,function(e,t,a){e.exports=a(11)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),l=a(2),i=a.n(l),c=(a(9),a(3));a(10);class r extends n.a.Component{constructor(){super(),this.state={publicKey:{n:0,g:0},privateKey:{lambda:0,mu:0,publicKey:{}},m1:0,m2:0,c1:0,c2:0,c3:0,d:0,key_size:400},this.handleChangem1=this.handleChangem1.bind(this),this.handleChangem2=this.handleChangem2.bind(this),this.generate_key=this.generate_key.bind(this)}handleChangem1(e){this.setState({m1:e.currentTarget.value})}handleChangem2(e){this.setState({m2:e.currentTarget.value})}async generate_key(){console.time();const{publicKey:e,privateKey:t}=await c.a(this.state.key_size);if(this.setState({publicKey:{n:e.n,g:e.g}}),this.setState({privateKey:{lambda:t.lambda,privateKey:t.mu,publicKey:this.state.publicKey}}),this.state.m1>0&&this.state.m2>0){const a=BigInt(this.state.m1),s=BigInt(this.state.m2),n=e.encrypt(a);this.setState({c1:n});const l=e.encrypt(s);this.setState({c2:l});const i=e.addition(n,l),c=e.multiply(i,2n);this.setState({c3:c});const r=t.decrypt(c);this.setState({d:r}),console.timeEnd()}else this.setState({c1:0}),this.setState({c2:0}),this.setState({c3:0}),this.setState({d:0});console.timeEnd()}render(){return n.a.createElement("div",{className:"App"},n.a.createElement("header",{className:"App-header"},n.a.createElement("h1",null,"Paillier Demo CS 4600"),n.a.createElement("p",{className:"side"},"Message 1:"),n.a.createElement("input",{type:"number",onClick:this.handleChangem1,className:"side"}),n.a.createElement("p",{className:"side"},"Message 2:"),n.a.createElement("input",{type:"number",onClick:this.handleChangem2,className:"side"}),n.a.createElement("div",null,n.a.createElement("p",{className:"side push"},"Key Size(",this.state.key_size,"):"),n.a.createElement("input",{type:"range",min:"1",max:"3720",step:"1",value:this.state.key_size,className:"slider",id:"myRange",onChange:e=>{const t=parseInt(e.target.value,10);this.setState({key_size:t})}})),n.a.createElement("div",null,n.a.createElement("h4",{className:"side push"},"Generate Key:"),n.a.createElement("button",{onClick:this.generate_key,className:"side"},"press me")),n.a.createElement("p",null,"Public Key(n,g): "),n.a.createElement("div",null,n.a.createElement("p",{className:"side push"},"n: "),n.a.createElement("p",{className:"side sol"},this.state.publicKey.n.toString())),n.a.createElement("div",null,n.a.createElement("p",{className:"side push"},"g: "),n.a.createElement("p",{className:"side sol"},this.state.publicKey.g.toString())),n.a.createElement("p",null,"Private Key(lambda): "),n.a.createElement("div",null,n.a.createElement("p",{className:"side push"},"lambda: "),n.a.createElement("p",{className:"side sol"},this.state.privateKey.lambda.toString())),n.a.createElement("p",null,"Encrypted messages m1 and m2: "),n.a.createElement("div",null,n.a.createElement("p",{className:"side push"},"c1: "),n.a.createElement("p",{className:"side sol"},this.state.c1.toString())),n.a.createElement("div",null,n.a.createElement("p",{className:"side push"},"c2: "),n.a.createElement("p",{className:"side sol"},this.state.c2.toString())),n.a.createElement("p",null,"Encrypted messages 2*(c1 + c2): ",n.a.createElement("i",null,"*Note 2 is just an arbitrary Constant to show property of homomorphicism")),n.a.createElement("div",null,n.a.createElement("p",{className:"side push"},"c3: "),n.a.createElement("p",{className:"side sol"},this.state.c3.toString())),n.a.createElement("p",null,"Decrypt c3:"),n.a.createElement("div",null,n.a.createElement("p",{className:"side push"},"d: "),n.a.createElement("p",{className:"side sol"},this.state.d.toString())),n.a.createElement("h6",null,"**Special thanks to the contributor for this package at: https://www.npmjs.com/package/paillier-bigint")))}}var m=r;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(m,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()}).catch(e=>{console.error(e.message)})}],[[4,1,2]]]);
//# sourceMappingURL=main.3e576975.chunk.js.map