import Main from "@/components/Main";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex h-full z-10 relative">
      <Sidebar />
      <Main />
    </div>
  );
}
