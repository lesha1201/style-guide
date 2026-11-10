function handleClick() {
  console.info('clicked');
}

export function ReactViolation() {
  return (
    <button onClick={handleClick} disabled={true}>
      Click
    </button>
  );
}
