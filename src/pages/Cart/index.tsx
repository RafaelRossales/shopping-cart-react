import React from 'react';
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {

  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted = cart.map(product => ({
    // TODO
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount)
  }))


  const total =
    formatPrice(
      cart.reduce((sumTotal, product) => {
        return sumTotal + product.price * product.amount
      }, 0)
    )

  function handleProductIncrement(product: Product) {
    // TODO
    updateProductAmount({productId:product.id,amount:product.amount + 1});
  }

  function handleProductDecrement(product: Product) {
    // TODO

    updateProductAmount({productId:product.id,amount:product.amount - 1});
  }

  function handleRemoveProduct(productId: number) {
    // TODO
    removeProduct(productId);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cartFormatted.map(_product =>(
            <tr key={_product.id} data-testid="product">
            <td>
              <img src={_product.image} alt={_product.title} />
            </td>
            <td>
              <strong>{_product.title}</strong>
              <span>R$ {_product.price}</span>
            </td>
            <td>
              <div>
                <button
                  type="button"
                  data-testid="decrement-product"
                  disabled={_product.amount <= 1}
                  onClick={() => handleProductDecrement(_product)}
                  >
                  <MdRemoveCircleOutline size={20} />
                </button>
                <input
                  type="text"
                  data-testid="product-amount"
                  readOnly
                  value={_product.amount}
                  />
                <button
                  type="button"
                  data-testid="increment-product"
                  onClick={() => handleProductIncrement(_product)}
                  >
                  <MdAddCircleOutline size={20} />
                </button>
              </div>
            </td>
            <td>
              <strong>R$ {_product.price}</strong>
            </td>
            <td>
              <button
                type="button"
                data-testid="remove-product"
                onClick={() => handleRemoveProduct(_product.id)}
                >
                <MdDelete size={20} />
              </button>
            </td>
          </tr>
      ))}
      </tbody>
      </ProductTable>
      <footer>

        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>R$ {total }</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
