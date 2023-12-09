export function BoolInput({ onChange, value }: { onChange: (value: any) => void; value: any }) {
  return (
    <div>
      <input type="checkbox" checked={value} onChange={(e) => onChange(!value)} />
    </div>
  );
}
