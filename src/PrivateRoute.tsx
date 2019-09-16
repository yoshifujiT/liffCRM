import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as firebase from 'firebase/app'
import 'firebase/auth'

type Props = {
  component: any;
  path: string;
}

const PrivateRoute = ({ component: Component, path }: Props) => {
  return (
    <Route
      path={path}
      render={props =>
        firebase.auth().currentUser ? (
          <Component {...props} />
        ) : (
            <Redirect to='/login' />
          )
      }
    />
  );
}

export default PrivateRoute