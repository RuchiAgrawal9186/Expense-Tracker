import React from 'react'

const Header = () => {
  return <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon">
      </span></button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a className="navbar-brand" href="#">Expense tracker</a>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <a className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </a>
      </ul>
    </div>
  </div>
</nav>

  </>;
}

export default Header