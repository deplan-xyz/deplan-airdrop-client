import axios from 'axios'
import { CheckTwitterFollowStatusResponse, EligibilityData } from './types';
import { getSolanaBalance } from '../providers/solana';

const isDev = import.meta.env.DEV

const baseURL = 'https://equitywallet-b362155a0894.herokuapp.com';
const baseURLDev = 'http://localhost:9899';

const instance = axios.create({
    baseURL: !isDev ? baseURLDev : baseURL,
});

enum Routes {
    CLAIM_DATA = '/airdrop/claim/:wallet',
    CALIM = '/airdrop/claim/:wallet/create',
    TWITTER_GET_AUTH_URL = '/airdrop/twitter/auth/url',
    TWITTER_FOLLOW = '/socials/twitter/follow',
    TWITTER_FOLLOW_CHECK = '/socials/twitter/follow/check',
}

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

export const followTwitter = async (wallet: string): Promise<string> => {
    try {
        const followUrl = await instance.get(Routes.TWITTER_FOLLOW, {
            params: {
                wallet,
            }
        });

        return followUrl.data;
    } catch (error) {
        throw new Error('Error following DePlan on Twitter');
    }
}

export const checkIsuserFollowDePlanOnTwitter = async (wallet: string) => {
    try {
        const response = await instance.get<CheckTwitterFollowStatusResponse>(Routes.TWITTER_FOLLOW_CHECK, {
            params: {
                wallet,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error checking if user follows DePlan on Twitter');
    }
}