// import { User, Product, Auth } from "../models";

// export async function createProduct(userId: number, productData) {
//   if (!userId) {
//     throw "userId es necesario";
//   }
//   const user = await User.findByPk(userId);
//   if (user) {
//     const product = await Product.create({
//       ...productData,
//       userId: user.get("id"),
//     });
//     return product;
//   } else {
//     throw "error, user not found";
//   }
// }
