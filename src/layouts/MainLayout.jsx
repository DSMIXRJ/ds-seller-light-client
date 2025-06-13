import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function MainLayout({ children, activePage }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-zinc-50">
      <Sidebar activePage={activePage} />
      <main className="flex-1 flex flex-col items-center ml-56">
        <Topbar />
        <div className="w-full max-w-6xl pt-[120px]">{children}</div>
      </main>
    </div>
  );
}
