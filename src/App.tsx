import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Nav from './Nav'
import Layout from './Layout'
import styled from 'styled-components'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Inner>
        <Nav/>
        <Layout/>
      </Inner>
    </BrowserRouter>
  );
}

export default App;

const Inner = styled.div`
  width: 94%;
  margin: 0 auto;
  padding: 10px;
  text-align: center;
`