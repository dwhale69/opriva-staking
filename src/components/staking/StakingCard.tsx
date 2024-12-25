import React, { useEffect, useState } from "react";
import { Info, Wallet } from "lucide-react";
import { StakingInput } from "./StakingInput";
import { StakingOutput } from "./StakingOutput";
import { useStaking } from "../../hooks/useStaking";
import { useWalletContext } from "../../context/WalletContext";
import { useStakingBalance } from "../../hooks/useStakingBalance";
import { getTable, postTable } from "../../hooks/firebase";
import { config } from "../../hooks/config";
import { token } from "../../abi/token";
import {
  useAccount,
  useBalance,
  useReadContract,
  useReadContracts,
  useWriteContract,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  connect,
  getBalance,
  injected,
  readContract,
  writeContract,
} from "@wagmi/core";
import { staking } from "../../abi/staking";
import { formatEther, parseEther, parseUnits } from "viem";
import moment from "moment";

export const StakingCard = () => {
  const { address } = useAccount();
  const [data, setData] = useState(null);
  const [approve, setApprove] = useState(false);
  const dates = new Date();
  const nowEpoch = Math.floor(dates.getTime() / 1000);

  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");
  const [times, setTimes] = useState<604800 | 2592000 | 7776000>(604800);
  const [amount, setAmount] = useState("");
  const [dataStake, setDataStake] = useState(null);
  const [dataReward, setDataReward] = useState(null);

  const {
    stake,
    unstake,
    getRewards,
    isLoading,
    error: stakingError,
  } = useStaking();

  const { account, error: walletError } = useWalletContext();
  const { stakedBalance, earnedRewards, setStakedBalance, setEarnedRewards } =
    useStakingBalance(account);

  const handleAction = async () => {
    if (!amount || !account) return;

    const success =
      activeTab === "stake" ? await stake(amount) : await unstake(amount);

    if (success) {
      setAmount("");
      const balance = await getStakedBalance(account);
      const rewards = await getEarnedRewards(account);
      setStakedBalance(balance);
      setEarnedRewards(rewards);
    }
  };

  const dataBalance = useBalance({
    chainId: 1,
    address: address ? address : undefined,
    token: "0x938F2774E307A71882009A27E0e40e615415fE54",
  });

  const handleApprove = async (e) => {
    try {
      const a = await writeContract(config, {
        abi: token,
        address: "0x938F2774E307A71882009A27E0e40e615415fE54",
        functionName: "approve",
        args: [
          "0x87Fd96905A40DDE52832ffC059405f788f76314C",
          "10000000000000000000000000000000000",
        ],
      });
      if (a) {
        setTimeout(() => {
          const b = { address: e };
          const c = postTable(b);
          if (c) {
            const d = getTable();
            try {
              d.then((item: any) => {
                if (item.length > 0) {
                  setData(item);
                }
              });
            } catch (error) {
              console.log(error);
            }
          }
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStake = async () => {
    try {
      const a = await writeContract(config, {
        abi: staking,
        address: "0x87Fd96905A40DDE52832ffC059405f788f76314C",
        functionName: "stake",
        args: [parseUnits(amount, 18), times],
      });
      if (a) {
        setTimeout(() => {
          const b = { address: e };
          const c = postTable(b);
          if (c) {
            const d = getTable();
            try {
              d.then((item: any) => {
                if (item.length > 0) {
                  setData(item);
                }
              });
            } catch (error) {
              console.log(error);
            }
          }
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRewardGet = async (e) => {
    try {
      const a = await writeContract(config, {
        abi: staking,
        address: "0x87Fd96905A40DDE52832ffC059405f788f76314C",
        functionName: "claimReward",
        args: [e],
      });
      if (a) {
        setTimeout(() => {
          const d = getTable();
          try {
            d.then((item: any) => {
              if (item.length > 0) {
                setData(item);
              }
            });
          } catch (error) {
            console.log(error);
          }
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleReward = (e) => {
  //   try {
  //     const a = readContract(config, {
  //       chainId: 1,
  //       abi: staking,
  //       address: "0x87Fd96905A40DDE52832ffC059405f788f76314C",
  //       functionName: "calculateReward",
  //       args: [address, e],
  //     });
  //     if (a) {
  //       const b = a.then((item) => {
  //         return formatEther(item);
  //       });
  //       // console.log(new Promise({ b }));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleReward = useReadContracts({
    contracts: dataReward ? dataReward : [],
  });

  const handleUnstakeForce = async (e) => {
    try {
      const a = await writeContract(config, {
        abi: staking,
        address: "0x87Fd96905A40DDE52832ffC059405f788f76314C",
        functionName: "forcedUnstake",
        args: [e],
      });
      if (a) {
        setTimeout(() => {
          const d = getTable();
          try {
            d.then((item: any) => {
              if (item.length > 0) {
                setData(item);
              }
            });
          } catch (error) {
            console.log(error);
          }
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetStake = async () => {
    try {
      const a = await readContract(config, {
        chainId: 1,
        abi: staking,
        address: "0x87Fd96905A40DDE52832ffC059405f788f76314C",
        functionName: "infoUserStake",
        args: [address],
      });
      if (a) {
        if (a[0].length) {
          const data_new = a[0].map((amount, index) => ({
            amount,
            time_stake: a[1][index],
            time_unstake: a[2][index],
            rewards: a[3][index],
            unstake_force: a[4][index],
          }));
          const data_contract = [];
          for (let index = 0; index < data_new.length; index++) {
            data_contract.push({
              chainId: 1,
              abi: staking,
              address: "0x87Fd96905A40DDE52832ffC059405f788f76314C",
              functionName: "calculateReward",
              args: [address, index],
            });
          }
          setDataReward(data_contract);
          setDataStake(data_new);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetRewards = async () => {
    if (!account) return;

    const success = await getRewards();
    if (success) {
      const rewards = await getEarnedRewards(account);
      setEarnedRewards(rewards);
    }
  };

  function removeAfterString(str, delimiter) {
    const index = str.indexOf(delimiter);
    if (index !== -1) {
      return str.substring(0, index);
    } else {
      return str;
    }
  }

  function handleChange(e: any) {
    let a: any = e.target.validity.valid ? { inputValue: e.target.value } : 0;
    const regex: any = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(a.inputValue)) {
      setAmount(a.inputValue);
      if (
        parseFloat(a.inputValue) >
        parseFloat(removeAfterString(dataBalance.data.formatted, "."))
      ) {
        let b: any = removeAfterString(dataBalance.data.formatted, ".");
        setAmount(b);
      }
    }
  }

  useEffect(() => {
    const a = getTable();
    try {
      a.then((item: any) => {
        if (item.length > 0) {
          setData(item);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (address && data) {
      const a = data.find((item) => item.address == address);
      if (a) {
        setApprove(true);
      } else {
        setApprove(false);
      }
    }
    if (address) {
      handleGetStake();
    }
  }, [address, data]);

  return (
    <div className="glass-effect rounded-xl p-4 sm:p-6 w-full max-w-4xl mx-auto neon-border">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
        <h2 className="text-xl font-semibold text-white neon-text">Staking</h2>
        <div className="flex items-center gap-2">
          <span className="text-[#899CFA] neon-text">APY: 240%</span>
          <Info size={16} className="text-gray-400" />
        </div>
      </div>

      {(stakingError || walletError) && (
        <div className="mb-4 p-3 bg-[#1f2023] border border-[#8396FA]/20 rounded-lg text-gray-400 text-sm">
          The terminal is still in development
        </div>
      )}

      <div className="flex gap-2 mb-6">
        <button
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            activeTab === "stake"
              ? "bg-[#8396FA] text-white neon-border"
              : "bg-[#1f2023] text-gray-400"
          }`}
          onClick={() => setActiveTab("stake")}
        >
          Stake
        </button>
        <button
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            activeTab === "unstake"
              ? "bg-[#8396FA] text-white neon-border"
              : "bg-[#1f2023] text-gray-400"
          }`}
          onClick={() => setActiveTab("unstake")}
        >
          Unstake
        </button>
      </div>

      <div className={`flex gap-2 mb-6 ${activeTab == "unstake" && "hidden"} `}>
        <button
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            times === 604800
              ? "bg-[#8396FA] text-white neon-border"
              : "bg-[#1f2023] text-gray-400"
          }`}
          onClick={() => setTimes(604800)}
        >
          7 Days
        </button>
        <button
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            times === 2592000
              ? "bg-[#8396FA] text-white neon-border"
              : "bg-[#1f2023] text-gray-400"
          }`}
          onClick={() => setTimes(2592000)}
        >
          1 Month
        </button>
        <button
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            times === 7776000
              ? "bg-[#8396FA] text-white neon-border"
              : "bg-[#1f2023] text-gray-400"
          }`}
          onClick={() => setTimes(7776000)}
        >
          3 Month
        </button>
      </div>

      {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}

      {activeTab == "unstake" && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/20 text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr className="text-left">
                <th className="whitespace-nowrap px-4 py-5 font-medium text-white">
                  Amount
                </th>
                <th className="whitespace-nowrap px-4 py-5 font-medium text-white">
                  Stake Time
                </th>
                <th className="whitespace-nowrap px-4 py-5 font-medium text-white">
                  Unlock Time
                </th>
                <th className="whitespace-nowrap px-4 py-5 font-medium text-white">
                  Reward
                </th>
                <th className="whitespace-nowrap px-4 py-5 font-medium text-white">
                  Actions
                </th>
              </tr>
            </thead>

            {address && dataStake && (
              <tbody className="divide-y divide-white/20">
                {dataStake.map((item, index) => (
                  <tr
                    key={index}
                    className={item.unstake_force == true && "hidden"}
                  >
                    <td className="whitespace-nowrap px-4 py-5 font-medium text-white">
                      {formatEther(item.amount)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-5 text-white">
                      {moment
                        .unix(parseFloat(item.time_stake))
                        .format("YYYY-MM-DD HH:mm:ss")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-5 text-white">
                      {moment
                        .unix(parseFloat(item.time_unstake))
                        .format("YYYY-MM-DD HH:mm:ss")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-5 text-white">
                      {handleReward?.data &&
                        formatEther(handleReward?.data[index].result).substring(
                          0,
                          6
                        )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-5 text-white gap-4 flex">
                      <button
                        type="button"
                        className="px-3 py-2 rounded-lg bg-[#8396FA] hover:bg-[#899CFA] transition-all text-white font-medium neon-border disabled:opacity-50"
                        onClick={() => handleRewardGet(index)}
                      >
                        Get Reward
                      </button>
                      <button
                        type="button"
                        disabled={parseFloat(item.time_unstake) > nowEpoch}
                        className="px-3 py-2 rounded-lg bg-[#8396FA] hover:bg-[#899CFA] transition-all text-white font-medium neon-border disabled:opacity-50"
                        onClick={() => handleUnstake(index)}
                      >
                        Unstake
                      </button>
                      <button
                        type="button"
                        className="px-3 py-2 rounded-lg bg-[#8396FA] hover:bg-[#899CFA] transition-all text-white font-medium neon-border disabled:opacity-50"
                        onClick={() => handleUnstakeForce(index)}
                      >
                        Force Unstake
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      )}

      <div className={`space-y-4 ${activeTab == "unstake" && "hidden"}`}>
        <div className="bg-[#1f2023] rounded-lg p-4">
          <div className="flex flex-wrap justify-between text-sm text-gray-400 mb-2">
            <span>Amount</span>
            <span className="text-right">
              Balance:{" "}
              {dataBalance?.data
                ? removeAfterString(dataBalance.data.formatted, ".")
                : 0}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={amount}
                onChange={handleChange}
                readOnly={!address}
                pattern="[0-9]*"
                placeholder="0.00"
                className="bg-transparent w-full text-white text-xl font-medium focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button
                className="text-[#8396FA] font-medium hover:text-[#899CFA] transition-colors"
                onClick={() =>
                  dataBalance?.data &&
                  setAmount(removeAfterString(dataBalance.data.formatted, "."))
                }
              >
                MAX
              </button>
              <span className="text-white font-medium">{/* {symbol} */}</span>
            </div>
          </div>
        </div>

        {address ? (
          <>
            {approve ? (
              <button
                onClick={() => handleStake()}
                disabled={isLoading || !amount}
                className="w-full py-3 rounded-lg bg-[#8396FA] hover:bg-[#899CFA] transition-all text-white font-medium neon-border disabled:opacity-50"
              >
                <>
                  {isLoading
                    ? "Processing..."
                    : `${activeTab === "stake" ? "Stake" : "Unstake"} OPRV`}
                </>
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleApprove(address)}
                  className="w-full py-3 rounded-lg bg-[#8396FA] hover:bg-[#899CFA] transition-all text-white font-medium neon-border disabled:opacity-50"
                >
                  <>Approve</>
                </button>
              </>
            )}
          </>
        ) : (
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              return (
                <div
                  {...(!ready && {
                    "aria-hidden": true,
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#8396FA] hover:bg-[#899CFA] transition-colors text-white font-medium text-sm sm:text-base w-full"
                          onClick={openConnectModal}
                          type="button"
                        >
                          <Wallet size={18} className="hidden sm:block" />
                          Connect Wallet
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button
                          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#8396FA] hover:bg-[#899CFA] transition-colors text-white font-medium text-sm sm:text-base w-full"
                          onClick={openChainModal}
                          type="button"
                        >
                          Wrong network
                        </button>
                      );
                    }

                    return (
                      <div style={{ display: "flex", gap: 12 }}>
                        <button
                          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#8396FA] hover:bg-[#899CFA] transition-colors text-white font-medium text-sm sm:text-base w-full"
                          onClick={openAccountModal}
                          type="button"
                        >
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ""}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        )}
      </div>
    </div>
  );
};
