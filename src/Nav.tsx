import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Nav = () => {
  return (
    <Navlist>
      <Navitem><Link to='/form'>Form</Link></Navitem>
      <Navitem><Link to='/result'>Result</Link></Navitem>
    </Navlist>
  )
}

export default Nav

const Navlist = styled.ul`
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
`
const Navitem = styled.li`
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
`