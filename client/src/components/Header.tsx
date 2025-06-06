import { Link } from 'react-router-dom';
import { type MouseEvent } from 'react';
import Auth from './../utils/auth';

const Header = () => {
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Logs the user out by calling the logout method from Auth
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Symbol Sense</h1>
          </Link>
          <p className="m-0">The Emoji Guessing Game</p>
        </div>
        <div>
          {/* Checking if the user is logged in to conditionally render profile link and logout button */}
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {/* Retrieving the logged-in user's profile to display the username */}
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
              <Link className="btn btn-lg btn-light m-2" to="/randomemoji">
                Emoji Guesser
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/addemoji">
                Add Emoji
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/updateemoji">
                Update Emoji
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/removeemoji">
                Remove Emoji
              </Link>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;