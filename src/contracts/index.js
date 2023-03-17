import { ethers } from "ethers"
import owner from './abis/owner.json'
import updateBalance from './abis/updateBalance.json'
import lsEth from './abis/tokenLsETH.json'
import veLSD from './abis/tokenVELSD.json'
import staking from './abis/stakingPool.json'

import { rpcUrl } from "../utils/constants"

const getContracts = () => {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)

  const ownerContract = new ethers.Contract(owner.address, owner.abi, provider)
  const balanceContract = new ethers.Contract(updateBalance.address, updateBalance.abi, provider)
  const lsEthContract = new ethers.Contract(lsEth.address, lsEth.abi, provider)
  const veLSDContract = new ethers.Contract(veLSD.address, veLSD.abi, provider)
  const stakingContract = new ethers.Contract(staking.address, staking.abi, provider)

  return { ownerContract, balanceContract, lsEthContract, veLSDContract, stakingContract }
}

const getOwnerContract = async () => {
  // get owner contract
  const { ownerContract } = getContracts()

  try {
    // get Aprs
    const apr = Number(await ownerContract.getApy())
    const lidoApr = Number(await ownerContract.getLIDOApy())
    const stakeApr = Number(await ownerContract.getStakeApr())

    // const apr = Number(lsdApr) / (10 ** (Number(lsdAprUnit) - 2))
    // const rpApr = Number(lsdRPApr) / (10 ** (Number(lsdAprUnit) - 2))
    // const lidoApr = Number(lsdLIDOApr) / (10 ** (Number(lsdAprUnit) - 2))
    // const swiseApr = Number(lsdSWISEApr) / (10 ** (Number(lsdAprUnit) - 2))

    // get multiplier
    const multiplier = Number(await ownerContract.getMultiplier())
    // const multiplier = Number(lsdMultiplier) / (10 ** (Number(lsdMultiplierUnit) - 2))

    // get owner
    const owner = await ownerContract.owner()

    // get minimum deposit
    const minimumDepositAmount = await ownerContract.getMinimumDepositAmount()
    const minimumAmount = Number(ethers.utils.formatEther(minimumDepositAmount))

    return { apr, lidoApr, stakeApr, multiplier, minimumAmount, owner }
  } catch (error) {
    console.log(error)
  }
}

const getUpdateBalanceContract = async () => {
  const { balanceContract } = getContracts()

  try {
    // get eth balance
    const ethAmount = await balanceContract.getVirtualETHBalance()
    const stakedETH = Number(ethers.utils.formatEther(ethAmount.toString()))

    return stakedETH
  } catch (error) {
    console.log(error)
  }
}

const getTokenLsETHContract = async () => {
  const { lsEthContract } = getContracts()

  try {
    // getExchangeRate 
    const lsdExchangeRate = await lsEthContract.getExchangeRate()
    const exchangeRate = ethers.utils.formatEther(lsdExchangeRate.toString())

    // getTotalSupply
    // const lsdTotalSupply = await lsEthContract.totalSupply()
    // const totalSupply = Number(ethers.utils.formatEther(lsdTotalSupply.toString()))

    return { exchangeRate }
  }
  catch (error) {
    console.log(error)
  }
}

const getTokenVeLSDContract = async () => {
  const { veLSDContract } = getContracts()

  try {
    // getTotalSupply
    const veLsdTotalSupply = await veLSDContract.totalSupply()
    const totalSupply = Number(ethers.utils.formatUnits(veLsdTotalSupply.toString(), 9))

    return totalSupply
  } catch (error) {
    console.log(error)
  }
}

const getStakingContract = async () => {
  const { stakingContract } = getContracts()
  try {
    // get total staked LSD
    const totalLSD = ethers.utils.formatUnits(await stakingContract.getTotalLSD(), 9)
    const totalRewardsLSD = ethers.utils.formatUnits(await stakingContract.getTotalRewards(), 9)

    return { totalLSD, totalRewardsLSD }

  } catch (error) {
    console.log(error)
  }
}

export {
  getOwnerContract,
  getUpdateBalanceContract,
  getTokenLsETHContract,
  getTokenVeLSDContract,
  getStakingContract,
}

