import { Navbar } from "@/components/navbar";
import { HomePage, NotFoundPage } from "@/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "./paths";

export function AppRouter() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.HOME} element={<HomePage />} />
          <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
