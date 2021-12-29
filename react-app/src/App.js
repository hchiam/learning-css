import "./App.css";
import { Quote } from "./components/Quote";

function App() {
  return (
    <Quote
      by="Bill Gates (Allegedly)"
      source="https://quoteinvestigator.com/2011/09/08/640k-enough/"
    >
      640kb of memory ought to be enough for anyone
    </Quote>
  );
}

export default App;
