import axios from 'axios'
import { Transaction } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { ClaimData } from './types';

const baseUrl = 'https://equitywallet-b362155a0894.herokuapp.com';

const baseURL = baseUrl;
const instance = axios.create({
    baseURL: baseURL,
});

enum Routes {
    CLAIM_DATA = '/airdrop/claim/:wallet',
    CALIM = '/airdrop/claim/:wallet/create',
}

export const fetchClaimData = async (wallet: string): Promise<ClaimData> => {
    try {
        const response = await instance.get(Routes.CLAIM_DATA.replace(':wallet', wallet));
        return response.data;
    } catch (error) {
        console.error('Error fetching claim data', error)
        throw error;
    }
}

export const claim = async (wallet: string): Promise<Transaction> => {
    try {
        console.log('Claiming', wallet);

        const { data: encodedTransaction } = await instance.get<ClaimData>(Routes.CALIM.replace(':wallet', wallet));

        const transaction = Transaction.from(Buffer.from(encodedTransaction.txnHash, 'base64'));

        return transaction;
    } catch (error) {
        console.error('Error claiming', error);
        throw error;
    }
}

export const claimSend = async (wallet: string, txn: string): Promise<void> => {
    try {

        await instance.post<ClaimData>(Routes.CALIM.replace(':wallet', wallet), { txn });

    } catch (error) {
        console.error('Error claiming', error);
        throw error;
    }
}