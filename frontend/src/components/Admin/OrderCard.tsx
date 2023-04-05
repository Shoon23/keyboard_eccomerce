import React, { useState } from "react";
import { Link } from "react-router-dom";
import { iOrder } from "../../types";

interface Props {
  order: iOrder;
  updateStatus: (status: string, ordersId: string) => Promise<void>;
}

function OrderCard({ order, updateStatus }: Props) {
  const [status, setStatus] = useState(order.status);
  return (
    <>
      <tr key={order.ordersId}>
        <th>{order.ordersId}</th>
        <td>
          {order.checkout.user.firstName + " " + order.checkout.user.lastName}
        </td>
        <td>{order.orderItems.length}</td>
        <td>
          <select
            onChange={(e) => {
              updateStatus(e.target.value, order.ordersId);
              setStatus(e.target.value);
            }}
            className="select-bordered select w-full max-w-xs"
            value={status}
          >
            <option>Preparing</option>
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
    </>
  );
}

export default OrderCard;
