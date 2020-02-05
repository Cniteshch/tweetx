import React, { Component } from 'react';
import { connect } from 'react-redux';
import {CLIENT_ROOT_URL} from '../../actions'
import PropTypes from 'prop-types'
import cookie from 'react-cookie'

export default function ( ComposedComponent ) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object,
    }

    componentDidMount() {
      if (!cookie.load('token')) {
        window.location = `${CLIENT_ROOT_URL}`
      }
    }

    componentWillUpdate( nextProps ) {
      if ( !nextProps.authenticated ) {
         window.location = `${CLIENT_ROOT_URL}`
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps( state ) {
    return {
      authenticated: state.auth.authenticated
    };
  }

  return connect( mapStateToProps )( Authentication );
}
