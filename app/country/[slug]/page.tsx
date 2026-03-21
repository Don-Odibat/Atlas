"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import TrustFooter from "../../../components/TrustFooter";

const ANTHEM_NAMES: Record<string, string> = {
  "jordan": "السلام الملكي",
  "united states": "The Star-Spangled Banner",
  "united kingdom": "God Save the King",
  "brazil": "Hino Nacional Brasileiro",
  "france": "La Marseillaise",
  "russia": "Государственный гимн Российской Федерации",
  "china": "义勇军进行曲 (March of the Volunteers)",
  "india": "Jana Gana Mana",
  "japan": "Kimi ga Yo",
  "germany": "Deutschlandlied",
  "greenland": "Nunarput utoqqarsuanngoravit",
  "dr congo": "Debout Congolais",
  "republic of the congo": "La Congolaise",
  "cape verde": "Cântico da Liberdade",
  "western sahara": "Yabaniy Djabal",
  "saint helena, ascension and tristan da cunha": "God Save the King"
};

const LANGUAGES = [
  { code: 'EN', label: 'English', flag: '🇺🇸', wiki: 'en', rc: 'eng' },
  { code: 'RU', label: 'Russian', flag: '🇷🇺', wiki: 'ru', rc: 'rus' },
  { code: 'NL', label: 'Dutch', flag: '🇳🇱', wiki: 'nl', rc: 'nld' },
  { code: 'AR', label: 'Arabic', flag: '🇦🇪', wiki: 'ar', rc: 'ara' },
  { code: 'ZH', label: 'Chinese', flag: '🇨🇳', wiki: 'zh', rc: 'zho' },
  { code: 'HI', label: 'Hindi', flag: '🇮🇳', wiki: 'hi', rc: 'hin' },
  { code: 'FR', label: 'French', flag: '🇫🇷', wiki: 'fr', rc: 'fra' }
];

const translations: Record<string, Record<string, string>> = {
  EN: { back: "BACK TO GLOBE", map: "MAP", play: "PLAY ANTHEM", pause: "TRANSMITTING...", anthemDefault: "National Anthem", officialName: "Official Name", native: "Native", insignia: "Official Insignia", people: "The People & Demographics", pop: "Live Population", density: "Density", lang: "Official Languages", demonym: "Citizens", geo: "Geography & Climate", cap: "Capital", time: "Local Time", temp: "Live Temp", area: "Total Area", region: "Region", borders: "Borders", landlocked: "Landlocked", econ: "Macroeconomics", currency: "Currency", fiat: "Live Fiat", crypto: "Live Crypto", gini: "Wealth Inequality", state: "State & Infrastructure", un: "UN Member", sov: "Sovereignty", drive: "Driving Side", call: "Calling Code", week: "Start of Week", iso: "ISO Codes", tld: "Domain", vehicle: "Vehicle Signs", hist: "Declassified Historical Archives", decrypting: "DECRYPTING ARCHIVES...", uplink: "SECURE UPLINK ESTABLISHED. HISTORY FOR:", adsense: "Google AdSense" },
  RU: { back: "НАЗАД К ГЛОБУСУ", map: "КАРТА", play: "ИГРАТЬ ГИМН", pause: "ПЕРЕДАЧА...", anthemDefault: "Государственный гимн", officialName: "Официальное название", native: "Местное", insignia: "Официальный герб", people: "Люди и демография", pop: "Население", density: "Плотность", lang: "Языки", demonym: "Жители", geo: "География и климат", cap: "Столица", time: "Время", temp: "Температура", area: "Площадь", region: "Регион", borders: "Границы", landlocked: "Нет моря", econ: "Макроэкономика", currency: "Валюта", fiat: "Фиат", crypto: "Крипто", gini: "Неравенство", state: "Инфраструктура", un: "ООН", sov: "Суверенитет", drive: "Движение", call: "Код", week: "Неделя", iso: "ISO", tld: "Домен", vehicle: "Авто коды", hist: "Рассекреченные исторические архивы", decrypting: "РАСШИФРОВКА...", uplink: "СВЯЗЬ УСТАНОВЛЕНА. ИСТОРИЯ:", adsense: "Реклама" },
  NL: { back: "TERUG NAAR WERELDBOL", map: "KAART", play: "SPEEL VOLKSLIED", pause: "VERZENDEN...", anthemDefault: "Volkslied", officialName: "Officiële Naam", native: "Lokaal", insignia: "Officieel Insigne", people: "Mensen & Demografie", pop: "Live Bevolking", density: "Dichtheid", lang: "Talen", demonym: "Inwoners", geo: "Geografie & Klimaat", cap: "Hoofdstad", time: "Lokale Tijd", temp: "Temperatuur", area: "Oppervlakte", region: "Regio", borders: "Grenzen", landlocked: "Ingesloten", econ: "Macro-economie", currency: "Valuta", fiat: "Live Fiat", crypto: "Live Crypto", gini: "Ongelijkheid", state: "Infrastructuur", un: "VN Lid", sov: "Soevereiniteit", drive: "Rijrichting", call: "Belcode", week: "Start Week", iso: "ISO Codes", tld: "Domein", vehicle: "Voertuigen", hist: "Historische Archieven", decrypting: "DECODEREN...", uplink: "BEVEILIGDE VERBINDING. HISTORIE VOOR:", adsense: "AdSense" },
  AR: { back: "العودة إلى الكرة الأرضية", map: "خريطة", play: "تشغيل النشيد", pause: "جارٍ الإرسال...", anthemDefault: "النشيد الوطني", officialName: "الاسم الرسمي", native: "الاسم المحلي", insignia: "الشارة الرسمية", people: "السكان والديموغرافيا", pop: "السكان", density: "الكثافة", lang: "اللغات", demonym: "المواطنون", geo: "الجغرافيا والمناخ", cap: "العاصمة", time: "الوقت", temp: "الحرارة", area: "المساحة", region: "المنطقة", borders: "الحدود", landlocked: "غير ساحلي", econ: "الاقتصاد الكلي", currency: "العملة", fiat: "العملة الورقية", crypto: "العملات الرقمية", gini: "عدم المساواة", state: "البنية التحتية", un: "الأمم المتحدة", sov: "السيادة", drive: "القيادة", call: "رمز الاتصال", week: "الأسبوع", iso: "رموز ISO", tld: "النطاق", vehicle: "المركبات", hist: "أرشيف التاريخ السري", decrypting: "فك التشفير...", uplink: "تم إنشاء اتصال. التاريخ لـ:", adsense: "إعلانات" },
  ZH: { back: "返回地球仪", map: "地图", play: "播放国歌", pause: "传输中...", anthemDefault: "国歌", officialName: "官方名称", native: "本地名称", insignia: "官方国徽", people: "人口与人口统计", pop: "实时人口", density: "密度", lang: "官方语言", demonym: "国民称谓", geo: "地理与气候", cap: "首都", time: "当地时间", temp: "温度", area: "面积", region: "地区", borders: "边界", landlocked: "内陆国", econ: "宏观经济", currency: "货币", fiat: "实时法币", crypto: "实时加密", gini: "财富不平等", state: "国家与基础设施", un: "联合国", sov: "主权", drive: "驾驶方向", call: "区号", week: "每周开始日", iso: "ISO 代码", tld: "域名", vehicle: "车辆", hist: "解密历史档案", decrypting: "正在解密...", uplink: "安全连接已建立。历史：", adsense: "广告" },
  HI: { back: "ग्लोब पर वापस", map: "नक्शा", play: "राष्ट्रगान बजाएं", pause: "प्रसारण...", anthemDefault: "राष्ट्रगान", officialName: "आधिकारिक नाम", native: "मूल", insignia: "आधिकारिक प्रतीक", people: "लोग और जनसांख्यिकी", pop: "जनसंख्या", density: "घनत्व", lang: "भाषाएं", demonym: "नागरिक", geo: "भूगोल और जलवायु", cap: "राजधानी", time: "समय", temp: "तापमान", area: "क्षेत्रफल", region: "क्षेत्र", borders: "सीमाएं", landlocked: "चारों ओर ज़मीन", econ: "अर्थव्यवस्था", currency: "मुद्रा", fiat: "फिएट", crypto: "क्रिप्टो", gini: "असमानता", state: "बुनियादी ढांचा", un: "संयुक्त राष्ट्र", sov: "संप्रभुता", drive: "ड्राइविंग", call: "कॉलिंग कोड", week: "सप्ताह", iso: "आईएसओ", tld: "डोमेन", vehicle: "वाहन", hist: "ऐतिहासिक पुरालेख", decrypting: "डिक्रिप्ट...", uplink: "सुरक्षित लिंक. इतिहास:", adsense: "विज्ञापन" },
  FR: { back: "RETOUR AU GLOBE", map: "CARTE", play: "JOUER L'HYMNE", pause: "TRANSMISSION...", anthemDefault: "Hymne National", officialName: "Nom Officiel", native: "Nom Local", insignia: "Insigne Officiel", people: "Le Peuple & Démographie", pop: "Population", density: "Densité", lang: "Langues Officielles", demonym: "Citoyens", geo: "Géographie & Climat", cap: "Capitale", time: "Heure Locale", temp: "Température", area: "Superficie", region: "Région", borders: "Frontières", landlocked: "Enclavé", econ: "Macroéconomie", currency: "Monnaie", fiat: "Taux Fiat", crypto: "Taux Crypto", gini: "Inégalité", state: "Infrastructure", un: "Membre de l'ONU", sov: "Souveraineté", drive: "Conduite", call: "Indicatif", week: "Semaine", iso: "Codes ISO", tld: "Domaine", vehicle: "Plaques", hist: "Archives Historiques Déclassifiées", decrypting: "DÉCRYPTAGE...", uplink: "LIAISON SÉCURISÉE. HISTOIRE POUR :", adsense: "Publicité" }
};

const LiveClock = memo(({ fallbackTimezones, resolvedTimezone }: { fallbackTimezones: string[], resolvedTimezone?: string }) => {
  const [localTime, setLocalTime] = useState<string>("CALCULATING...");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      if (resolvedTimezone) {
        try {
          setLocalTime(now.toLocaleTimeString('en-US', { timeZone: resolvedTimezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
          return;
        } catch (e) {}
      }
      if (!fallbackTimezones || fallbackTimezones.length === 0) {
         setLocalTime("N/A");
         return;
      }
      const tzString = fallbackTimezones[0];
      let offsetHours = 0, offsetMinutes = 0;
      if (tzString !== "UTC" && tzString !== "UTC+00:00") {
        const sign = tzString.includes("-") ? -1 : 1;
        const cleanStr = tzString.replace("UTC", "").replace("+", "").replace("-", "");
        const parts = cleanStr.split(":");
        offsetHours = parseInt(parts[0]) * sign;
        if (parts.length > 1) offsetMinutes = parseInt(parts[1]) * sign;
      }
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const countryTime = new Date(utc + (3600000 * offsetHours) + (60000 * offsetMinutes));
      setLocalTime(countryTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [fallbackTimezones, resolvedTimezone]);
  return <p className="text-xl lg:text-2xl font-black text-white drop-shadow-lg font-mono tracking-tighter">{localTime}</p>;
});

const LiveDemographics = memo(({ basePopulation }: { basePopulation: number }) => {
  const [sessionBirths, setSessionBirths] = useState(0);
  const [sessionDeaths, setSessionDeaths] = useState(0);
  useEffect(() => {
    if (!basePopulation) return;
    const birthRateSec = Math.max(1, Math.round(31536000 / (basePopulation * 0.015)));
    const deathRateSec = Math.max(1, Math.round(31536000 / (basePopulation * 0.008)));
    const birthInterval = setInterval(() => setSessionBirths(prev => prev + 1), Math.max(100, birthRateSec * 1000));
    const deathInterval = setInterval(() => setSessionDeaths(prev => prev + 1), Math.max(100, deathRateSec * 1000));
    return () => { clearInterval(birthInterval); clearInterval(deathInterval); };
  }, [basePopulation]);
  return (
    <>
      <p className="text-3xl lg:text-4xl font-black text-white drop-shadow-lg relative z-10 flex items-baseline gap-2">
        {(basePopulation + sessionBirths - sessionDeaths).toLocaleString()}
      </p>
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <p className="text-[9px] font-black tracking-widest uppercase text-green-400">Births: +{sessionBirths}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
          <p className="text-[9px] font-black tracking-widest uppercase text-red-400">Deaths: -{sessionDeaths}</p>
        </div>
      </div>
    </>
  );
});

export default function CountryHub() {
  const params = useParams();
  const rawSlug = decodeURIComponent((params?.slug as string) || "");
  
  const [activeLang, setActiveLang] = useState<string>('EN');
  const [langMenuOpen, setLangMenuOpen] = useState<boolean>(false);
  const t = (key: string) => translations[activeLang]?.[key] || translations['EN'][key];
  const langConfig = LANGUAGES.find(l => l.code === activeLang) || LANGUAGES[0];

  const [liveData, setLiveData] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [exchangeRates, setExchangeRates] = useState<{ usd: string, btc: string } | null>(null);
  const [weather, setWeather] = useState<{ tempC: number, timezone: string } | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [historyData, setHistoryData] = useState<string>("");
  const [isHistoryLoading, setIsHistoryLoading] = useState<boolean>(true);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!rawSlug) return;
    fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(rawSlug)}?fullText=true`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
            setLiveData(data[0]);
            setIsFetching(false);
        } else {
            fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(rawSlug)}`)
              .then(res => res.json())
              .then(fallback => {
                  if (Array.isArray(fallback) && fallback.length > 0) setLiveData(fallback[0]);
                  setIsFetching(false);
              }).catch(() => setIsFetching(false));
        }
      })
      .catch(() => setIsFetching(false));
  }, [rawSlug]);

  useEffect(() => {
    if (!liveData?.name?.common) return;
    const fetchHistory = async () => {
      setIsHistoryLoading(true);
      try {
        let wikiName = activeLang === 'EN' ? liveData.name.common : (liveData.translations?.[langConfig.rc]?.common || liveData.name.common);
        if (wikiName.toLowerCase() === "georgia" && activeLang === 'EN') wikiName = "Georgia (country)";
        
        const res = await fetch(`https://${langConfig.wiki}.wikipedia.org/w/api.php?action=query&prop=extracts&titles=${encodeURIComponent(wikiName)}&format=json&origin=*&explaintext=true`);
        const data = await res.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        
        if (pageId !== "-1" && pages[pageId].extract) {
          let cleanText = pages[pageId].extract;
          const metaSections = /\n==\s*(See also|Notes|References|Further reading|External links|Bibliography|Sources|Смотрите также|Примечания|Литература|Ссылки|Zie ook|Externe links|انظر أيضًا|المراجع|参见|参考资料|इन्हें भी देखें|संदर्भ|Voir aussi|Notes et références)\s*==[\s\S]*/i;
          cleanText = cleanText.replace(metaSections, '');
          setHistoryData(cleanText);
        } else {
          setHistoryData(`== ${t('hist')} ==\n\n${t('decrypting')}`);
        }
      } catch (e) {
        setHistoryData("== UPLINK FAILED ==\n\nFailed to establish a secure connection to the historical mainframe.");
      } finally {
        setIsHistoryLoading(false);
      }
    };
    fetchHistory();
  }, [liveData, activeLang]);

  useEffect(() => {
    if (!liveData || !liveData.currencies) return;
    const currencyCode = Object.keys(liveData.currencies)[0];
    async function fetchMarketData() {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        const fiatData = await res.json();
        const localRateToUsd = fiatData?.rates?.[currencyCode];
        const btcRate = fiatData?.rates?.BTC;
        if (localRateToUsd) {
          setExchangeRates({ usd: (1 / localRateToUsd).toFixed(2), btc: btcRate ? ((1 / localRateToUsd) * btcRate).toFixed(8) : "N/A" });
        }
      } catch (e) {}
    }
    fetchMarketData();
  }, [liveData]);

  useEffect(() => {
    if (!liveData) return;
    const lat = liveData.capitalInfo?.latlng?.[0] || liveData.latlng?.[0];
    const lng = liveData.capitalInfo?.latlng?.[1] || liveData.latlng?.[1];
    if (lat === undefined || lng === undefined) return;
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&timezone=auto`)
      .then(res => res.json())
      .then(data => { if (data.current_weather) setWeather({ tempC: data.current_weather.temperature, timezone: data.timezone }); })
      .catch(() => {});
  }, [liveData]);

  const formattedAudioSlug = rawSlug.toLowerCase().replace(/\s+/g, '-');
  const audioUrl = `/audio/anthem/${formattedAudioSlug}.mp3`;

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isAudioPlaying) { 
      audioRef.current.pause(); 
      setIsAudioPlaying(false); 
    } else { 
      audioRef.current.play()
        .then(() => setIsAudioPlaying(true))
        .catch((e) => {
          alert(`MAINFRAME ERROR: Anthem not found.\n\nThe system is looking for exactly:\n"${formattedAudioSlug}.mp3"\n\nMake sure it is inside your "public/audio/anthem" folder.`);
          setIsAudioPlaying(false);
        }); 
    }
  };

  const renderHistory = () => {
    if (!historyData) return null;
    return historyData.split('\n').map((line, idx) => {
      const text = line.trim();
      if (!text) return null;
      if (text.startsWith('===') && text.endsWith('===')) {
        return <h4 key={idx} className="text-lg font-bold text-white mt-8 mb-2 tracking-wide flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> {text.replace(/===/g, '').trim()}</h4>;
      } else if (text.startsWith('==') && text.endsWith('==')) {
        return <h3 key={idx} className="text-2xl md:text-3xl font-black text-blue-400 uppercase tracking-widest mt-12 mb-6 border-b border-white/10 pb-3">{text.replace(/==/g, '').trim()}</h3>;
      } else {
        return <p key={idx} className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 text-justify">{text}</p>;
      }
    });
  };

  const displayCountryName = activeLang === 'EN' ? (rawSlug.charAt(0).toUpperCase() + rawSlug.slice(1)) : (liveData?.translations?.[langConfig.rc]?.common || (rawSlug.charAt(0).toUpperCase() + rawSlug.slice(1)));
  const currencyCode = liveData?.currencies ? Object.keys(liveData.currencies)[0] : null;
  const currencyInfo = currencyCode ? liveData.currencies[currencyCode] : null;
  const flagUrl = liveData?.flags?.svg || "https://flagcdn.com/w320/un.png";
  const bgFlagUrl = liveData?.flags?.svg || "https://flagcdn.com/w1280/un.png";
  const languages = liveData?.languages ? Object.values(liveData.languages).join(", ") : "N/A";
  const rawCountryName = liveData?.name?.common?.toLowerCase() || "";
  const currentAnthemName = ANTHEM_NAMES[rawCountryName] || t('anthemDefault');
  const popDensityKm = liveData?.area ? (liveData.population / liveData.area).toFixed(1) : "N/A";
  const popDensityMi = liveData?.area ? (liveData.population / (liveData.area * 0.386102)).toFixed(1) : "N/A";
  const giniIndex = liveData?.gini ? String(Object.values(liveData.gini)[0]) : "CLASSIFIED";
  const drivingSide = liveData?.car?.side ? String(liveData.car.side).toUpperCase() : "N/A";
  const tld = liveData?.tld ? liveData.tld.join(", ") : "N/A";
  const phoneCode = liveData?.idd?.root ? `${liveData.idd.root}${liveData.idd.suffixes?.[0] || ""}` : "N/A";
  const nativeNameObj = liveData?.name?.nativeName ? Object.values(liveData.name.nativeName)[0] : null;
  const nativeName = nativeNameObj ? (nativeNameObj as any).common : "N/A";
  const mapLink = liveData?.maps?.googleMaps || "#";

  if (isFetching) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-blue-500 font-mono tracking-widest uppercase">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          Decrypting Dossier...
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-screen bg-black text-white font-sans selection:bg-blue-500/30 relative overflow-x-hidden flex flex-col ${activeLang === 'AR' ? 'text-right' : 'text-left'}`} dir={activeLang === 'AR' ? 'rtl' : 'ltr'}>
      <audio ref={audioRef} src={audioUrl} preload="none" />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes breathe { 
          0%, 100% { opacity: 0.15; transform: scale(1); filter: blur(8px); } 
          50% { opacity: 0.6; transform: scale(1.02); filter: blur(2px) brightness(1.2); } 
        }
        .animate-breathe { animation: breathe 12s ease-in-out infinite; }
        .glass-panel { background: rgba(10,10,10,0.7); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .history-scroll::-webkit-scrollbar { width: 6px; }
        .history-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); border-radius: 10px; }
        .history-scroll::-webkit-scrollbar-thumb { background: rgba(234,179,8,0.4); border-radius: 10px; }
        .history-scroll::-webkit-scrollbar-thumb:hover { background: rgba(234,179,8,0.8); }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.6); }
      `}} />

      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-full h-full animate-breathe mix-blend-screen opacity-50" style={{ backgroundImage: `url(${bgFlagUrl})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)' }}></div>
      </div>

      <nav className="w-full border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl sticky top-0 z-50 px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
            <Link href="/" className={`text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 hover:text-white uppercase transition-colors flex items-center gap-2 ${activeLang === 'AR' ? 'flex-row-reverse' : ''}`}>
              <span className="text-blue-500 text-lg">{activeLang === 'AR' ? '→' : '←'}</span> {t('back')}
            </Link>
            <div className={`text-[9px] md:text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 ${activeLang === 'AR' ? 'flex-row-reverse' : ''}`}>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              MAINFRAME SECURED
            </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end relative">
          <div className="relative">
            <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="flex items-center gap-2 border border-gray-700 bg-black/50 px-3 py-2.5 rounded-full hover:bg-white/5 transition-all text-[10px] font-black tracking-widest text-gray-300">
              <span className="text-sm leading-none">{langConfig.flag}</span> {langConfig.code}
            </button>
            {langMenuOpen && (
              <div className="absolute top-full mt-2 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-[100] min-w-[120px]">
                {LANGUAGES.map(lang => (
                  <button key={lang.code} onClick={() => { setActiveLang(lang.code); setLangMenuOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-blue-500/20 text-xs font-bold tracking-widest text-gray-300 hover:text-white transition-colors flex items-center gap-3 border-b border-white/5 last:border-0">
                    <span className="text-lg leading-none">{lang.flag}</span> {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <a href={mapLink} target="_blank" className="text-[10px] font-black tracking-widest text-gray-400 hover:text-white uppercase border border-gray-800 hover:border-white/30 px-4 py-2.5 rounded-full transition-all flex items-center gap-2">
            📍 {t('map')}
          </a>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-[1600px] mx-auto relative z-10 px-4 md:px-8 py-10 pb-24 flex flex-col">
        
        {/* HERO */}
        <div className={`flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-12 border-b border-white/10 pb-10 ${activeLang === 'AR' ? 'md:flex-row-reverse' : ''}`}>
            <div className={`flex flex-col md:flex-row items-center gap-6 text-center ${activeLang === 'AR' ? 'md:flex-row-reverse md:text-right' : 'md:text-left'}`}>
                <img src={flagUrl} alt="Flag" className="w-32 md:w-48 h-auto rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10" />
                <div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-2 text-white drop-shadow-2xl uppercase">{displayCountryName}</h1>
                    <p className="text-sm md:text-base text-gray-400 font-light tracking-widest uppercase mb-1">{t('officialName')}: <span className="text-white font-medium">{liveData?.translations?.[langConfig.rc]?.official || liveData?.name?.official}</span></p>
                    <p className="text-xs text-blue-400 font-mono tracking-widest uppercase">{t('native')}: {nativeName}</p>
                </div>
            </div>
            
            <div className="flex flex-col items-center justify-center glass-panel p-6 rounded-2xl border border-white/5 min-w-[240px]">
                {liveData?.coatOfArms?.svg ? (
                    <>
                        <img src={liveData.coatOfArms.svg} alt="Coat of Arms" className="h-20 md:h-28 w-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] mb-4" />
                        <span className="text-[8px] font-black tracking-[0.2em] text-gray-500 mb-6 uppercase border-b border-white/10 pb-3 w-full text-center">{t('insignia')}</span>
                    </>
                ) : (
                    <span className="text-[8px] font-black tracking-[0.2em] text-gray-500 mb-6 uppercase border-b border-white/10 pb-3 w-full text-center">NO INSIGNIA ON FILE</span>
                )}
                
                <button onClick={toggleAudio} className={`flex items-center justify-center gap-2 w-full border ${isAudioPlaying ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'border-gray-700 bg-black/50'} px-6 py-3 rounded-full hover:bg-white/5 transition-all`}>
                    <div className={`w-2 h-2 rounded-full ${isAudioPlaying ? 'bg-blue-400 animate-ping' : 'bg-gray-500'}`}></div>
                    <span className={`text-[10px] font-black tracking-[0.1em] ${isAudioPlaying ? 'text-blue-400' : 'text-gray-400'}`}>
                        {isAudioPlaying ? t('pause') : t('play')}
                    </span>
                </button>
                <span className="text-[12px] font-black tracking-widest text-blue-400 mt-4 text-center leading-relaxed max-w-[200px]">
                    {currentAnthemName}
                </span>
            </div>
        </div>

        {/* 🟢 THE FLUSH 3-COLUMN MATRIX */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full items-stretch">
            
            {/* 🟢 LEFT FLANK: PEOPLE & GEO (25%) */}
            <div className="xl:col-span-3 flex flex-col gap-2 h-full">
                <div className={`w-full flex items-center gap-3 mb-2 ${activeLang === 'AR' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-1 h-6 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    <h2 className="text-lg font-black tracking-widest uppercase text-gray-200">{t('people')}</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/60 border border-blue-900/30 p-6 rounded-3xl col-span-2 shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-all"></div>
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-4 uppercase">{t('pop')}</h3>
                        {liveData ? <LiveDemographics basePopulation={liveData.population} /> : <span>...</span>}
                    </div>
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-2 flex flex-col justify-center">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('density')}</h3>
                        <p className="text-2xl font-black text-white">{popDensityKm} <span className="text-xs font-light text-gray-400">/ km²</span></p>
                        <p className="text-[10px] font-mono text-gray-400 mt-1">{popDensityMi} / sq mi</p>
                    </div>
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-2 flex flex-col justify-center">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('lang')}</h3>
                        <p className="text-lg font-bold text-white uppercase tracking-wider">{languages}</p>
                    </div>
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-2 flex flex-col justify-center">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('demonym')}</h3>
                        <p className="text-base font-bold text-blue-400 uppercase">{liveData?.demonyms?.eng?.m || "N/A"}</p>
                    </div>
                </div>

                <div className={`w-full flex items-center gap-3 mb-2 ${activeLang === 'AR' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-1 h-6 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    <h2 className="text-lg font-black tracking-widest uppercase text-gray-200">{t('geo')}</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-0">
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-2 flex flex-col justify-center">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('cap')}</h3>
                        <p className="text-2xl font-black text-white">{liveData?.capital ? liveData.capital[0] : "N/A"}</p>
                    </div>
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-1 flex flex-col justify-center">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('time')}</h3>
                        {liveData ? <LiveClock fallbackTimezones={liveData.timezones} resolvedTimezone={weather?.timezone} /> : <span>...</span>}
                    </div>
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-1 flex flex-col justify-center">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('temp')}</h3>
                        <p className="text-xl lg:text-2xl font-black text-white">{weather ? `${weather.tempC}°C` : "..."}</p>
                        <p className="text-[10px] font-mono text-gray-400 mt-1">{weather ? `${Math.round((weather.tempC * 9/5) + 32)}°F` : "..."}</p>
                    </div>
                    
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-2 flex flex-col justify-center">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('area')}</h3>
                        <p className="text-xl font-bold text-white">{liveData ? `${liveData.area.toLocaleString()} km²` : "..."}</p>
                        <p className="text-[10px] font-mono text-gray-400 mt-1">{liveData ? `${Math.round(liveData.area * 0.386102).toLocaleString()} sq mi` : "..."}</p>
                    </div>
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-2 flex flex-col justify-center">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('region')}</h3>
                        <p className="text-lg font-bold text-white">{liveData?.region} <span className="text-gray-400 font-light">/ {liveData?.subregion}</span></p>
                    </div>
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-2 flex flex-col justify-center">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('borders')}</h3>
                        <p className="text-xs font-mono text-white leading-relaxed">{liveData?.borders ? liveData.borders.join(", ") : "ISOLATED LANDMASS / ISLAND"}</p>
                    </div>
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-2 flex flex-col justify-center items-center text-center">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('landlocked')}</h3>
                        <p className={`text-xl font-black ${liveData?.landlocked ? 'text-red-400' : 'text-blue-400'}`}>{liveData?.landlocked ? "YES" : "NO"}</p>
                    </div>
                </div>
            </div>

            {/* 🟢 CENTER COMMAND: HISTORY (50%) - Perfectly stretched & internally scrollable */}
            <div className="xl:col-span-6 flex flex-col h-full min-h-0">
                <div className={`w-full flex items-center gap-4 mb-4 ${activeLang === 'AR' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-1 h-6 bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]"></div>
                    <h2 className="text-xl font-black tracking-widest uppercase text-gray-200">{t('hist')}</h2>
                </div>

                <div className={`bg-black/80 border border-yellow-500/30 p-6 md:p-10 rounded-3xl mb-0 relative shadow-[0_0_40px_rgba(234,179,8,0.05)] flex-1 overflow-y-auto history-scroll min-h-0 ${activeLang === 'AR' ? 'text-right' : 'text-left'}`}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
                    
                    {isHistoryLoading ? (
                       <div className="flex flex-col items-center justify-center py-20 gap-4 font-mono text-yellow-500 tracking-widest text-center h-full">
                          <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                          <p className="animate-pulse">{t('decrypting')}</p>
                       </div>
                    ) : (
                       <article className="prose prose-invert max-w-none">
                         <p className="text-yellow-500 font-mono text-[10px] tracking-widest uppercase mb-8 border-b border-yellow-500/20 pb-4 sticky top-0 bg-black/90 pt-2 backdrop-blur-md z-10">
                           &gt; {t('uplink')} {displayCountryName}
                         </p>
                         {renderHistory()}
                       </article>
                    )}
                </div>
            </div>

            {/* 🟢 RIGHT FLANK: ECON & STATE (25%) */}
            <div className="xl:col-span-3 flex flex-col gap-2 h-full">
                <div className={`w-full flex items-center gap-3 mb-2 ${activeLang === 'AR' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-1 h-6 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                    <h2 className="text-lg font-black tracking-widest uppercase text-gray-200">{t('econ')}</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-2 flex flex-col justify-center">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('currency')}</h3>
                        <p className="text-2xl font-black text-white">{currencyInfo ? `${currencyInfo.symbol} ${currencyInfo.name}` : "..."}</p>
                        <p className="text-[10px] font-mono text-gray-400 mt-2">CODE: {currencyCode}</p>
                    </div>
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-2 flex flex-col justify-center border-b-2 border-b-green-500/50">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">1 {currencyCode || "Unit"} = USD</h3>
                        <p className="text-3xl font-black text-green-400">${exchangeRates?.usd || "..."}</p>
                        <p className="text-[10px] text-gray-500 mt-1 font-mono uppercase">{t('fiat')}</p>
                    </div>
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-2 flex flex-col justify-center border-b-2 border-b-[#F7931A]/50">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">1 {currencyCode || "Unit"} = BTC</h3>
                        <p className="text-2xl font-black text-[#F7931A]">₿ {exchangeRates?.btc || "..."}</p>
                        <p className="text-[10px] text-gray-500 mt-1 font-mono uppercase">{t('crypto')}</p>
                    </div>
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-2">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('gini')}</h3>
                        <p className={`text-xl font-bold ${giniIndex === "CLASSIFIED" ? 'text-gray-500' : 'text-blue-400'}`}>{giniIndex}</p>
                    </div>
                </div>

                <div className={`w-full flex items-center gap-3 mb-2 ${activeLang === 'AR' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-1 h-6 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                    <h2 className="text-lg font-black tracking-widest uppercase text-gray-200">{t('state')}</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-1 flex flex-col justify-center">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('un')}</h3>
                        <p className={`text-xl font-black ${liveData?.unMember ? 'text-green-400' : 'text-red-400'}`}>{liveData?.unMember ? "VERIFIED" : "UNVERIFIED"}</p>
                    </div>
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-1 flex flex-col justify-center">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('sov')}</h3>
                        <p className={`text-lg font-black ${liveData?.independent ? 'text-blue-400' : 'text-gray-500'}`}>{liveData?.independent ? "INDEPENDENT" : "DEPENDENT"}</p>
                    </div>
                    <div className={`bg-black/60 border border-white/5 p-5 rounded-3xl col-span-2 flex justify-between items-center ${activeLang === 'AR' ? 'flex-row-reverse' : ''}`}>
                        <div>
                          <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('drive')}</h3>
                          <p className="text-2xl font-bold text-blue-400">{drivingSide}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                    </div>

                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-2 flex flex-col justify-center">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('call')}</h3>
                        <p className="text-3xl font-mono text-white">+{phoneCode}</p>
                    </div>
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-2 flex flex-col justify-center">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('week')}</h3>
                        <p className="text-2xl font-bold text-white capitalize">{liveData?.startOfWeek || "N/A"}</p>
                    </div>

                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-2 flex flex-col justify-center">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('iso')}</h3>
                        <p className="text-xl font-mono text-white">{liveData?.cca2} / {liveData?.cca3}</p>
                    </div>
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-1 flex flex-col justify-center">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('tld')}</h3>
                        <p className="text-xl font-mono text-blue-400">{tld}</p>
                    </div>
                    <div className="bg-black/60 border border-white/5 p-5 rounded-3xl col-span-1 flex flex-col justify-center">
                        <h3 className="text-[9px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">{t('vehicle')}</h3>
                        <p className="text-xl font-mono text-white">{liveData?.car?.signs ? liveData.car.signs[0] : "N/A"}</p>
                    </div>
                </div>

                {/* 🟢 ANCHORED FLUSH TO THE BOTTOM */}
                <div className="w-full min-h-32 bg-black/80 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center relative overflow-hidden mt-auto mb-0">
                    <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay"></div>
                    <span className={`text-gray-500 font-mono text-xs uppercase tracking-widest font-bold z-10 flex items-center gap-2 ${activeLang === 'AR' ? 'flex-row-reverse' : ''}`}>
                      <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                      {t('adsense')}
                    </span>
                </div>
            </div>

        </div>

      </main>

      <div className="relative z-20 bg-black/90 border-t border-white/10 backdrop-blur-md mt-10">
        <TrustFooter />
      </div>

    </div>
  );
}