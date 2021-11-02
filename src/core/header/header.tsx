import './header.scss';

function CoreHeader() {
  return (
    <header>
      <nav id="nav" className="container header">
        <div className="logo-decorator"></div>
        <a href="" className="logo">
          Paintable
        </a>
        <div className="right-align">
          <button className="secondary-btn">Connect Wallet</button>
        </div>
      </nav>
    </header>
  );
}

export default CoreHeader;
