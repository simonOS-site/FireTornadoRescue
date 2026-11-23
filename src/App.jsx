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
        <a className="brand" href="#overview" onClick={() => goTo('overview')}><img className="brand-logo" src="/ftr-logo.svg" alt="FTR tornado logo" /><span>FIRE TORNADO <b>RESCUE</b></span></a>
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
        <div className="section-kicker">03 / THE MISSION</div>
        <div className="mission-panel">
          <div className="mission-copy">
            <div className="eyebrow"><span /> SIMULATED RESPONSE</div>
            <h2>WHEN THE<br /><em>WARNING</em><br />SOUNDS.</h2>
            <p>A short, fictional scenario showing how the FTR Tempest concept could fit into a coordinated emergency response.</p>
            <div className="mission-actions">
              {missionStep < 0 ? <button className="primary-button" onClick={() => setMissionStep(0)}>BEGIN SIMULATION <span>↗</span></button> : missionStep < missionStages.length - 1 ? <button className="primary-button" onClick={() => setMissionStep((step) => Math.min(step + 1, missionStages.length - 1))}>NEXT STAGE <span>→</span></button> : <button className="primary-button" onClick={() => setMissionStep(-1)}>RUN AGAIN <span>↻</span></button>}
              {missionStep >= 0 && <button className="text-button" onClick={() => setMissionStep(-1)}>RESET SCENARIO</button>}
            </div>
          </div>
          <div className="mission-status">
            <div className="scenario-progress"><div className="scenario-progress-top"><span>RESPONSE TIMELINE</span><b>{missionStep < 0 ? 'READY' : String(missionStep + 1).padStart(2, '0') + ' / 04'}</b></div>
              <div className="scenario-track">{missionStages.map((stage, index) => <span key={stage.label} className={index <= missionStep ? 'complete' : ''} />)}</div>
              {missionStep < 0 ? <div className="scenario-empty"><span className="scenario-symbol">＋</span><h3>Standing by.</h3><p>Start the simulation to follow the four stages of this fictional response.</p></div> : <div className="scenario-detail"><span className="scenario-label">{currentStage.label}</span><h3>{currentStage.title}</h3><p>{currentStage.detail}</p></div>}
            </div>
          </div>
        </div>
        <p className="disclaimer">Fictional demonstration only. This student design concept is not a real emergency service or operational guidance.</p>
      </section>
      )}

      <footer><a className="brand" href="#overview"><span className="brand-mark">F</span><span>FIRE TORNADO <b>RESCUE</b></span></a><span>STUDENT DESIGN PROJECT · CONCEPT ONLY</span><a href="#overview">BACK TO TOP ↑</a></footer>
    </main>
  );
}

export default App;