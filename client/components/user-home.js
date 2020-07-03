import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, isAdmin} = props
  const orders = props.orders || []
  return (
    <div>
      {isAdmin ? (
        <div>
          <h3>Welcome, {email}! </h3>
          <Link to="/admin/products">Edit Products</Link>
          <br />
          <br />
          <Link to="/admin/users">View Users</Link>
        </div>
      ) : (
        <div>
          <h3>Welcome back, {email}!</h3>
          <hr />
          <h3 className="siteHeader">Past Purchases</h3>
          <br />
          {orders.map(order => (
            <div key={order.id}>
              <h5>
                Date:
                {order.updatedAt.toLocaleString().slice(0, 10)} | Name:
                {order.name} | Order Address: {order.address} | Amount:
                {order.orderTotal} | Items: {order.totalQty}
              </h5>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isAdmin: state.user.isAdmin,
    orders: state.user.orders
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
