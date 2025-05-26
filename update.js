
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data.json');

  if (req.method === 'POST') {
    const { id, username, coins, wallet } = req.body;

    let data = [];
    try {
      const file = fs.readFileSync(filePath, 'utf8');
      data = JSON.parse(file);
    } catch (err) {
      data = [];
    }

    const existing = data.find(u => u.id === id);
    if (existing) {
      existing.coins = coins;
      existing.wallet = wallet;
    } else {
      data.push({ id, username, coins, wallet });
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return res.status(200).json({ success: true });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
