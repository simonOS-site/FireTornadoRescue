import React, { useState } from 'react';

const features = [
  { number: '01', title: 'Reinforced body', text: 'A protective outer structure designed around the vehicle concept and the harsh conditions it is intended to face.' },
  { number: '02', title: 'Fire response equipment', text: 'Firefighting equipment and hose systems designed to support emergency crews.' },
  { number: '03', title: 'Water supply', text: 'An integrated water storage concept to support firefighting operations when access is limited.' },
  { number: '04', title: 'Emergency visibility', text: 'Warning lights and clear visual signals help identify the rescue vehicle in difficult conditions.' },
];

function App() {
  const [active, setActive] = useState('overview');
  const [missionStarted, setMissionStarted] = useState(false);

  const goTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <div className="topline"><span className="live-dot" /> CONCEPT VEHICLE <span className="topline-right">FIRE &amp; RESCUE / PROJECT 01</span></div>
      <header className="nav">
        <a className="brand" href="#overview" onClick={() => setActive('overview')}><span className="brand-mark">F</span><span>FIRE TORNADO <b>RESCUE</b></span></a>
        <nav aria-label="Main navigation">
          {['overview', 'vehicle', 'inspiration', 'capabilities', 'mission'].map((id) => <button key={id} className={active === id ? 'nav-link selected' : 'nav-link'} onClick={() => goTo(id)}>{id}</button>)}
        </nav>
        <button className="nav-cta" onClick={() => goTo('vehicle')}>EXPLORE VEHICLE <span>↗</span></button>
      </header>

      <section className="hero" id="overview">
        <div className="hero-copy">
          <div className="eyebrow"><span /> BUILT FOR THE UNTHINKABLE</div>
          <h1>INTO THE<br /><em>STORM.</em><br />TOWARDS<br />SAFETY.</h1>
          <p className="hero-lede">A rescue vehicle concept combining the storm-chasing spirit of a StormChaser with the firefighting purpose of an armoured FireCat.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => goTo('vehicle')}>DISCOVER THE VEHICLE <span>↗</span></button>
            <button className="text-button" onClick={() => goTo('mission')}>EXPLORE THE MISSION <span>↓</span></button>
          </div>
          <div className="hero-meta"><span>01 / 04</span><span>FIRE TORNADO RESCUE PROJECT</span></div>
        </div>
        <div className="hero-art" aria-label="Fire and smoke atmosphere">
          <div className="art-grid" />
          <div className="fire-glow" />
          <div className="art-label"><span>FIELD CONCEPT</span><b>FTR / 001</b></div>
          <div className="vehicle-placeholder model-render">
            <div className="placeholder-top">YOUR VEHICLE / 3D MODEL</div>
            <img src="/model.svg" alt="Fire Tornado Rescue vehicle concept model" />
            <div className="placeholder-bottom">FTR / ORIGINAL STUDENT CONCEPT</div>
          </div>
          <div className="vertical-caption">ENGINEERED FOR RESCUE · DESIGNED FOR EXTREME CONDITIONS</div>
          <div className="art-index">FTR<span>001</span></div>
        </div>
        <div className="hero-bottom"><span>DESIGN / ENGINEERING / RESCUE</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="intro section" id="vehicle">
        <div className="section-kicker">01 / THE VEHICLE</div>
        <div className="intro-grid">
          <div><h2>ONE VEHICLE.<br /><em>ONE PURPOSE.</em></h2></div>
          <div className="intro-text"><p className="large-copy">Get people to safety when conditions become dangerous.</p><p>Fire Tornado Rescue is a concept for an emergency response vehicle designed around a simple idea: bring protection, firefighting capability and rescue support together in one platform.</p><div className="spec-line"><span>VEHICLE TYPE</span><b>ARMOURED FIRE RESCUE CONCEPT</b></div><div className="spec-line"><span>DESIGN INSPIRATION</span><b>STORMCHASER × FIRECAT</b></div></div>
        </div>
      </section>


      <section className="inspiration section" id="inspiration">
        <div className="section-kicker">02 / DESIGN INSPIRATION</div>
        <div className="inspiration-heading">
          <h2>IDEAS THAT<br /><em>INSPIRED IT.</em></h2>
          <p>Firefighting and severe-weather research vehicles helped shape the direction of this concept. These are references, not vehicles built for the same mission.</p>
        </div>
        <div className="inspiration-grid">
          <article className="inspiration-card">
            <a href="https://www.lencoarmor.com/vehicle/firecat/" target="_blank" rel="noreferrer" className="inspiration-image">
              <img src="https://www.lencoarmor.com/wp-content/uploads/2024/01/firecat.png" alt="Lenco FireCat firefighting vehicle" loading="lazy" />
              <span>FIRE RESPONSE</span>
            </a>
            <div className="inspiration-copy">
              <div className="inspiration-meta">REFERENCE 01 / FIRECAT</div>
              <h3>Firefighting capability</h3>
              <p>The FireCat is a firefighting vehicle concept with an onboard water system. It inspired the fire-response side of this project.</p>
              <a className="inspiration-link" href="https://www.lencoarmor.com/vehicle/firecat/" target="_blank" rel="noreferrer">VIEW OFFICIAL FIRECAT <span>↗</span></a>
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
        <p className="inspiration-note">Reference images belong to their respective owners. The Fire Tornado Rescue design is an original student concept.</p>
      </section>

      <section className="capabilities section" id="capabilities">
        <div className="section-kicker">02 / CAPABILITIES</div>
        <div className="cap-heading"><h2>DESIGNED TO<br /><em>RESPOND.</em></h2><p>Every feature has a job. Explore the key ideas behind the Fire Tornado Rescue concept.</p></div>
        <div className="feature-grid">{features.map((feature) => <article className="feature" key={feature.number}><span className="feature-number">{feature.number}</span><div className="feature-icon">{feature.number === '01' ? '⬡' : feature.number === '02' ? '✳' : feature.number === '03' ? '◉' : '⌁'}</div><h3>{feature.title}</h3><p>{feature.text}</p><span className="feature-arrow">↗</span></article>)}</div>
      </section>

      <section className="mission section" id="mission">
        <div className="section-kicker">03 / THE MISSION</div>
        <div className="mission-panel">
          <div className="mission-copy"><div className="eyebrow"><span /> SIMULATED RESPONSE</div><h2>WHEN THE<br /><em>WARNING</em><br />SOUNDS.</h2><p>Explore a fictional response scenario and see how the vehicle concept fits into a coordinated rescue effort.</p><button className="primary-button" onClick={() => setMissionStarted(!missionStarted)}>{missionStarted ? 'RESET SCENARIO' : 'START SCENARIO'} <span>↗</span></button></div>
          <div className="mission-status"><div className="radar"><div className="radar-ring ring-a" /><div className="radar-ring ring-b" /><div className="radar-sweep" /><span className="radar-point point-a" /><span className="radar-point point-b" /></div><div className="status-card"><span>SCENARIO STATUS</span><b className={missionStarted ? 'status-active' : ''}>{missionStarted ? 'SIMULATION ACTIVE' : 'STANDING BY'}</b><small>{missionStarted ? 'Concept response sequence initiated.' : 'Awaiting mission start.'}</small></div></div>
        </div>
        <p className="disclaimer">This is a student design concept. It is not a real emergency vehicle or operational guidance.</p>
      </section>

      <footer><a className="brand" href="#overview"><span className="brand-mark">F</span><span>FIRE TORNADO <b>RESCUE</b></span></a><span>STUDENT DESIGN PROJECT · CONCEPT ONLY</span><a href="#overview">BACK TO TOP ↑</a></footer>
    </main>
  );
}

export default App;