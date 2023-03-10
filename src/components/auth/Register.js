import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname:'',
    address:'',
    contact:'',
    jbmg:'',
    username:'',
    email: '',
    password: '',
    password2: ''
  });

  const { name,surname,address,contact,jbmg,username, email, password, password2 } = formData;

  // Spread operator ... copy
  // Using name of input as a key
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    // preventDefault prevents the ongoing link
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger'); // 'danger' defined in App.css
    } else {
      register({ name,surname,address,contact,jbmg,username, email, password });
    }
  };

  // Redirect after registering
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Create Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Surname'
            name='surname'
            value={surname}
            onChange={e => onChange(e)}
          />
        </div>

  


        <div className='form-group'>
          <input
            type='address'
            placeholder=' Address'
            name='address'
            value={address}
            onChange={e => onChange(e)}
          /></div>


          
        <div className='form-group'>
          <input
            type='contact'
            placeholder=' contact'
            name='contact'
            value={contact}
            onChange={e => onChange(e)}
          /></div>

        <div className='form-group'>
          <input
            type='jbmg'
            placeholder=' jbmg'
            name='jbmg'
            value={jbmg}
            onChange={e => onChange(e)}
          /></div>

        <div className='form-group'>
          <input
            type='username'
            placeholder=' username'
            name='username'
            value={username}
            onChange={e => onChange(e)}
          /></div>


      <div className='form-group'>
          <input
            type='email'
            placeholder=' email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          /></div>







          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
