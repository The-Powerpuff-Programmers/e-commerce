import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchCurrentOrder,
  increaseQuant,
  decreaseQuant,
  deleteProd
} from '../store/guestCart'

export class GuestCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchCurrentOrder()
  }

  render() {
    console.log('>>>>>>>>>this.props.guestCart: ', this.props.guestCart)

    const guestCartItems = this.props.guestCart.items || {}
    console.log('>>>>>>>>>guestCartItems: ', guestCartItems)
    return (
      <div id="cart">
        <h2>Welcome to your cart</h2>
        {Object.values(guestCartItems).map(product => (
          <div key={product.item.id}>
            {console.log(product.item.id)}
            <img
              src={product.item.imageUrl}
              height="100px"
              width=""
              className="prodThumb"
            />
            <h3>{product.item.title}</h3>
            <p>Subtotal: ${product.item.price / 100}</p>
            <p>Qty: {product.qty}</p>
            <button
              type="button"
              onClick={() => this.props.increaseQuant(product)}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => this.props.decreaseQuant(product)}
            >
              -
            </button>
            <button
              type="button"
              onClick={() => {
                this.props.deleteProd(product)
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    )
  }
}

//Insert name and address form for checkout
const mapState = state => {
  return {guestCart: state.guestCart.cart}
}

const mapDispatch = dispatch => ({
  fetchCurrentOrder: () => dispatch(fetchCurrentOrder()),
  increaseQuant: product => dispatch(increaseQuant(product)),
  decreaseQuant: product => dispatch(decreaseQuant(product)),
  deleteProd: productId => dispatch(deleteProd(productId))
})
export default connect(mapState, mapDispatch)(GuestCart)
