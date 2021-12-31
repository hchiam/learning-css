import "./App.css";
import { Quote } from "./components/Quote";
import GlobalStyles from "./GlobalStyles";

function App() {
  return (
    <>
      <Quote
        by="Bill Gates (Allegedly)"
        source="https://quoteinvestigator.com/2011/09/08/640k-enough/"
      >
        640kb of memory ought to be enough for anyone
      </Quote>

      {/* GlobalStyles will simply inject styles into the <head> */}
      <GlobalStyles />
    </>
  );
}

export default App;
