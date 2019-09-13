import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import styled from 'styled-components'
import Nav from './Nav'
import Form from './Form'
import Result from './Result'

const Layout: React.FC = () => {
  return (
    <BrowserRouter>
      <Inner>
        <Nav />
        <div>
          <Route exact path='/' component={Form} />
          <Route path='/result' component={Result} />
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