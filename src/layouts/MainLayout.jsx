import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function MainLayout({ children, activePage }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-white">
      <Sidebar activePage={activePage} />
      <div className="flex-1 flex flex-col ml-56">
        <Topbar />
        <main className="flex-1 p-6 mt-20">
          {children}
        </main>
      </div>
    </div>
  );
}
