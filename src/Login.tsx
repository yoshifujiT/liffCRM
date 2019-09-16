import React, { useState } from 'react'
import styled from 'styled-components'
import useReactRouter from 'use-react-router'
import * as firebase from 'firebase/app'
import 'firebase/auth'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { history } = useReactRouter()

  return (
    <div>
      <Field>id : <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} /></Field>
      <Field>pass : <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} /></Field>
      <button onClick={() => loginUser(email, password, history)}>ログイン</button>
    </div>
  )
}

const Field = styled.label`
  display: block;
  width: 500px;
  margin: 0 auto;
`

export default Login

const loginUser = (email: string, password: string, history: any) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user: object) => {
      history.push('/result')
    }).catch((err) => {
      console.log(err)
      window.alert('ログインに失敗しました')
    })
}

