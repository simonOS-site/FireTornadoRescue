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
      <div className="topline"><span className="live-dot" /> FTR Tempest <span className="topline-right">FIRE &amp; RESCUE / CONCEPT VEHICLE</span></div>
      <header className="site-nav">
        <a className="brand" href="#overview" onClick={() => goTo('overview')}><span className="brand-mark">F</span><span>FIRE TORNADO <b>RESCUE</b></span></a>
        <nav aria-label="Main navigation">
          {['overview', 'vehicle', 'inspiration', 'capabilities', 'mission'].map((id) => <button key={id} className={active === id ? 'nav-link selected' : 'nav-link'} onClick={() => goTo(id)}>{id}</button>)}
        </nav>
        <button className="nav-cta" onClick={() => goTo('vehicle')}>EXPLORE VEHICLE <span>↗</span></button>
      </header>

      {active === 'overview' && (
      <section className="hero" id="overview">
        <div className="hero-copy">
          <div className="eyebrow"><span /> BUILT FOR THE UNTHINKABLE</div>
          <h1>INTO THE<br /><em>STORM.</em><br />TOWARDS<br />SAFETY.</h1>
          <p className="hero-lede">The FTR Tempest is a next-generation rescue vehicle concept designed for extreme fire environments, including fire tornadoes.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => goTo('vehicle')}>DISCOVER THE VEHICLE <span>↗</span></button>
            <button className="text-button" onClick={() => goTo('mission')}>EXPLORE THE MISSION <span>↓</span></button>
          </div>
          <div className="hero-meta"><span>01 / 04</span><span>THE FTR Tempest / VEHICLE CONCEPT</span></div>
        </div>
        <div className="hero-art" aria-label="Fire and smoke atmosphere">
          <div className="art-grid" />
          <div className="fire-glow" />
          <div className="art-label"><span>FIELD CONCEPT</span><b>FTR Tempest</b></div>
          <div className="vehicle-placeholder model-render">
            <div className="placeholder-top">FTR Tempest / VEHICLE CONCEPT</div>
            <img src="/model.svg" alt="FTR Tempest vehicle concept model" />
            <div className="placeholder-bottom">THE FTR Tempest / ORIGINAL STUDENT CONCEPT</div>
          </div>
          <div className="vertical-caption">ENGINEERED FOR RESCUE · DESIGNED FOR EXTREME CONDITIONS</div>
          <div className="art-index">FTR<span>001</span></div>
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
          <p>Firefighting and severe-weather research vehicles helped shape the direction of this concept. These are references, not vehicles built for the same mission.</p>
        </div>
        <div className="inspiration-grid">
          <article className="inspiration-card">
            <div className="inspiration-image">
              <img src="https://www.lencoarmor.com/wp-content/uploads/2024/01/firecat.png" alt="Lenco FireCat firefighting vehicle" loading="lazy" />
              <span>FIRE RESPONSE</span>
            </div>
            <div className="inspiration-copy">
              <div className="inspiration-meta">REFERENCE 01 / FIRECAT</div>
              <h3>Firefighting capability</h3>
              <p>The FireCat is a firefighting vehicle concept with an onboard water system. It inspired the fire-response side of this project.</p>
              <span className="inspiration-credit">PHOTO: LENCO ARMORED VEHICLES</span>
            </div>
          </article>
          <article className="inspiration-card">
            <a href="https://commons.wikimedia.org/wiki/File:NOAA_NSSL_far_field_vehicle.jpg" target="_blank" rel="noreferrer" className="inspiration-image">
              <img src="https://commons.wikimedia.org/wiki/Special:FilePath/NOAA_NSSL_far_field_vehicle.jpg?width=1200" alt="NOAA NSSL mobile weather research vehicle" loading="lazy" />
              <span>WEATHER RESEARCH</span>
            </a>
            <div className="inspiration-copy">
              <div className="inspiration-meta">REFERENCE 02 / STORM RESEARCH</div>
              <h3>Storm-observation vehicles</h3>
              <p>NOAA research vehicles collect weather observations around storms. This inspired the weather-awareness side of the concept.</p>
              <a className="inspiration-link" href="https://commons.wikimedia.org/wiki/File:NOAA_NSSL_far_field_vehicle.jpg" target="_blank" rel="noreferrer">VIEW PHOTO &amp; CREDIT <span>↗</span></a>
            </div>
          </article>
        </div>
        <p className="inspiration-note">Reference images belong to their respective owners. The FTR Tempest design is an original student concept.</p>
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