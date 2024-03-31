import Moralis from 'moralis';

const network = Moralis.SolUtils.SolNetwork.MAINNET;

export const getSolanaBalance = async (wallet: string) => {
    const getPortfolio = await Moralis.SolApi.account.getPortfolio;
    const resp = await getPortfolio({ address: wallet, network });
    const { tokens } = resp.toJSON();

    const dplnToken = tokens.find((token: any) => token.symbol === 'DPLN');
    const balance = dplnToken ? dplnToken.amount : '0';
    const parsedBalance = parseInt(balance);

    return parsedBalance;
}