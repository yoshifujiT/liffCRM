import React from 'react'
import { Route } from 'react-router-dom'
import Form from './Form'
import Result from './Result'

const Layout: React.FC = () => {
  return (
    <div>
      <Route path='/result' component={Result} />
      <Route path='/form' component={Form} />
    </div>
  )
}

export default Layout
