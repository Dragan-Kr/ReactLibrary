import React from 'react'

const SignUp = () => {
    return (
        <>
          <section className='home login'>
            <div className='overlay'>
              <form className='form'>

              <input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Name'
                  required
                />


                
              <input
                  type='text'
                  name='surname'
                  id='surname'
                  placeholder='Surname'
                  required
                />

                 <input
                  type='text'
                  name='address'
                  id='address'
                  placeholder='Address'
                  required
                />


                 <input
                  type='text'
                  name='contact'
                  id='contact'
                  placeholder='Contact'
                  required
                />



                  <input
                  type='text'
                  name='jbmg'
                  id='jbmg'
                  placeholder='JBMG'
                  required
                />








                <input
                  type='text'
                  name='username'
                  id='username'
                  placeholder='Username'
                  required
                />
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Your email address'
                  required
                />
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Enter your password'
                />
                <input
                  type='password'
                  name='password2'
                  id='password2'
                  placeholder='Confirm your password'
                />
                <button type='submit'>Create Your Account</button>
              </form>
            </div>
          </section>
        </>
      )
    }

export default SignUp
