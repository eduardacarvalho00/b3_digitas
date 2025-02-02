import { RefreshCcw } from "lucide-react";
import Header from "../../components/Header";
import { Table } from "../../components/Table";
import { useCurrency } from "../../queries/useCurrency";

export const Home = () => {
  const { data, isFetching, refetch } = useCurrency();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          <div
            className="flex gap-4 font-semibold text-gray-500 mb-4 w-full justify-end cursor-pointer"
            onClick={() => refetch()}
          >
            <p>Refresh</p>
            <RefreshCcw />
          </div>
          {isFetching && (
            <div className="w-full flex justify-center">
              <p className="font-semibold text-gray-500">Loading...</p>
            </div>
          )}
          {data && <Table data={data} data-testid="table" />}
        </div>
      </main>
      <footer className="py-4 text-center text-gray-500">
        © 2025 by Eduarda C.
      </footer>
    </div>
  );
};
