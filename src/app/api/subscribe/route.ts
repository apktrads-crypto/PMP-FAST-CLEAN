import { NextResponse } from 'next/server';
import { addSubscription } from '@/lib/subscriptions';

export async function POST(req: Request) {
  try {
    const subscription = await req.json();
    
    const added = addSubscription(subscription);
    if (added) {
      console.log('New subscription added:', subscription.endpoint);
    }

    return NextResponse.json({ success: true, message: 'Subscription saved.' }, { status: 201 });
  } catch (error) {
    console.error('Error saving subscription:', error);
    return NextResponse.json({ success: false, error: 'Failed to save subscription.' }, { status: 500 });
  }
}
