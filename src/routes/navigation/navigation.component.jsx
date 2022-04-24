import { Fragment, useContext } from 'react';
import {Outlet, Link } from 'react-router-dom';
import {NavigationContainer, NavLink, NavLinks, LogoContainer} from './navigation.styles';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import {signOutUser} from '../../utils/firebase/firebase.utils'


const Navigation = () => {

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/' >
            <CrwnLogo className='logo'></CrwnLogo>
          </LogoContainer>  
          <NavLinks>
            <NavLink className='nav-link' to='/shop'>
                SHOP
            </NavLink>
              {
                currentUser ? (
                  <NavLink as='span' onClick={signOutUser}>
                    {' '}
                    SIGN OUT {' '}
                    </NavLink> 
                    )
                  : (<NavLink className='nav-link' to='/auth'>
                      SIGN IN
                    </NavLink>
                    )    
              }
            <CartIcon />
          </NavLinks>
          {isCartOpen && <CartDropdown />} {/* this is checking if both statements are true. If they are both true, then it will return the last statement (<CartDropdown />), otherwise it wont return anything*/}
        </NavigationContainer>
        <Outlet /> 
      </Fragment>
  
    )
}

export default Navigation;
