/* eslint-disable react-hooks/rules-of-hooks */
import { useStore } from "@/store/store";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

type props = { productId: string };
export function ChangeQtyButtons({ productId }: props) {
  const { getProductById, incQty, decQty, setTotal } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      incQty: state.incQty,
      decQty: state.decQty,
      setTotal: state.setTotal,
    }))
  );
  const product = getProductById(productId);

  useEffect(() => {
    const unSub = useStore.subscribe(
      (state) => state.products,
      (products) => {
        setTotal(
          products.reduce((acc, item) => acc + item.price * item.qty, 0)
        );
      },
      { fireImmediately: true }
    );
    return unSub;
  }, [setTotal]);

  return (
    <>
      {product && (
        <div className=" flex gap-2 items-center">
          <Button onClick={() => decQty(productId)} size={"icon"}>
            <Minus />
          </Button>
          <p>{product.qty}</p>
          <Button onClick={() => incQty(productId)} size={"icon"}>
            <Plus />
          </Button>
        </div>
      )}
    </>
  );
}
