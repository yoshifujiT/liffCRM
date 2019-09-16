import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import useReactRouter from 'use-react-router'
import * as firebase from 'firebase/app'
import 'firebase/auth'

const Nav = () => {
  const [uid, setUid] = useState()
  const { history } = useReactRouter()

  firebase.auth().onAuthStateChanged((user) => {
    let uid = user ? user.uid : null

    if (uid) {
      setUid(uid)
    }
  })

  return (
    <Navlist>
      <Navitem><Link to='/'>Form</Link></Navitem>
      {(() => {
        if (uid) {
          return (
            <div>
              <Navitem><Link to='/result'>Result</Link></Navitem>
              <Navitem><button onClick={() => logout(history)}>Loguout</button></Navitem>
            </div>
          )
        } else {
          return (
            <div>
              <Navitem><Link to='/login'>Login</Link></Navitem>
            </div>
          )
        }
      })()}
    </Navlist>
  )
}

export default Nav

const Navlist = styled.div`
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
`
const Navitem = styled.div`
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
`

const logout = (history: any) => {
  firebase.auth().signOut()
    .then(() => {
      window.location.href = '/login'
    }).catch(function (err) {
      console.log(err)
      window.alert('ログアウトに失敗しました')
    });
}