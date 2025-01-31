import Header from "./components/Header";
import Table from "./components/Table";
import "tailwindcss";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          <Table />
        </div>
      </main>
      <footer className="py-4 text-center text-gray-500">
        © 2025 FutureTech Inc. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
