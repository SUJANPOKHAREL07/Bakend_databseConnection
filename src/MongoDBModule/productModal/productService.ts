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
   const updateFields: any = {};

  if (data.name !== undefined) updateFields.name = data.name;
  if (data.price !== undefined) updateFields.price = data.price;
  if (data.categoryID !== undefined) updateFields.categoryID = data.categoryID;

  
  return await productModal.findByIdAndUpdate(
      {_id:data.id},
       { $set :updateFields },
        {new:true}
    )
    
}
async function deleteProductService(id:string) {
    const deleteData= await productModal.deleteOne({_id:id})
}

export { creatProductsService, getAllProductsService,getProdcutsByIDService,updateProductService,deleteProductService };
