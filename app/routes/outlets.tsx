import { useLoaderData } from '@remix-run/react';
import { executeQuery, QueryData } from '@/db/execute-query';
import { WithErrorHandling } from '@/components/hoc/error-handling-wrapper/error-handling-wrapper';
import { UniversalTableCard } from '@/components/building-blocks/universal-table-card/universal-table-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LoaderError } from '@/types/loader-error';

// Types for the query response
export type OutletData = {
  organization_id: number;
  organization_name: string;
  address: string;
  phone: string;
  email: string;
};

// SQL query to retrieve outlet data
export const outletsQuery = `
  SELECT organization_id, organization_name, address, phone, email
  FROM organizations
  ORDER BY organization_name
`;

// Loader function to fetch data
export async function loader(): Promise<OutletsPageProps | LoaderError> {
  try {
    const outlets = await executeQuery<OutletData>(outletsQuery);
    return { outlets };
  } catch (error) {
    console.error('Error in outlets loader:', error);
    return { error: error instanceof Error ? error.message : 'Failed to load outlets data' };
  }
}

interface OutletsPageProps {
  outlets: QueryData<OutletData[]>;
}

// OutletsTable component to display data
interface OutletsTableProps {
  data: OutletData[];
}

function OutletsTable({ data }: OutletsTableProps) {
  return (
    <UniversalTableCard
      title="Outlets"
      description="List of all organizations serving as outlets with their contact details."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No outlets found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((outlet) => (
              <TableRow key={outlet.organization_id}>
                <TableCell>{outlet.organization_id}</TableCell>
                <TableCell>{outlet.organization_name}</TableCell>
                <TableCell>{outlet.address}</TableCell>
                <TableCell>{outlet.phone}</TableCell>
                <TableCell>{outlet.email}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </UniversalTableCard>
  );
}

// Main page component
export default function OutletsPage({ outlets }: OutletsPageProps) {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Outlets Dashboard</h1>
      <WithErrorHandling
        queryData={outlets}
        render={(data) => <OutletsTable data={data} />}
      />
    </div>
  );
}
