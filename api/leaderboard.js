import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data.json');
  try {
    const file = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(file);
    const sorted = data.sort((a, b) => b.coins - a.coins).slice(0, 10);
    res.status(200).json(sorted);
  } catch (err) {
    res.status(500).json([]);
  }
}
