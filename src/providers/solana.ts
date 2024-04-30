import Moralis from 'moralis';

const networkName = import.meta.env.VITE_NETWORK as string;
const network = Moralis.SolUtils.SolNetwork.create(networkName);
const dplnMint = import.meta.env.VITE_DPLN_MINT as string;

export const getSolanaBalance = async (wallet: string) => {
    const getPortfolio = await Moralis.SolApi.account.getPortfolio;
    const resp = await getPortfolio({ address: wallet, network });
    const { tokens } = resp.toJSON();

    const dplnToken = tokens.find((token: any) => token.mint === dplnMint);
    const balance = dplnToken ? dplnToken.amount : '0';
    const parsedBalance = parseInt(balance);

    return parsedBalance;
}