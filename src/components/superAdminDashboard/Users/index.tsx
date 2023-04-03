import React, { useMemo } from 'react';
import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table';

type Person = {
  full_name: string
  email: string;
  phone_number: string;
  account_type: string;
  account_status: string
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    full_name: 'John Doe',
    email: 'johndoe@gmail.com',
    phone_number: '08144153062',
    account_type: 'regular',
    account_status: 'active'
  }
];

const Users = () => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'full_name',
        header: 'Full Name',
      },
      {
        accessorKey: 'email', //normal accessorKey
        header: 'Email',
      },
      {
        accessorKey: 'phone_number',
        header: 'Phone Number',
      },
      {
        accessorKey: 'account_type',
        header: 'Account Type',
      },
      {
        accessorKey: 'account_status',
        header: 'Account Status',
      },
    ],
    [],
  );

  return <MaterialReactTable enableFilters={false} enableFullScreenToggle={false} enableDensityToggle={false} enableColumnActions={false} enableSorting={false}  columns={columns} data={data} />;
};

export default Users;
