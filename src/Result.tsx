import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { firebaseConfig } from './config/firebase-config'
import PushMessageForm from './PushMessageForm'

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()

type Votes = {
  all: Array<object>;
  dog: Array<object>;
  cat: Array<object>;
}

const Result: React.FC<Votes> = () => {

  const [votes, setVotes] = useState<Votes>({
    all: [],
    dog: [],
    cat: [],
  })

  useEffect(() => {
    const fn = async () => {
      const votes = await getVotes()
      setVotes(votes)
    }
    fn()
  }, [])

  return (
    <div>
      <div>総投票数: {votes.all.length || ""}</div>
      <div>犬派：{votes.dog.length || ""}</div>
      <div>猫派：{votes.cat.length || ""}</div>
      <PushMessageForm votes={votes}/>
    </div>
  )
}

export default Result

const getVotes: () => Promise<Votes> = async () => {
  const votesRef = await db.collection("votes");

  const allRef = await votesRef.get()
  const dogRef = await votesRef.where('animal', '==', 'dog').get()
  const catRef = await votesRef.where('animal', '==', 'cat').get()

  const all = allRef.docs
  const dog = dogRef.docs
  const cat = catRef.docs

  return ({
    all,
    dog,
    cat,
  })
}
