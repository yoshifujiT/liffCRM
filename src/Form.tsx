import React from 'react'
import styled from 'styled-components'

const Form: React.FC = () => {
  return (
    <div>
      <Title>あなたはどっち派？</Title>
      <form action="/webhook" method="POST">
        <Check><input type="radio" name="animal" value="dog"/>犬派</Check>
        <Check><input type="radio" name="animal" value="cat"/>猫派</Check>
        <Btn type="submit">投票</Btn>
      </form>
    </div>
  )
}

export default Form

const Title = styled.h1`
  font-size: 22px;
  margin-bottom: 30px;
`
const Check = styled.label`
  font-size: 16px;
  padding: 10px;
  input {
    margin-right: 6px;
  }
`
const Btn = styled.button`
  padding: 10px 0;
  width: 200px;
  border: none;
  background: #ff4949;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  display: block;
  margin: 30px auto 0;
  outline: none;
`