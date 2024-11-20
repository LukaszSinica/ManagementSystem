import { resetPasswordForUser, retrieveUsers, RetrieveUsersResponse } from '@/api/UserApi';
import { useAuth } from '@/lib/AuthContext';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react'
import { DataTable } from '../ui/DataTable';
import { getAuthority } from '@/lib/Authority';
import { Button } from '../ui/button';

export default function Users() {

  const auth = useAuth();
  const [usersData, setUsersData] = useState<RetrieveUsersResponse[]>([]);

  useEffect(() => {
    retrieveUsers(auth.token).then((data) => {
      console.log(data);
      setUsersData(data.data)
  })
  },[auth.username, auth.token]);
  

  const userDataTableColumns: ColumnDef<RetrieveUsersResponse>[] = [
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({row}) => {
        const phoneNumber = row.original.phone.toString()
        const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        return formattedPhoneNumber;
      }
    },
    {
      accessorKey: "authority",
      header: "Authority",
      cell: ({row}) => {
        return getAuthority(row.original.authority);
      }
    },
    {
      accessorKey: "enabled",
      header: "IsEnabled"
    },
    {
      accessorKey: "action",
      header: "Reset Button",
      cell: ({row}) => {
        return (
          <Button
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
            onClick={() => resetPasswordForUser(row.original.username)}
          >
            Reset Password
          </Button>
        )
      }
    }
  ]

  return (
    <main className="flex flex-col w-2/5 items-center mx-auto">
        <h1>Users</h1>
        <div>
                {usersData.length > 0 &&
                    <DataTable columns={userDataTableColumns} data={usersData}/>
                }
        </div>
    </main>
  )
}
