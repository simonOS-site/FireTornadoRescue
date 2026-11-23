import React, { useEffect, useState } from 'react';

const features = [
  { number: '01', title: 'Reinforced body', text: 'A reinforced body concept intended to protect the vehicle in extreme fire and tornado conditions.' },
  { number: '02', title: 'Fire response equipment', text: 'A high-pressure water jet concept designed around a target force of more than 50 kg.' },
  { number: '03', title: 'Water supply', text: 'An integrated water storage concept to support firefighting operations when access is limited.' },
  { number: '04', title: 'Emergency visibility', text: 'Warning lights and clear visual signals help identify the rescue vehicle in difficult conditions.' },
];

function App() {
  const validPages = ['overview', 'vehicle', 'inspiration', 'capabilities', 'mission'];
  const [active, setActive] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('page');
    return validPages.includes(requested) ? requested : 'overview';
  });
  const [missionStep, setMissionStep] = useState(-1);
  const [dispatchStarted, setDispatchStarted] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('T-01');
  const [units, setUnits] = useState([
    {id:'T-01',name:'TEMPEST 01',zone:'Base',status:'READY'},
    {id:'T-02',name:'TEMPEST 02',zone:'Base',status:'STANDBY'},
    {id:'T-03',name:'TEMPEST 03',zone:'Base',status:'STANDBY'}
  ]);
  const [dispatchRound, setDispatchRound] = useState(0);
  const [rescueScore, setRescueScore] = useState(0);
  const [dispatchLog, setDispatchLog] = useState(['19:42 · Incident FT-204 created. Three Tempest units available.']);
  const [dispatchEvent, setDispatchEvent] = useState('A fictional fire-weather incident has been reported across North Ridge. Assign your three Tempests to support the response.');
  const dispatchZones = [
    {id:'Ember Sector',name:'EMBER SECTOR',task:'Fire-response support',desc:'Abstract incident zone'},
    {id:'Ridge Community',name:'RIDGE COMMUNITY',task:'Community support',desc:'People need assistance'},
    {id:'Supply Hub',name:'SUPPLY HUB',task:'Supply and recovery',desc:'Support resources'},
    {id:'Coordination Point',name:'COORDINATION POINT',task:'Team coordination',desc:'Shared incident updates'}
  ];
  const zonePositions = {'Ember Sector':{x:22,y:39},'Ridge Community':{x:78,y:39},'Supply Hub':{x:23,y:77},'Coordination Point':{x:78,y:77}};
  const assignUnit = (zone) => {
    if (!dispatchStarted) return;
    const unitName = units.find(unit=>unit.id===selectedUnit)?.name || selectedUnit;
    setUnits(current=>current.map(unit=>unit.id===selectedUnit?{...unit,zone,status:'EN ROUTE'}:unit));
    setDispatchEvent(`${unitName} is travelling to ${zone}. Its marker will move across the map.`);
    setDispatchLog(current=>[`COMMAND · ${selectedUnit} dispatched to ${zone}.`,...current].slice(0,7));
  };
  useEffect(()=>{
    if(!units.some(unit=>unit.status==='EN ROUTE')) return;
    const timer=setTimeout(()=>setUnits(current=>current.map(unit=>unit.status==='EN ROUTE'?{...unit,status:'SUPPORTING'}:unit)),2200);
    return ()=>clearTimeout(timer);
  },[units]);
  const runDispatchRound = () => {
    const assigned=units.filter(unit=>unit.zone!=='Base');
    if (assigned.length===0) {setDispatchEvent('No units have been assigned yet. Select a Tempest and give it a task first.');return;}
    const score=assigned.length*12 + new Set(assigned.map(u=>u.zone)).size*6;
    setRescueScore(value=>Math.min(100,value+score));
    setDispatchRound(value=>value+1);
    setUnits(current=>current.map(unit=>unit.zone==='Base'?unit:{...unit,status:'SUPPORTING'}));
    const messages=[
      'New community status update received. Review your unit assignments before the next round.',
      'The fictional incident area has changed. Reassign units if you want to cover a different support task.',
      'The response desk reports improved coordination. Continue managing your available units.',
      'The scenario is stabilising. Check that all three units have useful assignments.'
    ];
    setDispatchEvent(messages[dispatchRound%messages.length]);
    setDispatchLog(current=>[`19:${String(50+dispatchRound).padStart(2,'0')} · Response round ${dispatchRound+1} completed. ${assigned.length} units supporting.`,...current].slice(0,7));
  };
  const resetDispatch = () => {
    setDispatchStarted(false);setSelectedUnit('T-01');setDispatchRound(0);setRescueScore(0);
    setUnits([{id:'T-01',name:'TEMPEST 01',zone:'Base',status:'STANDBY'},{id:'T-02',name:'TEMPEST 02',zone:'Base',status:'STANDBY'},{id:'T-03',name:'TEMPEST 03',zone:'Base',status:'STANDBY'}]);
    setDispatchEvent('A fictional fire-weather incident has been reported across North Ridge. Assign your three Tempests to support the response.');
    setDispatchLog(['19:42 · Incident FT-204 created. Three Tempest units available.']);
  };
  const [missionChoice, setMissionChoice] = useState('');
  const [opsPanel, setOpsPanel] = useState('overview');
  const [opsChecks, setOpsChecks] = useState([]);
  const [opsNotice, setOpsNotice] = useState('Operations desk ready. Select a panel or review the incident checklist.');
  const opsChecklist = ['Vehicle concept status reviewed', 'Team coordination update received', 'Community information logged', 'Incident summary prepared'];
  const toggleOpsCheck = (item) => setOpsChecks(current => current.includes(item) ? current.filter(x => x !== item) : [...current, item]);
  const missionStages = [
    { label: 'ALERT RECEIVED', title: 'A warning is issued.', detail: 'A severe fire-weather warning is shared with the response team. The concept vehicle is placed on standby.', status: 'RESPONSE STANDBY' },
    { label: 'TEAMS COORDINATED', title: 'The response is organised.', detail: 'Emergency services coordinate their roles and confirm that the area is being managed by the appropriate authorities.', status: 'TEAMS COORDINATED' },
    { label: 'RESCUE SUPPORT', title: 'Support reaches the scene.', detail: 'The FTR Tempest concept represents a protected platform for supporting crews and helping people reach safety.', status: 'RESCUE SUPPORT' },
    { label: 'SCENARIO COMPLETE', title: 'People are accounted for.', detail: 'The fictional scenario concludes with people moved to safety and response teams continuing their work.', status: 'SCENARIO COMPLETE' },
  ];
  const currentStage = missionStages[missionStep];

  const goTo = (id) => {
    if (!validPages.includes(id)) return;
    setActive(id);
    window.history.pushState({ page: id }, '', id === 'overview' ? window.location.pathname : `?page=${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleBack = () => {
      const requested = new URLSearchParams(window.location.search).get('page');
      setActive(validPages.includes(requested) ? requested : 'overview');
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handleBack);
    return () => window.removeEventListener('popstate', handleBack);
  }, []);

  return (
    <main>
      <header className="site-nav">
        <a className="brand" href="#overview" onClick={() => goTo('overview')}><img className="brand-logo" src="/ftr-logo-white.png" alt="Fire Tornado Rescue Authority logo" /><span>FIRE TORNADO <b>RESCUE AUTHORITY</b></span></a>
        <nav aria-label="Main navigation">
          {['overview', 'vehicle', 'inspiration', 'capabilities', 'mission'].map((id) => <button key={id} className={active === id ? 'nav-link selected' : 'nav-link'} onClick={() => goTo(id)}>{id}</button>)}
        </nav>
      </header>

      {active === 'overview' && (
      <section className="hero" id="overview">
        <div className="hero-copy">
          <div className="eyebrow"><span /> BUILT FOR THE UNTHINKABLE</div>
          <h1>INTO THE<br /><em>STORM.</em><br />TOWARDS<br />SAFETY.</h1>
          <p className="hero-lede">The FTR Tempest is the next generation of technology. It is designed to fight fires in the most dire of places, including fire tornadoes. Its water jet is designed to withstand over 50 kg of force, and its body is designed to drive through extreme tornado conditions.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => goTo('vehicle')}>DISCOVER THE VEHICLE <span>↗</span></button>
            <button className="text-button" onClick={() => goTo('mission')}>EXPLORE THE MISSION <span>↓</span></button>
          </div>
          <div className="hero-meta"><span>01 / 04</span><span>THE FTR Tempest / VEHICLE CONCEPT</span></div>
        </div>
        <div className="hero-art">
          <div className="vehicle-display">
            <img
              className="tempest-render"
              src="/tempest-render.svg"
              alt="FTR Tempest armoured fire rescue vehicle concept"
              loading="eager"
            />
            <div className="vehicle-image-caption">
              <span>FTR TEMPEST / CONCEPT RENDER</span>
              <b>ORIGINAL STUDENT CONCEPT</b>
            </div>
          </div>
        </div>
        <div className="hero-bottom"><span>DESIGN / ENGINEERING / RESCUE</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>
      )}

      {active === 'vehicle' && (
      <section className="intro section" id="vehicle">
        <div className="section-kicker">01 / THE VEHICLE</div>
        <div className="intro-grid">
          <div><h2>ONE VEHICLE.<br /><em>ONE PURPOSE.</em></h2></div>
          <div className="intro-text"><p className="large-copy">Get people to safety when conditions become dangerous.</p><p>Designed for the most demanding environments, the FTR Tempest concept combines a reinforced body with dedicated firefighting equipment. Its water jet is designed around a target force of more than 50 kg, while its body concept aims to withstand extreme tornado conditions. These are design goals for a student concept, not tested performance claims.</p><div className="spec-line"><span>VEHICLE NAME</span><b>FTR Tempest</b></div><div className="spec-line"><span>VEHICLE TYPE</span><b>ARMOURED FIRE RESCUE CONCEPT</b></div><div className="spec-line"><span>DESIGN INSPIRATION</span><b>STORMCHASER × FIRECAT</b></div></div>
        </div>
      </section>
      )}


      {active === 'inspiration' && (
      <section className="inspiration section" id="inspiration">
        <div className="section-kicker">02 / DESIGN INSPIRATION</div>
        <div className="inspiration-heading">
          <h2>IDEAS THAT<br /><em>INSPIRED IT.</em></h2>
          <p>Two real vehicles helped shape different parts of the FTR Tempest concept. One focuses on fire response; the other on observing severe weather.</p>
        </div>
        <div className="inspiration-grid">
          <article className="inspiration-card">
            <a className="inspiration-image" href="https://www.police1.com/police-products/vehicles/specialty/press-releases/lenco-armor-to-display-all-new-bearcat-x3-firecat-at-2017-shot-show-VHnFg7kFnzDrZ3GN/" target="_blank" rel="noreferrer">
              <img src="https://assets.bobitstudios.com/image/upload/f_auto%2Cq_auto%2Cdpr_auto/pm.Lenco-X3-Fire-1MM3996a-em_1759875720443_hcwteq.jpg" alt="Lenco BearCat X3 FireCat demonstrating its firefighting water system" loading="lazy" />
              <span>01 / FIRE RESPONSE</span>
            </a>
            <div className="inspiration-copy">
              <div className="inspiration-meta">ARMOURED FIRE RESPONSE VEHICLE</div>
              <h3>Lenco BearCat X3 FireCat</h3>
              <p>A specialised response vehicle with an onboard water system and a roof-mounted water nozzle.</p>
              <p className="inspiration-takeaway"><b>WHAT INSPIRED THE TEMPEST</b><br />The idea of combining a protected vehicle with dedicated firefighting equipment.</p>
              <a className="inspiration-link" href="https://www.lencoarmor.com/" target="_blank" rel="noreferrer">LENCO / WEBSITE ↗</a>
            </div>
          </article>
          <article className="inspiration-card">
            <a className="inspiration-image" href="https://www.nssl.noaa.gov/tools/observation/" target="_blank" rel="noreferrer">
              <img src="https://www.nssl.noaa.gov/tools/fofs/img/090605_Wyoming6_Coniglio-800.jpg" alt="NOAA National Severe Storms Laboratory field vehicle beneath storm clouds" loading="lazy" />
              <span>02 / STORM RESEARCH</span>
            </a>
            <div className="inspiration-copy">
              <div className="inspiration-meta">MOBILE WEATHER RESEARCH VEHICLE</div>
              <h3>NOAA NSSL Field Vehicle</h3>
              <p>A mobile research vehicle used by storm researchers to observe weather conditions in the field.</p>
              <p className="inspiration-takeaway"><b>WHAT INSPIRED THE TEMPEST</b><br />The focus on studying severe weather and designing around challenging storm environments.</p>
              <a className="inspiration-link" href="https://www.nssl.noaa.gov/tools/observation/" target="_blank" rel="noreferrer">NOAA / RESEARCH ↗</a>
            </div>
          </article>
        </div>
        <p className="inspiration-note">These vehicles are design references only. The FTR Tempest is an original student concept, not a copy of either vehicle.</p>
      </section>
      )}

      {active === 'capabilities' && (
      <section className="capabilities section" id="capabilities">
        <div className="section-kicker">02 / CAPABILITIES</div>
        <div className="cap-heading"><h2>DESIGNED TO<br /><em>RESPOND.</em></h2><p>Every feature has a job. Explore the key ideas behind the FTR Tempest concept.</p></div>
        <div className="feature-grid">{features.map((feature) => <article className="feature" key={feature.number}><span className="feature-number">{feature.number}</span><div className="feature-icon">{feature.number === '01' ? '⬡' : feature.number === '02' ? '✳' : feature.number === '03' ? '◉' : '⌁'}</div><h3>{feature.title}</h3><p>{feature.text}</p><span className="feature-arrow">↗</span></article>)}</div>
      </section>
      )}

      {active === 'mission' && (
      <section className="mission section" id="mission">
        <div className="section-kicker">03 / FTRA OPERATIONS</div>
        <div className="ops-heading">
          <div><div className="eyebrow"><span /> FICTIONAL COMMAND SIMULATOR</div><h2>FTRA <em>DISPATCH.</em></h2></div>
          <div className="ops-live"><i /> SIMULATION ONLY <b>NOT A LIVE SERVICE</b></div>
        </div>
        <div className="dispatch-shell">
          <div className="dispatch-top"><div><span className="ops-dot"/> INCIDENT FT-204 <b>NORTH RIDGE</b></div><span>COMMAND DESK / TRAINING MODE</span></div>
          <div className="dispatch-summary">
            <div><span>INCIDENT PHASE</span><b>{dispatchStarted?'ACTIVE':'READY'}</b></div>
            <div><span>UNITS ON TASK</span><b>{units.filter(u=>u.status==='SUPPORTING').length} / 3</b></div>
            <div><span>RESPONSE ROUND / SUPPORT SCORE</span><b>{dispatchRound} / {rescueScore}%</b></div>
            <div className="dispatch-progress"><i style={{width:rescueScore+'%'}}/></div>
          </div>
          <div className="dispatch-layout">
            <aside className="dispatch-units">
              <div className="dispatch-section-head"><span>YOUR FLEET</span><small>SELECT A UNIT</small></div>
              {units.map(unit=><button key={unit.id} className={'dispatch-unit '+(selectedUnit===unit.id?'selected':'')} onClick={()=>setSelectedUnit(unit.id)}>
                <span className="unit-icon">▰</span><span className="unit-name"><b>{unit.name}</b><small>{unit.zone==='Base'?'At command base':unit.zone}</small></span><i>{unit.status}</i>
              </button>)}
              <div className="dispatch-selected"><span>COMMANDING</span><b>{units.find(u=>u.id===selectedUnit)?.name}</b><small>{dispatchStarted?'Choose a zone on the map to dispatch.':'Start the simulation to issue orders.'}</small></div>
            </aside>
            <div className="dispatch-main">
              <div className="dispatch-map">
                <div className="dispatch-map-grid"/><div className="dispatch-road road-a"/><div className="dispatch-road road-b"/><div className="dispatch-road road-c"/>
                <div className="dispatch-map-title">NORTH RIDGE / LIVE UNIT TRACKING</div>
                <div className="dispatch-map-help">SELECT A UNIT ON THE LEFT, THEN CLICK A DESTINATION</div>
                {dispatchZones.map((zone,i)=><button key={zone.id} className={'dispatch-zone zone-'+i} onClick={()=>assignUnit(zone.id)}><b>{zone.name}</b><small>{units.filter(u=>u.zone===zone.id).map(u=>u.id).join(' · ')||'NO UNITS'}</small></button>)}
                <div className="dispatch-base">FTRA BASE</div>
                {units.map((unit,i)=>{const point=unit.zone==='Base'?{x:50,y:54}:zonePositions[unit.zone];return <div key={unit.id} className={'dispatch-pin '+(unit.status==='EN ROUTE'?'moving':'')} style={{left:`${point.x+(i-1)*3}%`,top:`${point.y+(i-1)*3}%`}}><span>{unit.id}</span><small>{unit.status==='EN ROUTE'?'MOVING':unit.status==='SUPPORTING'?'ON TASK':'READY'}</small></div>})}
                <div className="dispatch-map-foot">SCHEMATIC GAME MAP · NOT FOR NAVIGATION</div>
              </div>
              <div className="dispatch-event"><span className="ops-label">LIVE DISPATCH UPDATE / ROUND {dispatchRound}</span><p>{dispatchEvent}</p></div>
              <div className="dispatch-assignment">
                <div className="dispatch-section-head"><span>01 / GIVE YOUR UNIT AN ORDER</span><small>SELECT A DESTINATION</small></div>
                <div className="dispatch-zone-list">{dispatchZones.map(zone=><button key={zone.id} onClick={()=>assignUnit(zone.id)} className={units.find(u=>u.id===selectedUnit)?.zone===zone.id?'assigned':''}><b>{zone.name}</b><span>{zone.task}</span><small>{zone.desc}</small><i>ASSIGN ↗</i></button>)}</div>
              </div>
              <div className="dispatch-controls">
                {!dispatchStarted?<button className="primary-button" onClick={()=>{setDispatchStarted(true);setDispatchLog(current=>['COMMAND · Simulation started. All three Tempests are ready at base.',...current]);}}>START SIMULATION <span>↗</span></button>:<button className="primary-button" onClick={runDispatchRound}>ADVANCE INCIDENT <span>→</span></button>}
                <button className="dispatch-reset" onClick={resetDispatch}>RESET SCENARIO ↻</button>
              </div>
            </div>
          </div>
          <div className="dispatch-log"><div className="dispatch-section-head"><span>COMMAND LOG</span><small>LATEST UPDATES</small></div>{dispatchLog.map((line,i)=><p key={i}>{line}</p>)}</div>
        </div>
        <p className="disclaimer">Fictional strategy-game simulation. The zones, unit behaviour, score and incident are invented for this student concept. This is not a real emergency dispatch or firefighting tool.</p>
      </section>
      )}
      <footer><a className="brand" href="#overview"><img className="brand-logo" src="/ftr-logo-white.png" alt="FTR tornado logo" /><span>FIRE TORNADO <b>RESCUE</b></span></a><span>FTRA · STUDENT DESIGN PROJECT · CONCEPT ONLY</span><a href="#overview">BACK TO TOP ↑</a></footer>
    </main>
  );
}

export default App;