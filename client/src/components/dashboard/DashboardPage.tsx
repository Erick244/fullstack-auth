import Pagination from "./table/Pagination";
import UsersTable from "./table/UsersTable";

const classes = {
    dashboardPage: `
		flex flex-col justify-center items-center
		p-4 m-auto h-5/6 max-w-7xl
		shadow-lg shadow-black/40
		bg-white/50 rounded-b
	`,
};

export default function DashboardPage() {
  return (
      <div className={classes.dashboardPage}>
          <UsersTable />
          <Pagination />
      </div>
  );
}
