import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
const Loading = () => {
  const [proxy, setProxy] = useState(false)
  useEffect(() => {
    setTimeout(setProxy(true), 2000);
  }, [])

  return (
    <div className=" flex justify-center items-center">
      {!proxy? 'please troun on proxy':'loading ...'}
      <TailSpin type="puff" color="#689edf" height={550} width={80} />
    </div>
  )
}

export default Loading