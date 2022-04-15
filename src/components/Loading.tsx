import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className="flex h-3/4 justify-center items-center">
      <img alt="upayments" src="loading.gif" className="w-7 md:w-10" />
    </div>
  )
}

export default Loading;
