export default async function handler(req, res) {
  try {
    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: req.body,
      headers: {
        'Content-Type': req.headers['content-type'],
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(errorText);
    }

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
}