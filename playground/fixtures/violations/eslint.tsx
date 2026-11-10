// eslint-disable-next-line no-debugger
debugger;

interface LeakedConditionalProps {
  count: number;
}

export function LeakedConditional({ count }: LeakedConditionalProps) {
  return <div>{count && <span>{count}</span>}</div>;
}
