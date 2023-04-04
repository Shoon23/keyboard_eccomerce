import React from "react";
import { iOrder } from "../../types";
import { Link } from "react-router-dom";

interface Props {
  orders: iOrder[];
}

function OrdersTable({ orders }: Props) {
  console.log(orders);
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Customer Name</th>
            <th>Quantity</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <th>{order.ordersId}</th>
              <td>
                {order.checkout.user.firstName +
                  " " +
                  order.checkout.user.lastName}
              </td>
              <td>{order.orderItems.length}</td>
              <td>
                <select className="select-bordered select w-full max-w-xs">
                  <option disabled selected>
                    {order.status}
                  </option>
                  <option>Pickup</option>
                  <option>Delivery</option>
                  <option>Delivered</option>
                </select>
              </td>
              <td>
                <Link
                  to={"/admin/order"}
                  state={{
                    orderItems: order.orderItems,
                    user: order.checkout.user,
                  }}
                >
                  <button className="h-8 w-24 rounded-xl bg-sky-600 text-white hover:bg-sky-500 active:bg-sky-600">
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;
