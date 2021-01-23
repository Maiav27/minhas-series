import React from 'react'
 import {Navbar, NavbarBrand, Collapse, Nav, NavItem, NavLink} from 'reactstrap'

function App() {
  return (
    <div className="App">
      <Navbar color='light' light expand='md'>
      <NavbarBrand> Minhas Séries</NavbarBrand>
        <Collapse isOpen={true} navbar>
          <Nav className='mlauto' navbar>
            <NavItem >
              <NavLink href='/'> Gêneros </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default App;
