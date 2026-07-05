router.put(
    "/:id/rol",
    verificarToken,
    esAdmin,
  
    cambiarRol
);