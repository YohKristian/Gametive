import { Outlet } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import FooterBar from "../components/FooterBar";

export default function MainPage() {
  return (
    <>
      <HeaderBar />
      <main className="font-link">
        <Outlet />
      </main>
      <FooterBar />
    </>
  );
}
