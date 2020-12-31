import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? <Redirect to='/login' /> : <Component {...props} />
    }
  />
);

PrivateRoute.prototype = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(PrivateRoute);
