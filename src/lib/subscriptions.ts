// In a real application, this should be stored in a database (like PostgreSQL with Prisma)
const subscriptions: any[] = [];

export const getSubscriptions = () => subscriptions;

export const addSubscription = (subscription: any) => {
  if (!subscriptions.some(sub => sub.endpoint === subscription.endpoint)) {
    subscriptions.push(subscription);
    return true;
  }
  return false;
};
