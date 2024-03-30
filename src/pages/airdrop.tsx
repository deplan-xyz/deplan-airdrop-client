import Header from "../components/Header"
import LogInWithWalletButton from "../components/LogInWithWalletButton"
import useWallet from "../hooks/useWallet"
import DeplanLogoSmall from './../assets/logoSmall.svg';

const Airdrop = () => {
    const { address } = useWallet();
    return (
        <>
            <Header>
                <img src={DeplanLogoSmall} width={110} alt="Deplan Logo" />
                <LogInWithWalletButton />
            </Header>
            <h1>Content</h1>
            {address && <p>Connected with address: {address}</p>}
        </>
    )
}

export default Airdrop
