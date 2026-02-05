import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'


import ProductsPage from './pages/ProductsPage.jsx'
import DashboardLayout from './components/DashboardLayout.jsx'
import UsersPage from './pages/UsersPage.jsx'
import CategoriesPage from './pages/CategoriesPage.jsx'
import TaxesPage from './pages/TaxesPage.jsx'
import SalesPage from './pages/SalesPage.jsx'
import InventoryPage from './pages/InventoryPage.jsx'
function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard con layout */}
        <Route
          path="/" element={<DashboardLayout />}>
          {/* 1. Esta es la clave: Redirigir la raíz a ventas */}
          <Route index element={<Navigate to="/ventas" replace />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="usuarios" element={<UsersPage />} />
          <Route path="categorias" element={<CategoriesPage />} />
          <Route path="impuestos" element={<TaxesPage />} />
          <Route path="ventas" element={<SalesPage />} />
          <Route path="inventario" element={<InventoryPage />} />



        </Route>
      </Routes>
    </BrowserRouter>


  )
}

export default App
