export function ShiftBy({
  x = 0,
  y = 0,
  children,
  as = "div",
  style = {},
  ...delegated
}) {
  const Element = as;
  return (
    <Element style={{ transform: `translate(${x}px, ${y}px)` }} {...delegated}>
      {children}
    </Element>
  );
}
