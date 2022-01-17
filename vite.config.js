import { resolve } from 'path'

export default {
  root: "src",
  build: {
    rollupOptions: {
        input: {
            main: resolve(__dirname, 'src/index.html'),
            cart: resolve(__dirname, 'src/cart.html'),
            help: resolve(__dirname, 'src/help.html'),
            pay: resolve(__dirname, 'src/pay.html'),
            payment_accepted: resolve(__dirname, 'src/payment_accepted.html')
        }
    }
}
};
