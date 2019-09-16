import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Nav from './Nav'
import Form from './Form'
import Result from './Result'
import Login from './Login'
import * as firebase from 'firebase/app'
import 'firebase/auth'

const Layout: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      async (user) => {
        setUser(user);
      }
    );
    return unregisterAuthObserver;
  }, []);

  return (
    <BrowserRouter>
      <Inner>
        <Nav />
        <div>
          <Switch>
            <Route exact path='/' component={Form} />
            <Route path='/login' render={() => <Login user={user} />} />
            {
              (user) ?
                <Route exact path="/result" component={Result} />
                : <Redirect to='/login' />
            }
          </Switch>
        </div>
      </Inner>
    </BrowserRouter>
  )
}

export default Layout

const Inner = styled.div`
  width: 94%;
  margin: 0 auto;
  padding: 10px;
  text-align: center;
`