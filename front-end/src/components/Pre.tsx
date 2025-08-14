export default function Pre({ data }: { data: unknown }) {
  return (
    <pre className="h-[300px] overflow-y-scroll border p-4 shadow-sm">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
