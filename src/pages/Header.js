import React from 'react'
import { Link } from 'react-router-dom'
// import 


const Header = ({ isAuth, signUserOut }) => {
  return (
    <header>
        <h1>1senku1</h1>
        <nav>
          <Link to="/"> Home </Link>

          {!isAuth ? (
            <Link to="/login"> Login </Link>
          ) : (
            <>
              <Link to="/createpost"> Create Post </Link>
              <button onClick={signUserOut}> Log Out</button>
            </>
          )}
        </nav>
      </header>
  )
}

export default Header