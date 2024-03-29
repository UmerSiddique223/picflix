import { Route,Routes } from "react-router-dom"
import Layout from "./root/Layout"
import Home from "./root/pages/Home"

const App = () => {
  return (
  <main className="flex h-screen">
<Routes>
  <Route element={<Layout/>}>
<Route index element={<Home/>} />

  </Route>
</Routes>
  </main>
  )
}

export default App