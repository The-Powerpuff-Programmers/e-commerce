import React from 'react'
import {connect} from 'react-redux'
import {
  fetchCurrentOrder,
  increaseQuant,
  decreaseQuant,
  deleteProd
} from '../store/guestCart'
import GuestCheckoutForm from './guest-checkout'

export class GuestCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchCurrentOrder()
  }

  render() {
    const guestCartItems = this.props.guestCart.items || {}
    console.log(`guest cart total: `, this.props.guestCart.totalPrice)
    return (
      <div id="cart">
        {this.props.guestCart.isComplete ? (
          <h2> Purchased Posters </h2>
        ) : (
          <h2>Your Cart</h2>
        )}
        {Object.values(guestCartItems).map(product => (
          <div key={product.item.id}>
            <img
              src={product.item.imageUrl}
              height="100px"
              width=""
              className="prodThumb"
            />
            <h3>{product.item.title}</h3>
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
              Remove Item
            </button>
            <br />
            <br />
            <br />
          </div>
        ))}
        <h3>
          Order Total: $
          {this.props.guestCart.totalPrice
            ? this.props.guestCart.totalPrice / 100
            : 0}
          .00
        </h3>
        {this.props.guestCart.totalQty ? (
          <h3>
            Total Items:
            {this.props.guestCart.totalQty}
          </h3>
        ) : (
          <h3>Your cart is empty!</h3>
        )}

        <hr />

        <GuestCheckoutForm />
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
