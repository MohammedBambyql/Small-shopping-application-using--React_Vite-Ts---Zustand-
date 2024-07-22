/* eslint-disable react-hooks/rules-of-hooks */
import { useShallow } from "zustand/react/shallow";
import { ChangeQtyButtons } from "./components/ChangeQtyButtons";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import { PRODUCTS_DATA } from "./lib/mockData";
import { useStore } from "./store/store";
import { Cart } from "./components/Cart";
import { User } from "./components/User";

export default function app() {
  const { addProduct, cartProducts } = useStore(
    useShallow((state) => ({
      addProduct: state.addProduct,
      cartProducts: state.products,
    }))
  );

  return (
    <main className=" space-y-2 dark h-screen bg-background max-w-sm mx-auto mt-2">
      <div className=" flex justify-between">
        <User />
        <Cart />
      </div>
      <h1 className="text-2xl">Products:</h1>
      <div className=" space-y-2">
        {PRODUCTS_DATA.map((product) => (
          <Card key={product.id}>
            <CardHeader>{product.title}</CardHeader>
            <CardContent>{product.price}$</CardContent>
            <CardFooter>
              {cartProducts.find((item) => item.id === product.id) ? (
                <ChangeQtyButtons productId={product.id} />
              ) : (
                <Button onClick={() => addProduct(product)} variant={"default"}>
                  Add to Cart
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}

// import { Button } from "../src/components/ui/button";
// import { create } from "zustand";

// const useStore = create<{
//   count: number;
//   increment: () => void;
//   decrement: () => void;
// }>((set) => ({
//   count: 0,
//   increment: () => set((state) => ({ count: state.count + 1 })),
//   decrement: () => set((state) => ({ count: state.count - 1 })),
// }));
// function App() {
//   const store = useStore();

//   return (
//     <>
//       <Button onClick={store.increment}>+</Button>
//       {store.count}
//       <Button onClick={store.decrement}> - </Button>
//     </>
//   );
// }

// export default App;
