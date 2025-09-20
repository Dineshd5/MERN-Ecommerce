import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { currency } from "../../App";
import api from "../../utils/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await api.post("/api/order/list");
      if (response.data.success) setOrders(response.data.orders);
      else toast.error(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const response = await api.post("/api/order/status", { orderId, status });
      if (response.data.success) {
        toast.success("Status updated");
        fetchOrders();
      } else toast.error(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h3>Orders</h3>
      {orders.map((order) => (
        <div
          key={order._id}
          className="grid grid-cols-5 items-center gap-2 p-3 border"
        >
          <p>
            {order.items.map((i) => `${i.name} X ${i.quantity}`).join(", ")}
          </p>
          <p>
            {order.address.firstName} {order.address.lastname}
          </p>
          <p>
            {currency}
            {order.amount}
          </p>
          <select
            value={order.status}
            onChange={(e) => updateStatus(order._id, e.target.value)}
          >
            {[
              "Order Placed",
              "Packing",
              "Shipped",
              "Out for delivery",
              "Delivered",
            ].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default Orders;
