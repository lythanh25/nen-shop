import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter.tsx";
import Header from "./components/layout/Header.tsx";

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-background px-4 py-10">
        <Header />
        <AppRouter />
      </main>
    </BrowserRouter>
  );
}

export default App;
