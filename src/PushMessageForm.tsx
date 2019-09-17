import React, { useState, useEffect } from 'react'
import { animals } from './config/animal-config'
import MultiSelect from './MultiSelect'

type Votes = {
  all: Array<object>;
  dog: Array<object>;
  cat: Array<object>;
}
type Props = {
  votes: Votes
}
type User_ids = {
  dog: Array<string>;
  cat: Array<string>;
}
type Animal = keyof User_ids

const PushMessageForm: React.FC<Props> = (props: Props) => {
  const { votes } = props

  const [to, setTo] = useState(new Set())
  const [selected, setSelected] = useState(new Set<Animal>())
  const [user_ids, setUserIds] = useState<User_ids>({
    dog: [],
    cat: [],
  })

  useEffect(() => {
    const user_set = to
    const uids = user_ids
    user_set.clear()

    selected.forEach((animal) => {
      const ids = uids[animal]
      ids.forEach((id) => {
        user_set.add(id)
      })
    })
    setTo(user_set)
    
  }, [to, selected, user_ids])

  useEffect(() => {
    // TODO: anyを使わない実装
    // firestoreから取得した個別ドキュメントの型を入れる
    const obj = user_ids
    animals.forEach((key) => {
      const animal: Animal = key as Animal
      votes[animal].forEach((vote: any) => {
        obj[animal].push(vote.id)
      })
    })
    setUserIds(obj)
  }, [user_ids, votes])


  const toggleSelected = (e: React.ChangeEvent, animal: Animal) => {
    const newSet: Set<Animal> = new Set()
    selected.forEach((animal) => {
      newSet.add(animal)
    })

    const target = e.target as HTMLInputElement
    const value: boolean = target.checked
    if (value) {
      newSet.add(animal)
    } else {
      newSet.delete(animal)
    }
    
    setSelected(newSet)
  }

  return (
    <div>
      <p>Pushメッセージを送信</p>
      <div id="animal_keys">
        {/* <label><input name="all" type="checkbox" onChange={addSelectedAll} />すべて</label> */}
        <label><input name="dog" type="checkbox" onChange={(e) => toggleSelected(e, 'dog')} />犬派</label>
        <label><input name="cat" type="checkbox" onChange={(e) => toggleSelected(e, 'cat')} />猫派</label>
      </div>
      <form action="/push" method="POST">
        <MultiSelect uids={[{value: 'hoge', label: 'yoyoyo'}]} />
        <textarea style={{width: '500px', height: '100px', display: 'block', margin: '0 auto 20px'}} name="message" id="message"></textarea>
        <button>送信する</button>
      </form>
    </div>
  )
}


export default PushMessageForm