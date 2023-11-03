import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/repository/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    try {
      await OrderModel.sequelize.transaction(async (t) => {
        await OrderItemModel.destroy({
          where: { order_id: entity.id },
          transaction: t,
        });
        const items = entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
        }));
        await OrderItemModel.bulkCreate(items, { transaction: t });
        await OrderModel.update(
          { total: entity.total() },
          { where: { id: entity.id }, transaction: t }
        );
      });
    } catch (error) {
      throw new Error("Error on update order");
    }
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel =  await OrderModel.findOne({
        where: { id },
        include: ["items"],
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map((item) => new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity,
      ))
    )
  }
  
  async findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }

  async findOrderItemsByOrderId(orderId: string): Promise<OrderItem[]> {
    const foundOrderItems = await OrderItemModel.findAll({ where: { order_id: orderId } });
    return foundOrderItems.map(item => (
      new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity,
      )
    ))
  }

  async deleteOrderItem(orderItemId: string): Promise<void> {
    await OrderItemModel.destroy({ where: { id: orderItemId } });
  }

  async createOrderItem(orderItem: OrderItem, order_id: string): Promise<void> {
    await OrderItemModel.create({
      id: orderItem.id,
      name: orderItem.name,
      price: orderItem.price,
      product_id: orderItem.productId,
      quantity: orderItem.quantity,
      order_id,
    });
  }
}