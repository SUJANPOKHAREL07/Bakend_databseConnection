//modal code

export default interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
}
const products: Product[] = [];

export const productModal = {
  getAll(): Product[] {
    return products;
  },
  getByID(id: number): Product | undefined {
    return products.find((p) => p.id === id);
  },
  createProduct(input: Omit<Product, "id">): Product {
    const newProduct: Product = {
      id: products.length + 1,
      ...input,
    };
    products.push(newProduct);
    return newProduct;
  },
  updateProductModal(id: number, input: Omit<Product, "id">) {
    const index = products.findIndex((p) => p.id === id);
    console.log("this is index",index)
    if (index === -1) return null;
    products[index] = {...products[index], ...input};
    return products[index]
  },
  deleteProductsModal(id:number){
    const index=products.findIndex((p)=>p.id===id)
   if(index===-1) return("not available")
    
   
    const deleted=products.splice(index,1)
  }
};
