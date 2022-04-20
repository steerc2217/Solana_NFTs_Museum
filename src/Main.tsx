import { useState } from "react"
import "./styles.css"
import House from './House'

const Overlay = () => {
  const [ready, set] = useState(false)
  return (
    <>
      <House />
      <div className="dot" />
      <div className={`fullscreen bg ${ready ? "ready" : "notready"} ${ready && "clicked"}`}>
        <div className="stack">
          <button onClick={() => set(true)}>Enter TreeHouseClub</button>
        </div>
      </div>
    </>
  )
}
export default Overlay;