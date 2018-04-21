import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { connect } from 'react-redux';



  class FetchProvider extends Component {

    render() {
      return (
        <div>
          <Header as='h1' textAlign='center'> This is a Provider's Info: </Header>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return{
      provider: state.providers.currentProvider,
    }
  }

export default connect(mapStateToProps)(FetchProvider);
