import orderModal, { IOrder } from "./orderMongoDB";


async function createOrderService(userId:string,productId:string,quantity:number) {
    const createOrder=new orderModal(
       { userId:userId,
        productId:productId,
        quantity:quantity}
    )
    return await createOrder.save()
}
async function getAllOrderService() {
    return await orderModal
    .find()
    .populate("userId","name")
    .populate("productId","name")
}
async function getOrderByIdService(id:string) {
    return await orderModal.findById(id)
    .populate("userId","name")
    .populate("productId","name")
}
async function deleteOrderService(id:string) {
    return await orderModal.deleteOne({_id:id})  
}
// async function updateOrderService(data:{id:string,userId:string, productId:[string], quantity:Number}) {
//     const updateFields:any={}
//     if(data.userId!==undefined) updateFields.userId=data.userId
//     if(data.productId!==undefined) updateFields.productId=data.productId
//     if(data.quantity!==undefined) updateFields.quantity=data.quantity

//     return await orderModal.findByIdAndUpdate(
//         {_id:data.id},
//         {$set:updateFields},
//         {new:true}
//     )

// }
async function updateOrderService(id: string, order: Partial<IOrder>) {
    return orderModal.findByIdAndUpdate(id, order, { new: true });
  }
export {createOrderService,getAllOrderService,getOrderByIdService,deleteOrderService,updateOrderService}