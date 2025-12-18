// Vercel Serverless function for weather proxy
// Supports: /api/weather?type=adcode  (AMap ip)
//           /api/weather?type=weather&city=xxx  (AMap weather)
//           /api/weather?type=other  (第三方备用接口)

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  const { type, city } = req.query || {};
  const key = process.env.VITE_WEATHER_KEY; // server-side key, set in Vercel (no VITE_ prefix)

  try {
    if (type === "adcode") {
      if (!key) return res.status(500).json({ error: "WEATHER_KEY not configured" });
      const r = await fetch(`https://restapi.amap.com/v3/ip?key=${key}`);
      const data = await r.json();
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.status(200).json(data);
    }

    if (type === "weather") {
      if (!key) return res.status(500).json({ error: "WEATHER_KEY not configured" });
      if (!city) return res.status(400).json({ error: "city parameter required" });
      const r = await fetch(
        `https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${encodeURIComponent(city)}`,
      );
      const data = await r.json();
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.status(200).json(data);
    }

    if (type === "other") {
      const r = await fetch("https://api.oioweb.cn/api/weather/GetWeather");
      const data = await r.json();
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.status(200).json(data);
    }

    return res.status(400).json({ error: "invalid type" });
  } catch (err) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
