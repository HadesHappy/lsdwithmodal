import { ethers } from 'ethers'
import owner from './abis/owner.json'

const getContract = () => {
  const walletProvider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = walletProvider.getSigner()
  const contract = new ethers.Contract(owner.address, owner.abi, signer)
  return contract
}

const setApy = async (amount) => {
  try {
    const contract = getContract()
    const tx = await contract.setApy(amount)
    await tx.wait()
  } catch (error) {
    console.log(error)
  }
}

const setLidoApy = async (amount) => {
  try {
    const contract = getContract()
    const tx = await contract.setLIDOApy(amount)
    await tx.wait()
  } catch (error) {
    console.log(error)
  }
}

const setRpApy = async (amount) => {
  try {
    const contract = getContract()
    const tx = await contract.setRPApy(amount)
    await tx.wait()
  } catch (error) {
    console.log(error)
  }
}

const setSwiseApy = async (amount) => {
  try {
    const contract = getContract()
    const tx = await contract.setSWISEApy(amount)
    await tx.wait()
  } catch (error) {
    console.log(error)
  }
}

const setMinimumDepositAmount = async (amount) => {
  try {
    const contract = getContract()
    const tx = await contract.setMinimumDepositAmount(ethers.utils.parseEther(amount.toString()))
    await tx.wait()
  } catch (error) {
    console.log(error)
  }
}

const setLsdMultiplier = async (amount) => {
  try {
    const contract = getContract()
    const tx = await contract.setMultiplier(amount)
    await tx.wait()
  } catch (error) {
    console.log(error)
  }
}

const setLsdStakeApr = async (amount) => {
  try {
    const contract = getContract()
    const tx = await contract.setStakeApr(amount)
    await tx.wait()
  } catch (error) {
    console.log(error)
  }
}


export {
  setApy,
  setLsdStakeApr,
  setLidoApy,
  setRpApy,
  setSwiseApy,
  setMinimumDepositAmount,
  setLsdMultiplier,
}