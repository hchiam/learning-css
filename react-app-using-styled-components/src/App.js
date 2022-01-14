import "./App.css";
import { Quote } from "./components/Quote";
import GlobalStyles from "./GlobalStyles";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { Button, ButtonType } from "./components/Button";

function App() {
  return (
    <>
      <Breadcrumbs />

      <Quote
        by="Bill Gates (Allegedly)"
        source="https://quoteinvestigator.com/2011/09/08/640k-enough/"
      >
        640kb of memory ought to be enough for anyone
      </Quote>

      <Button type={ButtonType.BASE}>Base Button</Button>
      <Button type={ButtonType.PRIMARY}>Primary Button</Button>

      {/* GlobalStyles will simply inject styles into the <head> */}
      <GlobalStyles />
    </>
  );
}

export default App;
