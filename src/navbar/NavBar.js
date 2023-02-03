import './NavBar.css';

export const NavBar = () => {
  return (
    <nav className='navb'>
      <div className='logo'>Aura</div>
      <div className='panel'>
        <a href='//:0'>Home</a>
        <a href='//:0'>Events</a>
        {/* <a href='//:0'></a> */}
      </div>
      <div className='user-pane'>
        <a href='//:0'>Login</a>
      </div>
    </nav>
  );
};
