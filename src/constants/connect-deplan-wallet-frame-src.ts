export const connectDeplanWalletFrameSrc =
  'https://greengnome.github.io/deplan-wallet-conect/';
// export const connectDeplanWalletFrameSrc = "http://localhost:5174/deplan-wallet-conect/"
export const connectDeplanWalletOrigin = connectDeplanWalletFrameSrc
  .split('/')
  .slice(0, 3)
  .join('/');
