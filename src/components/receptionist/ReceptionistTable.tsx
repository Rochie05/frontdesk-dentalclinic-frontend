import { VStack, chakra } from '@chakra-ui/react';

const Table = chakra('table');
const Thead = chakra('thead');
const Tbody = chakra('tbody');
const Tr = chakra('tr');
const Th = chakra('th');
const Td = chakra('td');

export type Column<T> = {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode;
};

interface ReceptionistTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function ReceptionistTable<T>({ data, columns }: ReceptionistTableProps<T>) {
  return (
    <VStack align="stretch">
      <Table style={{ width: '100%', tableLayout: 'auto' }}>
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th
                key={String(col.key)}
                style={{ padding: '12px', borderBottom: '1px solid #E2E8F0', textAlign: 'left' }}
              >
                {col.label}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, idx) => (
            <Tr key={idx}>
              {columns.map((col) => (
                <Td key={String(col.key)} style={{ padding: '12px', borderBottom: '1px solid #E2E8F0' }}>
                  {col.render ? col.render(row) : (row[col.key] as any)}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
}

export default ReceptionistTable;
