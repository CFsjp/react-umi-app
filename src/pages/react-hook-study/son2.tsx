import React from "react"

function Son2() {
  const handleClick = (e: React.MouseEvent) => {
    console.log(e)
  }
  return <div onClick={handleClick}>11</div>
}

export default Son2
