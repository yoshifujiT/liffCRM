import React, { useState } from 'react'
import Creatable from 'react-select/creatable';

type Props = {
  uids: Array<{
    value: string;
    label: string;
  }>;
}

const MultiSelect = (props: Props) => {
  const [uids, setUids] = useState(props.uids)
  const handleChange = (newValue: any, actionMeta: any) => {
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