import { useContext, userContext } from 'react'

import './product-card.styles.scss'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

import { CartContext } from '../../contexts/cart.context'

const ProductCard = ({ product }) => {
    const { imageUrl, name, price } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product)

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
                ADD TO CART
            </Button>
            <div className='footer'> 
                <span className="name">{name}</span> 
                <span className="price">{price}</span>
            </div>
        </div>
    )
}

export default ProductCard;