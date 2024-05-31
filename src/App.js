import { Header } from "./components/Header";
import { ArticleList } from "./features/articles/ArtcileList";

function App() {
  return (
    <div>
      <Header />
      <div className="d-flex flex-column align-items-center">
        <ArticleList />
      </div>
    </div>
  );
}

export default App;
