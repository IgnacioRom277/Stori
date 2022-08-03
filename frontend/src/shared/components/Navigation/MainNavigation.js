import React from 'react';
import Header from './Header/Header';
import NavLinks from './NavLinks/NavLinks';
import './MainNavigation.css'

const MainNavigation = () => {
	return (
		<React.Fragment>
			<Header>
				<h1 className='main-navigation__title'>
					Newsletter Manager
				</h1>
				<nav className="main-navigation__section-nav">
					<NavLinks />
				</nav>
			</Header>
		</React.Fragment>
	)
}

export default MainNavigation;