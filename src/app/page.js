import { Header } from "./Layout/Header";
import { Main } from "./Views/Main";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header/>
      <Main/>
    </main>
  );
}
