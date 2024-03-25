import { useState, useEffect } from "react"

export default function MapOverlay({competitions}){

  const [showing, setShowing] = useState(!!competitions.length);

  useEffect(() => {
    setShowing(!!competitions.length);
  }, [competitions]);

  if(!showing){
    return <></>
  }
  return (
    <div className='map-overlay' >
      <div className='map-overlay-top' >
        <div className="map-overlay-cross" onClick={() => setShowing(false)}>X</div>
      </div>
      {competitions && competitions.length ? 
        <>
          {competitions.map(l => <MapOverlayRow competition={l} />)}
        </> : 
      <></>}
    </div>
  )
}

function MapOverlayRow({competition}){

  return (
    <div className="map-row">
      <p>{competition.name}</p>
    </div>
  )
}