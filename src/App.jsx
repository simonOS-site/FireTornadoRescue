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
          <div><div className="eyebrow"><span /> FICTIONAL TRAINING SCENARIO</div><h2>FTRA <em>OPERATIONS.</em></h2></div>
          <div className="ops-live"><i /> SIMULATION ENVIRONMENT <b>OFFLINE / SAFE MODE</b></div>
        </div>
        <div className="ops-dashboard">
          <div className="ops-topbar"><div><span className="ops-dot" /> INCIDENT CONTROL <b>FT-204</b></div><span>SIMULATED DATA · NOT A LIVE SERVICE</span></div>
          <div className="ops-grid">
            <aside className="ops-sidebar">
              <div className="ops-card incident-card"><span className="ops-label">INCIDENT STATUS</span><strong className={missionStep < 0 ? 'status-standby' : missionStep >= 3 ? 'status-closed' : 'status-active'}>{missionStep < 0 ? 'STANDBY' : missionStep >= 3 ? 'RESOLVED' : 'ACTIVE'}</strong><div className="ops-rule" /><span className="ops-label">LOCATION</span><b>North Ridge · Sector 04</b><span className="ops-label">CONDITIONS</span><b className="condition">Severe fire weather</b><span className="ops-label">UNIT</span><b>FTR TEMPEST · 01</b></div>
              <div className="ops-card timeline-card"><span className="ops-label">RESPONSE TIMELINE</span>{['Alert received','Situation review','Team coordination','Scenario complete'].map((label,i)=><div className={'ops-timeline-row '+(missionStep>=i?'done':'')} key={label}><span>{String(i+1).padStart(2,'0')}</span><b>{label}</b><i /></div>)}</div>
            </aside>
            <div className="ops-main">
              <div className="ops-map">
                <div className="map-grid" /><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-zone"><span>SECTOR 04</span><b>!</b></div><div className="map-marker marker-one">FTR-01</div><div className="map-marker marker-two">SAFE ZONE</div><div className="map-coordinates">37° 42' S&nbsp;&nbsp; 145° 08' E</div><div className="map-caption">SCHEMATIC AREA VIEW · NOT FOR NAVIGATION</div>
                <div className="map-status-tag">{opsPanel === 'vehicle' ? 'VEHICLE VIEW' : opsPanel === 'teams' ? 'TEAM BOARD' : opsPanel === 'comms' ? 'COMMS FEED' : 'INCIDENT OVERVIEW'}</div>
              </div>
              <div className="ops-console">
                <div className="ops-tabs">
                  {['overview','vehicle','teams','comms'].map(tab => <button key={tab} className={opsPanel===tab?'active':''} onClick={()=>setOpsPanel(tab)}>{tab}</button>)}
                </div>
                {opsPanel === 'overview' && <div className="ops-console-content"><div><span className="ops-label">INCIDENT CHECKLIST</span><h3>Operations desk tasks</h3><p>Complete the fictional desk checks to build the incident record. These are project-interface interactions, not real emergency procedures.</p></div><div className="ops-checklist">{opsChecklist.map((item,i)=><button key={item} className={opsChecks.includes(item)?'checked':''} onClick={()=>toggleOpsCheck(item)}><span>{opsChecks.includes(item)?'✓':String(i+1).padStart(2,'0')}</span><b>{item}</b><i>{opsChecks.includes(item)?'LOGGED':'MARK COMPLETE'}</i></button>)}</div><div className="ops-progress-line"><span>{opsChecks.length} / {opsChecklist.length} logged</span><div><i style={{width:(opsChecks.length/opsChecklist.length*100)+'%'}} /></div></div></div>}
                {opsPanel === 'vehicle' && <div className="ops-console-content"><span className="ops-label">FTR TEMPEST · UNIT 01</span><h3>Vehicle concept monitor</h3><p>Explore the fictional vehicle status board. The values below are illustrative design-screen indicators, not tested specifications.</p><div className="ops-metric-grid"><div><b>READY</b><span>Concept status</span></div><div><b>ONLINE</b><span>Display systems</span></div><div><b>STANDBY</b><span>Mission state</span></div></div><button className="ops-tool-button" onClick={()=>setOpsNotice('FTR Tempest concept report opened. All displayed indicators are fictional.')}>OPEN VEHICLE REPORT ↗</button></div>}
                {opsPanel === 'teams' && <div className="ops-console-content"><span className="ops-label">COORDINATION BOARD</span><h3>Response team overview</h3><p>Review the fictional teams represented in this scenario.</p><div className="ops-team-list"><div><b>FTRA CONCEPT UNIT</b><span className="team-ready">AVAILABLE</span></div><div><b>COMMUNITY LIAISON</b><span className="team-active">UPDATING</span></div><div><b>REGIONAL COORDINATION</b><span className="team-ready">CONNECTED</span></div></div><button className="ops-tool-button" onClick={()=>setOpsNotice('Team board refreshed. Three fictional team entries are now displayed.')}>REFRESH TEAM BOARD ↻</button></div>}
                {opsPanel === 'comms' && <div className="ops-console-content"><span className="ops-label">INCOMING COMMUNICATIONS</span><h3>Message centre</h3><div className="ops-message"><time>19:48 · REGIONAL DESK</time><p>“Status updates are being consolidated for the North Ridge scenario.”</p></div><div className="ops-message"><time>19:53 · COMMUNITY LIAISON</time><p>“Public information notice has been recorded in the scenario log.”</p></div><button className="ops-tool-button" onClick={()=>setOpsNotice('Message centre checked. No new fictional messages.')}>CHECK FOR UPDATES ↻</button></div>}
                <div className="ops-notice"><span className="ops-dot" />{opsNotice}</div>
              </div>
              <div className="ops-briefing">
                <div className="ops-briefing-copy"><span className="ops-label">{missionStep < 0 ? 'INCOMING ALERT · 19:42' : missionStep === 0 ? 'SITUATION REVIEW · 19:46' : missionStep === 1 ? 'COORDINATION UPDATE · 19:51' : 'MISSION REPORT · 20:08'}</span>
                  <h3>{missionStep < 0 ? 'A severe fire-weather alert has been received.' : missionStep === 0 ? 'The situation is being assessed.' : missionStep === 1 ? 'Response teams are coordinating.' : 'The scenario is complete.'}</h3>
                  <p>{missionStep < 0 ? 'A fictional fire tornado warning has been reported near North Ridge. FTRA has been asked to demonstrate how the FTR Tempest concept could support a coordinated response.' : missionStep === 0 ? 'Before the vehicle is assigned a support role, the response team needs to establish shared priorities. Choose the first coordination task.' : missionStep === 1 ? (missionChoice === 'teams' ? 'The response desk has confirmed that agencies are sharing updates and responsibilities. A safe, coordinated response is now being organised.' : 'The response desk has confirmed that community status updates are being shared with the coordinating agencies. A safe, coordinated response is now being organised.') : 'The fictional response has concluded. Teams have checked that people are accounted for, and the FTR Tempest has returned to standby. No real emergency actions are being simulated.'}</p>
                  {missionStep === 0 && <div className="ops-choices"><button onClick={()=>setMissionChoice('teams')} className={missionChoice==='teams'?'chosen':''}><span>01</span><b>Coordinate response teams</b><small>Share roles and establish a common response picture.</small></button><button onClick={()=>setMissionChoice('community')} className={missionChoice==='community'?'chosen':''}><span>02</span><b>Check community status</b><small>Confirm that public information and welfare updates are being shared.</small></button></div>}
                  <div className="ops-actions">{missionStep < 0 ? <button className="primary-button" onClick={()=>setMissionStep(0)}>ACKNOWLEDGE ALERT <span>↗</span></button> : missionStep === 0 ? <button className="primary-button" disabled={!missionChoice} onClick={()=>setMissionStep(1)}>CONFIRM PRIORITY <span>→</span></button> : missionStep === 1 ? <button className="primary-button" onClick={()=>setMissionStep(3)}>CLOSE SCENARIO <span>→</span></button> : <button className="primary-button" onClick={()=>{setMissionStep(-1);setMissionChoice('')}}>RESET SIMULATION <span>↻</span></button>}{missionStep >= 0 && missionStep < 3 && <button className="ops-reset" onClick={()=>{setMissionStep(-1);setMissionChoice('')}}>RESET</button>}</div>
                </div>
                <div className="ops-log"><span className="ops-label">DISPATCH LOG</span><div><time>19:42</time><p>Alert received from regional monitoring.</p></div>{missionStep>=0&&<div><time>19:46</time><p>FTRA operations desk acknowledged incident.</p></div>}{missionStep>=1&&<div><time>19:51</time><p>{missionChoice==='teams'?'Agency coordination':'Community status'} priority confirmed.</p></div>}{missionStep>=3&&<div><time>20:08</time><p>Scenario closed. Unit returned to standby.</p></div>}</div>
              </div>
            </div>
          </div>
        </div>
        <p className="disclaimer">Fictional interactive demonstration only. FTRA and the FTR Tempest are student concepts, not real emergency services. The map, times and incident data are fictional.</p>
      </section>
      )}

      <footer><a className="brand" href="#overview"><img className="brand-logo" src="/ftr-logo-white.png" alt="FTR tornado logo" /><span>FIRE TORNADO <b>RESCUE</b></span></a><span>FTRA · STUDENT DESIGN PROJECT · CONCEPT ONLY</span><a href="#overview">BACK TO TOP ↑</a></footer>
    </main>
  );
}

export default App;