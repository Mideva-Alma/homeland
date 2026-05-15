
// Header provides site-wide navigation and branding. Sticky for quick access.
function Header() {

    return (
  
      <header className="header">
        {/* Site title for brand recognition */}
        <h1>Homeland Jobs</h1>
        {/* Navigation links for main app sections */}
        <nav>
          <a href="#">Home</a>
          <a href="#">Jobs</a>
          <a href="#">Post a Job</a>
          <a href="#">Sign In</a>
        </nav>
      </header>
    );
  }
  
  export default Header;