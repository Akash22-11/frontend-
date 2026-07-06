(function(){
  const fab = document.getElementById('aiFab');
  const panel = document.getElementById('aiPanel');
  const closeBtn = document.getElementById('aiCloseBtn');
  const body = document.getElementById('aiBody');
  const suggestionsEl = document.getElementById('aiSuggestions');
  const input = document.getElementById('aiInput');
  const sendBtn = document.getElementById('aiSendBtn');
  const footNote = document.getElementById('aiFootNote');

  let open = false;
  let busy = false;

  // ---- knowledge base: environment + website info ----
  const KB = [
    { k: ['what is aqi','aqi mean','define aqi'],
      a: "AQI (Air Quality Index) converts pollutant levels — mainly PM2.5, PM10, NO₂, SO₂, CO, O₃ and NH₃ — into a single 0–500 number so air quality is easy to compare. वायुDrishti follows the CPCB (Central Pollution Control Board) scale used across India." },
    { k: ['category','good satisfactory moderate poor','colour','color','scale','band'],
      a: "CPCB AQI bands: 0–50 Good, 51–100 Satisfactory, 101–200 Moderate, 201–300 Poor, 301–400 Very Poor, 401–500 Severe. These are the colours used across the map and charts on this site." },
    { k: ['pm2.5','pm 2.5','pm10','pm 10','particulate'],
      a: "PM2.5 are fine particles under 2.5 microns — small enough to enter the bloodstream through the lungs. PM10 (under 10 microns) irritates the throat and airways but doesn't penetrate as deep. Sources here include vehicle exhaust, construction dust, brick kilns and open burning." },
    { k: ['health','mask','precaution','safe','asthma','breath','n95'],
      a: "General guidance (not medical advice): above 'Poor' (AQI 200+), sensitive groups — children, elderly, asthma/heart patients — should limit outdoor exertion. Above 'Very Poor' (300+), an N95/N99 mask outdoors and an air purifier indoors are recommended for everyone. Always consult a doctor for personal medical decisions." },
    { k: ['hotspot','how do you find','how detect'],
      a: "Hotspots are found by fusing three signals: low-cost community sensors (PM2.5/PM10), satellite thermal + aerosol data (ISRO INSAT-3D, Sentinel-5P), and citizen photo reports geo-tagged via WhatsApp/SMS. Cross-checking these cuts false alerts by around 68%." },
    { k: ['forecast','predict','24h','24 hour','next hours'],
      a: "The 24-hour forecast chart blends current sensor trends with meteorology (wind direction/speed, temperature inversion patterns) to project how AQI will move through the day — useful for municipal teams to pre-position mist cannons and crews before a peak." },
    { k: ['report','upload photo','whatsapp','send report','smoke','dust'],
      a: "You can report smoke or dust two ways: tap 'Report smoke/dust' on the site to upload a geo-tagged photo, or message a photo directly on WhatsApp (no app needed, works on 2G). Reports feed straight into the alert feed and get cross-checked against sensor/satellite data." },
    { k: ['sensor','how many sensor','network','node'],
      a: "The pilot network currently spans 1,842 low-cost community sensors across 19 cities including Delhi NCR, Mumbai, Bengaluru, Lucknow and Patna. Nodes are solar-powered and mount on existing streetlight poles — no new grid infrastructure needed." },
    { k: ['data source','where data from','isro','sentinel','cpcb'],
      a: "Data is fused from CPCB ground stations, ISRO INSAT-3D satellite imagery, ESA's Sentinel-5P (for NO₂/aerosol columns), and the community sensor + citizen-report network described above." },
    { k: ['ward','rwa','municipal','ulb','sensor for my ward'],
      a: "RWAs and ward offices can request a sensor node be installed in their area via the 'Request sensors for my ward' button in the CTA section near the bottom of the page. Every hotspot, alert and crew dispatch is logged and publicly viewable (RTI-linked) for accountability." },
    { k: ['language','hindi','punjabi','हिन्दी','ਪੰਜਾਬੀ'],
      a: "The citizen reporting card supports English, हिन्दी and ਪੰਜਾਬੀ — tap a language chip in the 'Report' section to switch." },
    { k: ['who built','about this site','what is this','what is vaayu','vaayudrishti'],
      a: "वायुDrishti is a hyperlocal air-quality watch platform for Indian cities. It fuses citizen reports, low-cost sensors and satellite data into a street-level map so municipal teams can catch hotspots — a garbage fire, a brick kiln, a traffic smog trap — before they show up in city-wide averages." },
    { k: ['stubble','burning','kiln','brick kiln','industrial'],
      a: "Major hyperlocal pollution sources tracked on this site include stubble/crop burning (seasonal, esp. Oct–Nov in NCR), brick kilns, foundry/industrial clusters, unregulated garbage burning, and traffic + construction dust at junctions." },
    { k: ['monsoon','rain','rainfall','rainy season'],
      a: "India's southwest monsoon (Jun–Sep) brings the bulk of annual rainfall and typically washes pollutants out of the air, lowering AQI. The northeast/retreating monsoon (Oct–Dec) affects the southeast coast instead. Rain also raises humidity, which can trap ground-level ozone near roads even as PM levels drop." },
    { k: ['wind','wind speed','wind direction','breeze'],
      a: "Wind is one of the biggest levers on hyperlocal AQI. Calm, still air lets pollutants build up right where they're emitted; strong wind disperses them. Wind direction also matters — e.g. winds from the northwest carry stubble-burning smoke into Delhi NCR every autumn. Our 24h forecast factors both speed and direction." },
    { k: ['temperature inversion','inversion','winter smog','fog','smog'],
      a: "Winter smog is largely a temperature-inversion problem: cold, dense air near the ground gets trapped under a warmer layer above it, acting like a lid that stops pollutants from rising and dispersing. This is why AQI in North Indian cities spikes hardest on cold, foggy winter mornings with little wind." },
    { k: ['humidity','moisture'],
      a: "High humidity makes particulate matter absorb moisture and grow heavier/hazier (this is why winter smog often looks like thick fog), while low humidity with wind tends to disperse pollutants faster. Humidity is one of the meteorological inputs in our forecast model." },
    { k: ['season','summer','winter','weather pattern','climate'],
      a: "Seasonal AQI pattern in most Indian cities: winter (Nov–Feb) is worst due to inversions, calm winds, and stubble burning; summer (Mar–Jun) sees dust storms in the north but generally better dispersion; monsoon (Jun–Sep) is cleanest due to rain washout; post-monsoon (Oct–Nov) often spikes again with stubble burning and Diwali firecrackers." },
    { k: ['cyclone','storm','heatwave','extreme weather','imd','weather warning','alert weather'],
      a: "For official cyclone, heatwave, and severe weather warnings, always check the India Meteorological Department (IMD) at mausam.imd.gov.in — वायुDrishti focuses specifically on air quality, not general severe-weather forecasting or emergency warnings." },
    { k: ['todays weather','weather today','current weather','temperature today','how hot','how cold'],
      a: "For live temperature, humidity, and short-term forecasts for your city, tap the weather strip at the top of the dashboard — it pulls current conditions in real time. I can explain how weather affects AQI, but for the exact numbers right now, that live widget is the most accurate source." },
  ];

  function findAnswer(q){
    const s = q.toLowerCase();
    let best = null, bestScore = 0;
    KB.forEach(item=>{
      item.k.forEach(kw=>{
        if(s.includes(kw)){
          const score = kw.length;
          if(score > bestScore){ bestScore = score; best = item.a; }
        }
      });
    });
    return best;
  }

  const FALLBACK = "I don't have a specific answer for that yet, but I can help with: AQI categories & CPCB standards, PM2.5/PM10, health precautions, how hotspots are detected, the 24h forecast, weather's effect on air quality (monsoon, wind, inversions, humidity, seasons), reporting smoke/dust, the sensor network, data sources, or requesting sensors for your ward. Try asking one of those, or check the sections in the nav bar above.";

  const SUGGESTIONS = [
    "What does the AQI colour scale mean?",
    "Is it safe to go outside today?",
    "How are hotspots detected?",
    "How do I report smoke near me?"
  ];

  function renderSuggestions(){
    suggestionsEl.innerHTML = '';
    SUGGESTIONS.forEach(s=>{
      const chip = document.createElement('span');
      chip.className = 'ai-chip';
      chip.textContent = s;
      chip.addEventListener('click', ()=>{ input.value = s; sendMessage(); });
      suggestionsEl.appendChild(chip);
    });
  }

  function addMessage(text, role){
    const row = document.createElement('div');
    row.className = 'ai-msg ' + role;
    const av = document.createElement('div');
    av.className = 'av';
    av.textContent = role === 'bot' ? '✦' : '🙂';
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;
    row.appendChild(av);
    row.appendChild(bubble);
    body.appendChild(row);
    body.scrollTop = body.scrollHeight;
    return row;
  }

  function addTyping(){
    const row = document.createElement('div');
    row.className = 'ai-msg bot';
    row.id = 'aiTypingRow';
    row.innerHTML = '<div class="av">✦</div><div class="bubble"><div class="ai-typing"><span></span><span></span><span></span></div></div>';
    body.appendChild(row);
    body.scrollTop = body.scrollHeight;
  }
  function removeTyping(){
    const t = document.getElementById('aiTypingRow');
    if(t) t.remove();
  }

  function updateFootNote(){
    footNote.textContent = 'Connected to Claude AI · live weather-grounded · answers may be AI-generated';
  }

  // AI backend endpoint. Inside Claude.ai artifacts this keyless call to
  // api.anthropic.com works out of the box. If you deploy this file on your
  // own domain (Vercel/Cloudflare Workers, etc.) this direct browser call
  // will NOT work — browsers can't call api.anthropic.com anonymously from
  // an arbitrary origin, and any key placed here would be exposed anyway.
  // In that case, point ASK_AI_ENDPOINT at your own serverless function
  // (e.g. '/api/ask') that holds the real API key server-side and forwards
  // { question } -> { answer }, and set USE_DIRECT_ANTHROPIC to false.
 const USE_DIRECT_ANTHROPIC = false;
  const ASK_AI_ENDPOINT =
  'https://ecovision-1-fep2.onrender.com/api/v1/ask';
  // ---- Live weather grounding (Open-Meteo, free & keyless) ----
  // Anand Vihar, Delhi NCR — matches the zone this dashboard tracks.
  const WEATHER_LAT = 28.6469, WEATHER_LON = 77.3153;
  const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?latitude=${WEATHER_LAT}&longitude=${WEATHER_LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,wind_direction_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=Asia%2FKolkata&forecast_days=3`;

  const WMO_CODES = {
    0:'clear sky', 1:'mainly clear', 2:'partly cloudy', 3:'overcast',
    45:'fog', 48:'freezing fog', 51:'light drizzle', 53:'moderate drizzle', 55:'dense drizzle',
    61:'slight rain', 63:'moderate rain', 65:'heavy rain', 71:'slight snow', 73:'moderate snow',
    80:'rain showers', 81:'moderate rain showers', 82:'violent rain showers',
    95:'thunderstorm', 96:'thunderstorm with hail', 99:'severe thunderstorm with hail'
  };

  let weatherCache = null;
  let weatherCacheTime = 0;
  const WEATHER_CACHE_MS = 15 * 60 * 1000; // refresh every 15 minutes

  async function getLiveWeather(){
    const now = Date.now();
    if(weatherCache && (now - weatherCacheTime) < WEATHER_CACHE_MS) return weatherCache;
    try{
      const res = await fetch(WEATHER_URL);
      if(!res.ok) throw new Error('weather fetch failed ' + res.status);
      const data = await res.json();
      const c = data.current || {};
      const d = data.daily || {};
      const summary =
        `Live conditions for Anand Vihar, Delhi NCR (as of ${c.time || 'now'}): ` +
        `${c.temperature_2m}°C (feels like ${c.apparent_temperature}°C), ` +
        `${WMO_CODES[c.weather_code] || 'conditions code ' + c.weather_code}, ` +
        `humidity ${c.relative_humidity_2m}%, wind ${c.wind_speed_10m} km/h from ${c.wind_direction_10m}°, ` +
        `precipitation ${c.precipitation}mm. ` +
        `Next 3 days max/min temps: ${(d.temperature_2m_max||[]).map((t,i)=>`${Math.round(t)}°/${Math.round((d.temperature_2m_min||[])[i])}°C`).join(', ')}. ` +
        `Rain chance next 3 days: ${(d.precipitation_probability_max||[]).join('%, ')}%.`;
      weatherCache = summary;
      weatherCacheTime = now;
      return summary;
    } catch(err){
      return null; // fall back gracefully — AI will note live data is unavailable
    }
  }

  const SYSTEM_PROMPT_BASE = "You are Vaayu AI, the assistant embedded in वायुDrishti, a hyperlocal air quality monitoring website for Indian cities (CPCB AQI standards). You are also well-trained on meteorology and weather forecasting fundamentals, especially as they apply to Indian conditions: the southwest monsoon (Jun–Sep) and northeast monsoon, temperature inversions and winter smog, wind speed/direction effects on pollutant dispersion, humidity's effect on particulate matter and haze, heatwaves, dust storms, fog, cyclones, and how each of these interacts with and changes AQI. When live weather data is provided below, use it directly to answer questions about current/forecast conditions — treat it as ground truth, don't say you lack real-time access if it's given. For severe-weather emergencies (cyclone/heatwave warnings), point people to the India Meteorological Department (mausam.imd.gov.in) as the authoritative source, since this site's focus is air quality, not emergency meteorological alerts. Answer briefly (2-5 sentences) and stay on topic: air quality, weather as it relates to air quality, or this website's features (live map, hotspots, 24h forecast, sensor network, citizen reporting via WhatsApp, RWA/ward sensor requests). Do not give individual medical diagnoses; suggest consulting a doctor for personal health decisions.";

  async function buildSystemPrompt(){
    const weather = await getLiveWeather();
    return weather ? `${SYSTEM_PROMPT_BASE}\n\n${weather}` : SYSTEM_PROMPT_BASE;
  }

  async function askClaudeDirect(question){
    const systemPrompt = await buildSystemPrompt();
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 300,
        system: systemPrompt,
        messages: [{ role: 'user', content: question }]
      })
    });
    if(!res.ok) throw new Error('API error ' + res.status);
    const data = await res.json();
    const text = (data.content || [])
      .filter(block => block.type === 'text')
      .map(block => block.text || '')
      .join('')
      .trim();
    return text || FALLBACK;
  }

  async function askViaProxy(question){
    const systemPrompt = await buildSystemPrompt();
    const res = await fetch(ASK_AI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, system: systemPrompt })
    });
    if(!res.ok) throw new Error('API error ' + res.status);
    const data = await res.json();
    return (data.answer || '').trim() || FALLBACK;
  }

  async function askAI(question){
    return USE_DIRECT_ANTHROPIC ? askClaudeDirect(question) : askViaProxy(question);
  }

  async function sendMessage(){
    const q = input.value.trim();
    if(!q || busy) return;
    input.value = '';
    input.style.height = 'auto';
    addMessage(q, 'user');
    busy = true;
    sendBtn.disabled = true;
    addTyping();

    try{
      const answer = await askAI(q);
      removeTyping();
      addMessage(answer, 'bot');
    } catch(err){
      removeTyping();
      addMessage("I couldn't reach the AI assistant just now. Meanwhile: " + (findAnswer(q) || FALLBACK), 'bot');
    }
    busy = false;
    sendBtn.disabled = false;
  }

  function openPanel(){
    open = true;
    panel.classList.add('open');
    if(!body.hasChildNodes()){
      addMessage("Namaste! I'm Vaayu AI — ask me about AQI levels, health precautions, how hotspots are detected, or anything about this site.", 'bot');
      renderSuggestions();
    }
    setTimeout(()=>input.focus(), 150);
  }
  function closePanel(){
    open = false;
    panel.classList.remove('open');
  }

  fab.addEventListener('click', ()=> open ? closePanel() : openPanel());
  closeBtn.addEventListener('click', closePanel);
  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', e=>{
    if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); sendMessage(); }
  });
  input.addEventListener('input', ()=>{
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 80) + 'px';
  });

  updateFootNote();
})();
  const toggle = document.getElementById('themeToggle');
  const knob = document.getElementById('themeKnob');
  const root = document.documentElement;
  toggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    knob.textContent = isDark ? '☾' : '☀';
  });

  document.querySelectorAll('.lang-toggle span').forEach(el=>{
    el.addEventListener('click', ()=>{
      document.querySelectorAll('.lang-toggle span').forEach(s=>s.classList.remove('on'));
      el.classList.add('on');
    });
  });

  // ---- 24h AQI bar chart ----
  (function(){
    const data = [
      165,172,180,195,210,228,245,258,268,272,265,250,
      230,205,180,160,148,142,150,168,190,205,215,222
    ];
    const labels = ['NOW','','','+3H','','','+6H','','','+9H','','','+12H','','','+15H','','','+18H','','','+21H','','+24H'];

    function band(v){
      if(v>400) return 'var(--severe)';
      if(v>300) return 'var(--vpoor)';
      if(v>200) return 'var(--poor)';
      if(v>100) return 'var(--moderate)';
      if(v>50)  return 'var(--satisfactory)';
      return 'var(--good)';
    }

    const max = Math.max(...data);
    const peakIdx = data.indexOf(max);
    const el = document.getElementById('aqiBarChart');
    if(el){
      el.innerHTML = data.map((v,i)=>{
        const h = Math.max(6, (v/max)*100);
        return `<div class="bar-col${i===peakIdx?' peak':''}" style="--i:${i}">
          <span class="bar-val">${v}</span>
          <div class="bar" style="height:${h}%; background:${band(v)};"></div>
          <span class="bar-label">${labels[i]}</span>
        </div>`;
      }).join('');

      const legend = document.createElement('div');
      legend.className = 'chart-legend';
      legend.innerHTML = `
        <span><i style="background:var(--moderate)"></i>100–200 Moderate</span>
        <span><i style="background:var(--poor)"></i>200–300 Poor</span>
        <span><i style="background:var(--vpoor)"></i>300–400 Very Poor</span>
        <span><i style="background:var(--severe)"></i>400+ Severe</span>`;
      el.insertAdjacentElement('afterend', legend);
    }
  })();

  // ---- Weather effect (dark mode embers) disabled — no particles spawned ----
