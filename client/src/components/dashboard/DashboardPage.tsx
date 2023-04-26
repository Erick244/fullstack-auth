import UsersTable from "./table/UsersTable";

export default function DashboardPage() {
  return (
	<div className="p-4 flex justify-center items-center m-auto h-5/6 bg-white/50 max-w-7xl shadow-lg shadow-black/40 rounded-b">
		<UsersTable />
	</div>
  )
}
