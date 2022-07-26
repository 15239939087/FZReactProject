import React, { useState } from 'react'
import Demo from '@/components/Class'

function App() {
  const [ count, setCounts ] = useState('')
  const onChange = (e: any) => {
    setCounts(e.target.value + 1)
  }
  return (
    <>
      <Demo />
      <h2>webpack5+react+ts</h2>
      <h3>{count}</h3>
      <h3>{count}</h3>
      <p>受控组件</p>
      <input type="text" value={count} onChange={onChange} />
      <br />
      <p>非受控组件</p>
      <input type="text" />
    </>
  )
}
export default App