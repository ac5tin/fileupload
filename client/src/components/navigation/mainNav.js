import React, {Component} from 'react';
import 'bulma/css/bulma.css';

// import components
import NavBurger from './navBurger';

class MainNav extends Component{
    render(){
        return(
            <nav className="navbar is-dark">
                <div className="navbar-brand">
                    <a className="navbar-item" href="">
                        <h1 className="title" id="mainNavTitle">DownMe.xyz</h1>
                    </a>
                    <NavBurger dataTarget="navMenu" />
                    
                </div>{/* end of .navbar-brand */}
                <div className="navbar-menu" id="navMenu">
                    <div className="navbar-end">
                        <a className="navbar-item" href="">Home</a>
                        <a className="navbar-item" href="#examples">Examples</a>
                    </div>
                </div>{/* end of .navbar-menu#navMenu */}
            </nav>
        );
    }
}

export default MainNav;
