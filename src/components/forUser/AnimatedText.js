import React from 'react';
import { Wave } from 'react-animated-text';
import {Link} from 'react-router-dom';
const exampleStyle = {
  display: 'inline-block',
  border: '1px solid #ccc',
  marginBottom: '1em',
  padding: '2em 1em 1em 1em',
  width: '80%',
  fontSize: '1.5rem',
}

const codeDivStyle = {
  backgroundColor: '#eee',
  marginTop: '2em',
  padding: '1px 1em',
  overflow: 'scroll',
  fontSize: '1rem',
};

const codeStyle = {
  textAlign: 'left'
};


 const AnimatedText = () => (
  <div style={exampleStyle}>
    <Wave text="Maksima Gorkog 6,Novi Sad" effect="stretch" effectChange={2.0} />

    <div style={codeDivStyle}>
      <pre style={codeStyle}>
        {/* &lt;Wave<br />
        &nbsp;&nbsp;text="LOADING DATA"<br />
        &nbsp;&nbsp;effect="stretch"<br />
        &nbsp;&nbsp;effectChange={2.0}<br />
      

        /> */}
          <Link to="/about">About</Link>

      </pre>
    </div>
  </div>
)

export default AnimatedText