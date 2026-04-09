export default async function handler(req, res) {
  const { lamin, lamax, lomin, lomax } = req.query;
  const params = new URLSearchParams();
  if (lamin) params.set('lamin', lamin);
  if (lamax) params.set('lamax', lamax);
  if (lomin) params.set('lomin', lomin);
  if (lomax) params.set('lomax', lomax);

  const username = process.env.OPENSKY_USERNAME;
  const password = process.env.OPENSKY_PASSWORD;
  const headers = {};
  if (username && password) {
    headers['Authorization'] = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
  }

  try {
    const url = `https://opensky-network.org/api/states/all?${params.toString()}`;
    const response = await fetch(url, { headers, signal: AbortSignal.timeout(30000) });

    if (!response.ok) {
      return res.status(response.status).json({ error: `OpenSky returned ${response.status}` });
    }

    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(data);
  } catch (e) {
    return res.status(502).json({ error: e.message });
  }
}
