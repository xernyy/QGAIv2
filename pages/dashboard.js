import { getSession } from 'next-auth/react';

export default function Dashboard() {
  // Get the session using getSession
  const { data: session } = getSession();
  
  if (!session) {
    return <div>You are not authenticated</div>;
  }

  // Render your dashboard content here
}
