import Pagination from "./table/Pagination";
import UsersTable from "./table/UsersTable";

export default function DashboardPage() {
  return (
      <div className="flex flex-col justify-center items-center p-4 m-auto h-5/6 bg-white/50 max-w-7xl shadow-lg shadow-black/40 rounded-b">
          <UsersTable />
          <Pagination />
      </div>
  );
}
