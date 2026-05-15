import { NextResponse } from 'next/server';
import webpush from 'web-push';
import { getSubscriptions } from '@/lib/subscriptions';

const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const privateKey = process.env.VAPID_PRIVATE_KEY;

// Initialization is handled inside the POST handler to avoid build-time errors with invalid keys


// Mock AI Service that generates context-aware cleaning tips
async function generateAITip() {
  // In production, this would call Google Gemini API or similar
  const tips = [
    "✨ AI Tip: Did you know? Using PMP Glass Cleaner with a microfiber cloth prevents streaks!",
    "🦠 AI Alert: Monsoon is here! Keep your floors 99.9% germ-free with PMP Floral Floor Cleaner.",
    "🍋 AI Tip: Tough grease on pans? PMP Lemon Dishwash Gel cuts through it in seconds.",
    "🏡 AI Reminder: It's Sunday! Time for a deep clean of the bathroom with PMP Toilet Cleaner."
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}

export async function POST(req: Request) {
  try {
    if (publicKey && privateKey) {
      try {
        webpush.setVapidDetails(
          process.env.VAPID_SUBJECT || 'mailto:test@example.com',
          publicKey,
          privateKey
        );
      } catch (keyError) {
        console.error('Failed to set VAPID details. Keys might be invalid.', keyError);
        return NextResponse.json({ success: false, error: 'Invalid notification configuration.' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ success: false, error: 'Notifications are not configured.' }, { status: 500 });
    }
    // Basic security: In production, check for a cron secret header
    // const authHeader = req.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) return new Response('Unauthorized', { status: 401 });

    const subscriptions = getSubscriptions();
    
    if (subscriptions.length === 0) {
      return NextResponse.json({ message: 'No subscriptions found to notify.' });
    }

    const aiMessage = await generateAITip();
    const payload = JSON.stringify({
      title: 'PMP Fast Clean AI',
      body: aiMessage,
    });

    const sendPromises = subscriptions.map(sub => 
      webpush.sendNotification(sub, payload).catch(err => {
        console.error('Failed to send notification to a sub:', err);
        // In a real app, remove expired subscriptions here
      })
    );

    await Promise.all(sendPromises);

    return NextResponse.json({ success: true, message: `Sent AI tip to ${subscriptions.length} devices.` });
  } catch (error) {
    console.error('AI Notify Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send notifications.' }, { status: 500 });
  }
}
