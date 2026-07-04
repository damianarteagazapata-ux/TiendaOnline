import React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
    <div className="container">
        <h5 className="mb-3">Tienda Online</h5>

        <p className="mb-1">
            Encuentra los mejores productos al mejor precio.
        </p>

        <p className="mb-0">
            © {new Date().getFullYear()} Tienda Online. Todos los derechos reservados.
        </p>
    </div>
</footer>
  )
}
