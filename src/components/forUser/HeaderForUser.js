import React, { useState, useEffect, useRef } from "react";
// import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// import './styles.css';

const HeaderForUser = () => (
  <Router>
    <Navigation />
    <div className='height-100'>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/contact' component={Contact} />
      <Route path='/images' component={Images} />
    </div>
    <BottomNav />
  </Router>
);

const Home = () => <div className='height-100'>
  This is the my favorite example of Navigation with React-Bootstrap,
  React-Router-Dom, and React-Router-Bootstrap.
  Here are the pain points that I have solved with this gist.
  <ul>
    <li>
      You get the option to highliht the Nav Brand when the
      home component is selected.
    </li>
    <li>
      Previously, if you were on the contact page, 
      opened the menu, but then clicked the navbar icon "WEB", 
      when you opened the
      navbar again you would see both 'Home' and 'Contact' highlighted
      when contact item should no longer be highlighted
    </li>
    <li>
      Clicking away from the menu should close it,
      I found a solution thanks to {' '}
      <a href="https://usehooks.com/useOnClickOutside/" rel='noopener noreferrer' target="_blank">usehooks</a>
    </li>
    <li>
      New problem: since clicking away from the menu closes it,
      clicking on the bars menu when the menu is open would close it
      and reopen it. But rn I am hiding that icon when the menu is open
      so this cannot happen.  I would like to find a better solution for this.
      <br />UPDATE: [Solution] If we explicity set the icon inside of
      <code>{' '}Navbar.Toggle{' '}</code> we can give it an 
      <code>{' '}id</code>.
      Then, in our <code>{' '}useOnClickOutside{' '}</code>
      function we can make sure to just return if the id matches the one
      on our toggle icon.
    </li>
  </ul>
</div>;
const About = () => <div>About Page</div>;
const Contact = () => <div>Contact Page</div>;
const Images = () => <div>Images Page</div>;

const BottomNav = () => (
  <Navbar 
    bg="dark" 
    variant="dark"
    className='text-secondary'>
    <span className='text-lowercase'>Web</span>
  </Navbar>
);

const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef();
  function toggleOnClick() {
    setIsExpanded(prev => !prev);
  }
  function closeCollapse() {
    setIsExpanded(false);
  }
  useOnClickOutside(ref, () => setIsExpanded(false));
  return (
    <Navbar
      expanded={isExpanded}
      onSelect={closeCollapse}
      bg="dark"
      variant='dark'
      sticky='top'
      expand="sm"
      collapseOnSelect={true}>
      <Nav><NavBrand to='/' value='Web' /></Nav>
      <Navbar.Toggle
        onClick={toggleOnClick}
        aria-controls="basic-navbar-nav">
        <span id='my-toggle' className="navbar-toggler-icon sm"></span>
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav" ref={ref}>
        <Nav className="mr-auto">
          <NavItem to='/' value='Home' />
          <NavItem to='/about' value='About' />
          <NavItem to='/contact' value='Contact' />
          <NavItem to='/images' value='Images' />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

function useOnClickOutside(ref, cb) {
  useEffect(() => {
    const listener = event => {
      if (
        !ref.current 
        || ref.current.contains(event.target)
        || event.target.id==='my-toggle'
      ) { return; }
      cb(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    }
  }, [ref, cb]);
}

const NavItem = ({ to, value }) => (
  <LinkContainer
    to={to}
    exact={true}
    activeClassName='text-danger'>
    <Nav.Link active={false}>{value}</Nav.Link>
  </LinkContainer>
);

// highlist the nav brand when 'Home' is selected
// const NavBrandHighlight = ({ to, value }) => (
//   <LinkContainer
//     className='navbar-brand'
//     exact={true}
//     activeClassName='text-danger'
//     to={to}>
//     <Nav.Link active={false}>{value}</Nav.Link>
//   </LinkContainer>
// );

const NavBrand = ({ to, value }) => (
  <LinkContainer
    className='navbar-brand'
    exact={true}
    activeClassName='text-danger'
    to={to}
    isActive={()=>false}>
    <Nav.Link active={false}>{value}</Nav.Link>
  </LinkContainer>
);

// const rootElement = document.getElementById("root");
// ReactDOM.render(<HeaderForUser />, rootElement);
export default HeaderForUser