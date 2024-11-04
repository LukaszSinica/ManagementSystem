import { retrieveUsers } from '@/api/UserApi';
import React from 'react'

export default function Users() {
  const users = retrieveUsers();

  console.log(users);
  
  if (!users) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex flex-col w-2/5 items-center mx-auto">
        <h1>Users</h1>
  
    </main>
  )
}
