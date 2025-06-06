import productModal from "./prodctMongoDB";

async function creatProductsService(
  name: String,
  price: Number,
  categoryID: String
) {
  const productCreation = new productModal({
    name: name,
    price: price,
    categoryID: categoryID,
  });
  return await productCreation.save();
}

async function getAllProductsService() {
  return await productModal.find();
}

async function getProdcutsByIDService(id: string) {
  const getProductID = await productModal.findById(id);
  return getProductID;
}
async function updateProductService(data:{id:string,name:string,price:Number,categoryID:string}){
    const updateProduct= await productModal.updateOne({
        _id:data.id,
        $set :{name: data.name,price:data.price,categoryID:data.categoryID}
    })
    return updateProduct
}
async function deleteProductService(id:string) {
    const deleteData= await productModal.deleteOne({_id:id})
}

export { creatProductsService, getAllProductsService,getProdcutsByIDService,updateProductService,deleteProductService };
