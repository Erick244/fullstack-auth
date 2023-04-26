import UsersTable from "./table/UsersTable";

export default function DashboardPage() {
  return (
	<div className="m-auto h-5/6 bg-slate-300 max-w-7xl shadow-lg shadow-black/40 rounded-b">
		<UsersTable />
	</div>
  )
}
