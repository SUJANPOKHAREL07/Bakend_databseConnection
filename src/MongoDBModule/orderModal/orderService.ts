import orderModal from "./orderMongoDB";

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
export {createOrderService,getAllOrderService,getOrderByIdService,deleteOrderService}