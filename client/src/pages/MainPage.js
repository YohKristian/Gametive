import { Outlet } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";

export default function MainPage() {
  return (
    <>
      <HeaderBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
