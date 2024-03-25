
export default function MapOverlay({competitions}){

  if(!competitions.length){
    return <></>
  }
  return (
    <div className='map-overlay' >
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