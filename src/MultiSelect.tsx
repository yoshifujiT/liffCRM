import React, { useState, useEffect } from 'react'
import Creatable from 'react-select/creatable';

type Val = Array<{
  value: string;
  label: string;
}>
type Props = {
  uids: Val;
}

const MultiSelect = (props: Props) => {
  const [uids, setUids] = useState(props.uids)
  const [inputVals, setInputVals] = useState<Val>([])

  useEffect(() => {
    const newArr = inputVals.concat(props.uids)
    setUids(newArr)
  }, [props.uids])

  const handleChange = (newValue: any, actionMeta: any) => {
    const vals = (newValue.filter((val: any) => {
      return ('__isNew__' in val)
    }))
    setInputVals(vals)
    setUids(newValue)
  };

  return (
    <Creatable
      isMulti
      onChange={handleChange}
      value={uids}
      options={uids}
    />
  )
}

export default MultiSelect
