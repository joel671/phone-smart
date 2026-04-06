import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No auth token' });

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) return res.status(401).json({ error: 'Invalid token' });

  const { username } = req.body;
  if (!username || username.length < 2 || username.length > 16) {
    return res.status(400).json({ error: 'Username must be 2-16 characters' });
  }

  // Check username not taken
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .single();

  if (existing) return res.status(409).json({ error: 'Username already taken' });

  const { error } = await supabase.from('profiles').insert({ id: user.id, username });
  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ ok: true, username });
}
