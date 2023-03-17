import { getOwnerContract } from "../contracts"
import { useState, useEffect } from 'react'

export const useInfo = () => {
  const [apr, setApr] = useState()
  const [stakeApr, setStakeApr] = useState()
  const [lidoApr, setLidoApr] = useState()
  const [rpApr, setRpApr] = useState()
  const [swiseApr, setSwiseApr] = useState()
  const [minimum, setMinimum] = useState()
  const [multiplier, setMultiplier] = useState()
  const [owner, setOwner] = useState()

  const setInfos = async () => {
    try {
      const { apr, rpApr, lidoApr, stakeApr, multiplier, minimumAmount, owner } = await getOwnerContract()
      setApr(apr)
      setRpApr(rpApr)
      setStakeApr(stakeApr)
      setLidoApr(lidoApr)
      setSwiseApr(swiseApr)
      setMinimum(minimumAmount)
      setMultiplier(multiplier)
      setOwner(owner)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setInfos()
  }, [])

  return { apr, setApr, rpApr, setRpApr, lidoApr, setLidoApr, stakeApr, minimum, setMinimum, multiplier, setMultiplier, owner, }
}