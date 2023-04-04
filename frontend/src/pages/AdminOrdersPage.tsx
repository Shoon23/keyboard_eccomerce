import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { usePageRef } from "../hooks/usePageRef";
import { iOrderItem } from "../types";
import Navbar from "../components/Admin/Navbar";
function AdminOrdersPage() {
  const location = useLocation();
  const { pageRef } = usePageRef();
  const orderItems: iOrderItem[] = location.state.orderItems;
  const [isSelected, setIsSelected] = useState<number>(0);

  return (
    <main ref={pageRef}>
      <section className="min-h-screen">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Order Item Id</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((order) => (
                <tr>
                  <th>{order.orderItemId}</th>
                  <th>{order.product.productName}</th>
                  <td>{order.price}</td>
                  <td>{order.quantity}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default AdminOrdersPage;
