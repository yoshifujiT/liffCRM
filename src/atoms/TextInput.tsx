import React from 'react'
import styled from 'styled-components'

const TextInput: React.FC<{inputStr: string}> = ({inputStr}) => {
  return (
    <div>
      <Field type="text" name="users" defaultValue={inputStr}/>
    </div>
  )
}

export default TextInput

const Field = styled.input`
  display: block;
  width: 500px;
  margin: 20px auto;
`
