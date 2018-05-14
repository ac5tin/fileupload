import React from 'react';
import 'bulma/css/bulma.css';


const NavBurger = ({dataTarget}) =>{
    return(
        <div className="navbar-burger burger" data-target={dataTarget} onClick={toggleActive}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

const toggleActive = e =>{
    //e.target.classList.toggle('is-active');
    //document.getElementById(e.target.dataset.target).classList.toggle('is-active');
    try{
        const navburger = e.target;
        const navMenu = document.getElementById(navburger.dataset.target);
        navburger.classList.toggle('is-active');
        navMenu.classList.toggle('is-active');  
    }catch(err){
        //console.log(err);
    }
}

export default NavBurger;
