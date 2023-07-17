import { appendMutableCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { APP_BUILD_MANIFEST } from "next/dist/shared/lib/constants";
import Home from "./home/page";

function App() {
  return <Home />;
}

export default App;