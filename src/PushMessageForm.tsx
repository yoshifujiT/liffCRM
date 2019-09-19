import React, { useState, useEffect } from 'react'
import { animals } from './config/animal-config'
import MultiSelect from './MultiSelect'

type To = Array<{
  value: string;
  label: string;
}>
type Props = {
  votes: {
    all: Array<object>;
    dog: Array<object>;
    cat: Array<object>;
  }
}
type UserIds = {
  dog: Array<string>;
  cat: Array<string>;
}
type Animal = keyof UserIds

const PushMessageForm: React.FC<Props> = (props) => {
  const { votes } = props

  const [to, setTo] = useState<To>([])
  const [selected, setSelected] = useState<Array<Animal>>([])
  const [userIds, setUserIds] = useState<UserIds>({
    dog: [],
    cat: [],
  })

  // 宛先のUserID配列を生成: to
  useEffect(() => {
    const ids = selected.map((animal) => {
      return userIds[animal]
    })
    // uniqueなuid配列
    const basearr = [
      ...new Set(ids.flat())
    ]
    const newTo = basearr.map((a) => {
      return { value: a, label: a }
    })
    setTo(newTo)
  }, [selected, userIds])

  // animalごとのUserID配列を準備: userIds
  useEffect(() => {
    // TODO: anyを使わない実装
    let tmp = userIds
    animals.forEach((key) => {
      const animal: Animal = key as Animal
      // TODO: firestoreから取得した個別ドキュメントの型を入れる
      let newArr = votes[animal].map((vote: any) => {
        return vote.id
      })
      tmp[animal] = newArr
    })
    setUserIds(tmp)
  }, [userIds, votes])

  const toggleSelected = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    const animal = target.name as Animal
    const value: boolean = target.checked
    let newSet = new Set(selected)

    if (value) {
      newSet.add(animal)
    } else {
      newSet.delete(animal)
    }

    setSelected([...newSet])
  }

  return (
    <div>
      <p>Pushメッセージを送信</p>
      <div id="animal_keys">
        {/* <label><input name="all" type="checkbox" onChange={addSelectedAll} />すべて</label> */}
        <label><input name="dog" type="checkbox" onChange={toggleSelected} />犬派</label>
        <label><input name="cat" type="checkbox" onChange={toggleSelected} />猫派</label>
      </div>
      <form action="/push" method="POST">
        <MultiSelect uids={to} />
        <textarea style={{ width: '500px', height: '100px', display: 'block', margin: '0 auto 20px' }} name="message" id="message"></textarea>
        <button>送信する</button>
      </form>
    </div>
  )
}


export default PushMessageForm