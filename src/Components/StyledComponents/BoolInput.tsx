export function BoolInput({ onChange, value }: { onChange: (value: any) => void; value: any }) {
  return (
    <div>
      <input type="checkbox" value={value} onChange={(e) => onChange(!!e.target.value)} />
    </div>
  );
}
