import Header from "../components/Header"
import LogInWithWalletButton from "../components/LogInWithWalletButton"
import useWallet from "../hooks/useWallet"

const Airdrop = () => {
    const { address } = useWallet();
    return (
        <>
            <Header>
                Logo
                <LogInWithWalletButton />
            </Header>
            <h1>Content</h1>
            {address && <p>Connected with address: {address}</p>}
        </>
    )
}

export default Airdrop
