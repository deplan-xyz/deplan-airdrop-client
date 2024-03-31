// import axios from 'axios'
import { EligibilityData } from './types';
import { getSolanaBalance } from '../providers/solana';

// const isDev = import.meta.env.DEV

// TODO: Replace with your own API URL
// const baseURL = isDev ? 'http://localhost:3000' : 'https://some-domain.com/api/'
// const instance = axios.create({
//     baseURL: baseURL,
//     timeout: 1000,
// });

// enum Routes {
//     ELIGIBILITY = '/eligibility',
// }

export const fetchEligibilityInfo = async (wallet: string): Promise<EligibilityData> => {
    let eligibilityData: EligibilityData = {
        isEligible: false,
        tokens: 0,
    };

    try {
        // const response = await instance.get<EligibilityData>(Routes.ELIGIBILITY);
        const tokens = await getSolanaBalance(wallet)
        eligibilityData = {
            isEligible: tokens > 0,
            tokens,
        };
    } catch (error) {
        console.error('Error fetching eligibility info', error)
    }

    return eligibilityData;
}