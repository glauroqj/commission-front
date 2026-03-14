import { Link } from "react-router-dom";
import { PATHS } from "@/routes/paths";

export function NotFoundPage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to={PATHS.HOME}>Go home</Link>
    </div>
  );
}
