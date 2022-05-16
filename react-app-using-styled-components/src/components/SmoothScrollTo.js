export function SmoothScrollTo({ id, children }) {
  function handleClickOverride(event) {
    event.preventDefault();
    const target = document.querySelector(`#${id}`);
    target?.scrollIntoView({
      behavior: "smooth", // instead of globally enabling smooth scroll, which may have problems in SPAs when navigating to a new "page"
    });
  }
  return (
    <a href={`#${id}`} onClick={handleClickOverride}>
      {children}
    </a>
  );
}
