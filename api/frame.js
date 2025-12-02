export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Récupérer les données Bitcoin
    const response = await fetch('https://blockchain.info/q/totalbc');
    const data = await response.text();
    const btcSupply = (parseInt(data) / 100000000).toFixed(2);
    
    // Retourner une nouvelle frame avec les données actualisées
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${process.env.VERCEL_URL || 'https://votre-app.vercel.app'}/og-image.png?supply=${btcSupply}" />
          <meta property="fc:frame:button:1" content="🔄 Actualiser" />
          <meta property="fc:frame:post_url" content="${process.env.VERCEL_URL || 'https://votre-app.vercel.app'}/api/frame" />
        </head>
      </html>
    `);
  }
  
  res.status(405).json({ error: 'Method not allowed' });
}
