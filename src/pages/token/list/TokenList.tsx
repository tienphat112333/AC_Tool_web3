import { useEffect, useState } from "react";
import { HeaderAuth } from "../../../components/header";
import { Sidebar } from "../../../components/sidebar";
import { Button } from "../../../components/ui/button";
import { Icon } from "../../../components/ui/Icon";
import { MinModal } from "../../../components/mint/MintModal";
import { CreateTokenFormValues } from "../../../schemas/tokenSchema";
import { getTokens } from "../../../utils/token";
import { BACKEND_URL, LIMIT_ITEMS_IN_PAGE } from "../../../constants/constant";

const TokenList = () => {
  const [openMintModal, setOpenMintModal] = useState(false);
  const [selectedToken, setSelectedToken] =
    useState<CreateTokenFormValues | null>(null);
  const [tokens, setTokens] = useState<[CreateTokenFormValues]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await getTokens(currentPage, LIMIT_ITEMS_IN_PAGE);

        if (response && response.data) {
          setTokens(response.data);
          const total = response.pagination?.total || 0;
          setTotalPages(Math.ceil(total / LIMIT_ITEMS_IN_PAGE));
        }
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
      }
    };

    fetchTokens();
  }, [currentPage]);
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <HeaderAuth title="Token List" />
        <section className="m-4 flex flex-col gap-2">
          <div className="flex h-14 items-center justify-between rounded-lg bg-white px-4 py-2">
            <div className="flex w-full items-center justify-between">
              <p className="font-medium">Tokens</p>
              <div className="flex items-center justify-between gap-12 text-center text-secondary-text">
                <p className="w-[100px]">Balance</p>
                <p className="w-[100px]">% of Supply</p>
                <p className="w-[164px]">Mint Progress</p>
                <p className="w-[76px]">Action</p>
              </div>
            </div>
          </div>
          <div className="divide-y divide-colorDivide rounded-lg bg-white">
            {tokens?.map((token) => (
              <div
                className="flex h-[76px] items-center justify-between p-4 font-medium"
                key={token.name}
              >
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={
                      token.image
                        ? `${BACKEND_URL}${token.image}`
                        : "loi hinh anh"
                    }
                    alt="user avatar"
                    className="rounded-[200px] h-11 w-11"
                  />
                  <div>
                    <div className="flex gap-2 justify-between items-center">
                      <p className="text-base">{token.name}</p>
                      <p className="text-sm text-secondary-text">
                        {token.symbol}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-normal">{token.description}</p>
                      <Icon name="copy" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-12 text-center">
                  <span className="w-[100px]">{token.decimals}</span>
                  <span className="w-[100px]">{token.supply}</span>
                  <div className="h-[9px] w-[164px] overflow-hidden rounded-[100px] bg-[#F5FBFB]">
                    <div
                      className="h-full rounded-[100px] bg-primary transition-all"
                      style={{ width: `${token.amountPerMint}%` }}
                    />
                  </div>
                  <Button
                    size={"sm"}
                    variant={"secondary"}
                    className="h-8 w-[76px] text-sm"
                    onClick={() => {
                      setSelectedToken(token);
                      setOpenMintModal(true);
                    }}
                  >
                    Mint
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 pb-4">
            <Button
              variant="secondary"
              disabled={currentPage === 1} // Trang 1 thì chặn nút Back
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
        </section>
      </div>
      <MinModal
        open={openMintModal}
        token={selectedToken}
        onClose={() => {
          setOpenMintModal(false);
          setSelectedToken(null);
        }}
      />
    </main>
  );
};
export default TokenList;
