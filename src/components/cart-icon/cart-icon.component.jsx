import { useContext } from 'react'

// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import { CartContext } from '../../contexts/cart.context'
import CartItem from '../cart-item/cart-item.component';

import {CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles.jsx';

const CartIcon = () => {
    const { cartItems, isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen); // get the oppposite so we can set the opposite state onClick

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;