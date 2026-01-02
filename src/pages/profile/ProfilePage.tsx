import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/sidebar";
import { HeaderAuth } from "../../components/header";
import { Button } from "../../components/ui/button";
import { EditProfileModal } from "../../components/profile";
import { Icon } from "../../components/ui/Icon";
import Avata from "../../assets/images/Avatar.png";
import {
  MOCK_NFTS,
  LIMIT_ITEMS_IN_PAGE,
  BACKEND_URL,
} from "../../constants/constant";
import { UserProfile } from "../../types/user";
import { getUserProfile } from "../../utils/auth";
import { getTokens } from "../../utils/token";
import { CreateTokenFormValues } from "../../schemas/tokenSchema";
type ProfileTab = "tokens" | "nfts";

interface ProfilePageProps {
  defaultTab: ProfileTab;
}

const ProfilePage = ({ defaultTab }: ProfilePageProps) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>(defaultTab);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [tokens, setTokens] = useState<[CreateTokenFormValues]>();
  const [totalTokens, setTotalTokens] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserProfile();
      if (userData) {
        setProfile(userData);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await getTokens(currentPage, LIMIT_ITEMS_IN_PAGE);

        if (response && response.data) {
          setTokens(response.data);
          const total = response.pagination?.total || 0;
          setTotalPages(Math.ceil(total / LIMIT_ITEMS_IN_PAGE));
          setTotalTokens(total);
        }
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
      }
    };

    fetchTokens();
  }, [currentPage]);
  const handleTabChange = (tab: ProfileTab) => {
    setActiveTab(tab);
    navigate(tab === "tokens" ? "/profile/tokens" : "/profile/nfts", {
      replace: true,
    });
  };

  const handleSaveProfile = (data: UserProfile) => {
    setProfile(data);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <HeaderAuth title="Profile" />
        <main className="flex-1 bg-background2 p-3">
          <div className="flex flex-row items-start gap-4">
            {/* Left profile card */}
            <section className="flex min-h-[329.45px] w-[300px] flex-shrink-0 flex-col gap-4 rounded-lg bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <img src={Avata} alt="avata user" className="h-10 w-10" />
                <div className="text-sm">
                  <p className="text-[16px] font-semibold">
                    {profile?.username || "no name yet"}
                  </p>
                  <p className="text-xs text-secondary-text">
                    {profile?.walletAddress}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 text-sm">
                <div>
                  <p className="mb-2 text-lg font-medium leading-[24px]">
                    Balance
                  </p>
                  <p className="text-sm text-secondary-text">200 ZKN</p>
                </div>
                <div>
                  <p className="mb-2 text-lg font-medium leading-[24px]">
                    Biography
                  </p>
                  <p className="text-sm text-secondary-text">
                    {profile?.bio || "None"}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-lg font-medium leading-[24px]">
                    Social Links
                  </p>
                  <div className="mt-1 flex gap-2 text-xs text-secondary-text">
                    <a href={profile?.xUrl} target="_blank">
                      <Icon name="Twitter" variant={"fill"} />
                    </a>
                    <a href={profile?.xUrl} target="_blank">
                      <Icon name="github" variant={"fill"} />
                    </a>
                    <a href={profile?.xUrl} target="_blank">
                      <Icon name="Tele" variant={"fill"} />
                    </a>
                  </div>
                </div>
              </div>
              <Button
                className="h-10 w-full rounded-[1000px]"
                size="default"
                onClick={() => setIsEditOpen(true)}
              >
                Edit Profile
              </Button>
            </section>

            {/* Right content: tokens / NFTs */}
            <section className="flex flex-1 flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex-1 rounded-lg bg-white p-4 px-6 py-4 shadow-sm">
                  <p className="text-base leading-[20px] text-secondary-text">
                    Total Tokens
                  </p>
                  <p className="mt-2 text-2xl font-medium leading-[24px]">
                    {totalTokens}
                  </p>
                </div>
                <div className="flex-1 rounded-lg bg-white p-4 px-6 py-4 shadow-sm">
                  <p className="text-base leading-[20px] text-secondary-text">
                    Total NFTs
                  </p>
                  <p className="mt-2 text-2xl font-semibold">0</p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-2 rounded-[999px] bg-[#F5F5F5] p-1 text-sm">
                    <button
                      className={`rounded-[999px] px-4 py-1 ${
                        activeTab === "tokens"
                          ? "bg-white font-medium shadow-sm"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleTabChange("tokens")}
                    >
                      Tokens
                    </button>
                    <button
                      className={`rounded-[999px] px-4 py-1 ${
                        activeTab === "nfts"
                          ? "bg-white font-medium shadow-sm"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleTabChange("nfts")}
                    >
                      NFTs
                    </button>
                  </div>
                </div>

                {activeTab === "tokens" ? (
                  <div className="overflow-hidden">
                    <div className="divide-y divide-colorDivide">
                      <div className="grid grid-cols-[1.5fr,1.5fr,1.2fr,1.1fr] py-3 text-base font-medium leading-[20px] text-secondary-text">
                        <span className="text-black">Token</span>
                        <span className="text-right">Balance</span>
                        <span className="text-right">% of Supply</span>
                        <span className="text-right">Total of Supply</span>
                      </div>
                      {tokens?.map((token) => (
                        <div
                          key={token.name}
                          className="grid grid-cols-[1.5fr,1fr,1fr,1fr] items-center py-3 text-base font-medium"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                token.image
                                  ? `${BACKEND_URL}${token.image}`
                                  : "loi hinh anh"
                              }
                              alt="user avatar"
                              className="flex h-12 w-12 items-center justify-center rounded-full"
                            />

                            <div className="flex flex-col">
                              <div className="flex items-center gap-2 text-base font-medium">
                                <span className="leading-[24px]">
                                  {token.name}
                                </span>
                                <span className="leading-[16px] text-secondary-text">
                                  {token.symbol}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <span className="font-medium text-black">
                                  {token.description}
                                </span>
                                <Icon
                                  name="copy"
                                  className="h-3 w-3 text-secondary-text"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="text-right">{token.decimals}</div>
                          <div className="text-right">{token.supply}</div>
                          <div className="text-right">{token.decimals}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-4 pb-4">
                      <Button
                        variant="secondary"
                        disabled={currentPage === 1} // Trang 1 thì chặn nút Back
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                      >
                        Previous
                      </Button>

                      <span className="text-sm font-medium text-secondary-text">
                        Page {currentPage} of {totalPages || 1}
                      </span>

                      <Button
                        variant="secondary"
                        disabled={currentPage >= totalPages} // Trang cuối thì chặn nút Next
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-hidden">
                    <div className="divide-y divide-colorDivide">
                      <div className="grid grid-cols-[1.5fr,1.2fr,1fr] py-3 text-base font-medium leading-[20px] text-secondary-text">
                        <span className="text-black">NFT</span>
                        <span className="text-right">% of Supply</span>
                        <span className="text-right">Total of Supply</span>
                      </div>
                      {MOCK_NFTS.map((nft) => (
                        <div
                          key={nft.id}
                          className="grid grid-cols-[1.5fr,1fr,1fr] items-center py-3 text-base font-medium"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={nft.avatar}
                              alt="user avatar"
                              className="flex h-12 w-12 items-center justify-center rounded-full"
                            />
                            <div className="flex flex-col">
                              <span className="font-medium">{nft.name}</span>

                              <div className="flex items-center gap-2 text-xs">
                                <span className="text-xs text-gray-500">
                                  {nft.address}
                                </span>
                                <Icon
                                  name="copy"
                                  className="h-3 w-3 text-secondary-text"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="text-right">{nft.percent}</div>
                          <div className="text-right">{nft.total}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={profile}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default ProfilePage;
