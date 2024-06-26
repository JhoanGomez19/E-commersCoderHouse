import React, { useState, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";

import "./cart.css";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  const [compraExitosa, setCompraExitosa] = useState(false);

  const handleFinalizarCompra = () => {
    setCompraExitosa(true);

    setTimeout(() => {
      checkout();
      navigate("/");
    }, 2000);
  };

  return (
    <div className="cart">
      <div>
        <h1>Tu Carrito de Compras</h1>
      </div>
      <div className="cart">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem key={product.id} data={product} />;
          }
          return null;
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: ${totalAmount}</p>
          <button onClick={() => navigate("/")}>Seguir Comprando</button>
          <button onClick={handleFinalizarCompra}>Finalizar Compra</button>
        </div>
      ) : (
        <h1>Tu Carrito de Compras está Vacío</h1>
      )}

      {/* Mensaje de compra exitosa */}
      {compraExitosa && (
        <div className="mensaje-exito">
          <p className="mensaje-texto">¡Compra exitosa!</p>
          <p className="mensaje-info">¡Gracias por tu compra!</p>
        </div>
      )}
    </div>
  );
};
