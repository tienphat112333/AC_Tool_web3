import { HeaderAuth } from "../../../components/header";
import { Sidebar } from "../../../components/sidebar";
import { Button } from "../../../components/ui/button";
import { Icon } from "../../../components/ui/Icon";
import { Input } from "../../../components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTokenSchema,
  CreateTokenFormValues,
} from "../../../schemas/tokenSchema";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import {
  useSendTransaction,
  useAccount,
  useSwitchChain,
  usePublicClient,
} from "wagmi";
import { parseUnits, encodeAbiParameters, concat } from "viem";
import { TOKEN_FACTORY_ADDRESS } from "../../../constants/constant";
import { createToken } from "../../../utils/token";

const TokenCreator = () => {
  const { sendTransactionAsync } = useSendTransaction();
  const { chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const client = usePublicClient();
  const SEPOLIA_ID = 11155111;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(createTokenSchema),
    defaultValues: {
      name: "",
      symbol: "",
      decimals: 18,
      supply: 0,
      amountPerMint: 1,
      description: "",
      websiteUrl: "",
      telegramUrl: "",
      discordUrl: "",
      xUrl: "",
    },
  });

  const onSubmit = async (data: CreateTokenFormValues) => {
    if (data.amountPerMint > data.supply) {
      toast.error("Amount per mint cannot exceed total supply!");
      return;
    }

    try {
      toast.info("Creating token on Blockchain... Please approve transaction.");
      const SELECTOR = "0x3f20ca13";
      const encodedParams = encodeAbiParameters(
        [
          { type: 'string' },
          { type: 'string' },
          { type: 'uint256' },
          { type: 'uint256' },
          { type: 'uint256' },
          { type: 'uint256' }
        ],
        [
          data.name,
          data.symbol,
          parseUnits(data.amountPerMint.toString(), data.decimals),
          parseUnits(data.supply.toString(), data.decimals),
          BigInt(data.decimals),
          BigInt(1)
        ]
      );

      const calldata = concat([SELECTOR, encodedParams]);

      const txHash = await sendTransactionAsync({
        to: TOKEN_FACTORY_ADDRESS as `0x${string}`,
        data: calldata,
        value: BigInt(0),
      });
      toast.success("Transaction submitted! Waiting for confirmation...");
      if (client) {
        await client.waitForTransactionReceipt({ hash: txHash });
        toast.info("Transaction confirmed! Saving details...");
      } else {
         await new Promise(resolve => setTimeout(resolve, 5000));
      }

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (key === "image" && value instanceof FileList) {
          if (value[0]) formData.append("image", value[0]);
        } else {
          formData.append(key, value.toString());
        }
      });

      formData.append("txHash", txHash);

      const submitData = await createToken(formData);
      if (submitData) {
        toast.success(submitData.message);
        reset();
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
      }
    } catch (error: any) {
      toast.error(error.shortMessage || error.message || "Unknown error");
    }
  };
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setValue("image", e.target.files);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <HeaderAuth title="Token Creator" />
        <main className="mt-10 flex flex-col items-center justify-center">
          <section className="h-[1036px] w-[852px] rounded-lg bg-white py-10">
            <div className="mb-4 flex flex-col items-center gap-2">
              <h2 className="text-2xl font-bold leading-[28px]">
                Token Creator
              </h2>
              <p className="text-base leading-[20px] text-secondary-text">
                Easily Create your own Token in just 7+1 steps without Coding.
              </p>
            </div>
            <form className="flex w-full flex-col gap-6 px-10 pt-6">
              <section className="flex flex-col gap-4 pb-6">
                <div className="flex gap-4">
                  <div className="flex w-2/4 flex-col gap-1">
                    <p className="text-base font-medium">
                      <span className="text-secondaryRed">*</span> Name
                    </p>
                    <Input
                      placeholder="Ex: Zoken"
                      className="h-[52px]"
                      {...register("name")}
                    />
                    <p className="ml-2 text-xs text-secondary-subText">
                      Max 32 characters in your name
                    </p>
                    {errors.name && (
                      <p className="ml-2 text-xs text-secondaryRed">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="flex w-2/4 flex-col gap-1">
                    <p className="text-base font-medium">
                      <span className="text-secondaryRed">*</span> Symbol
                    </p>
                    <Input
                      placeholder="Ex: ZKN"
                      className="h-[52px]"
                      {...register("symbol")}
                    />
                    <p className="ml-2 text-xs text-secondary-subText">
                      Max 8 characters in your symbol
                    </p>
                    {errors.symbol && (
                      <p className="ml-2 text-xs text-secondaryRed">
                        {errors.symbol.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex w-2/4 flex-col gap-1">
                    <p className="text-base font-medium">
                      <span className="text-secondaryRed">*</span> Decimal
                    </p>
                    <Input
                      placeholder="6"
                      className="h-[52px]"
                      {...register("decimals")}
                    />
                    <p className="ml-2 text-xs text-secondary-subText">
                      Most token use 6 decimals
                    </p>
                    {errors.decimals && (
                      <p className="ml-2 text-xs text-secondaryRed">
                        {errors.decimals.message}
                      </p>
                    )}
                  </div>
                  <div className="flex w-2/4 flex-col gap-1">
                    <p className="text-base font-medium">
                      <span className="text-secondaryRed">*</span> Supply
                    </p>
                    <Input
                      placeholder="1"
                      className="h-[52px]"
                      {...register("supply")}
                    />
                    <p className="ml-2 text-xs text-secondary-subText">
                      Most token use 10B
                    </p>
                    {errors.supply && (
                      <p className="ml-2 text-xs text-secondaryRed">
                        {errors.supply.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium">
                    <span className="text-secondaryRed">*</span> Amount per mint
                  </p>
                  <Input
                    placeholder="6"
                    className="h-[52px]"
                    {...register("amountPerMint")}
                  />
                  {errors.amountPerMint && (
                    <p className="ml-2 text-xs text-secondaryRed">
                      {errors.amountPerMint.message}
                    </p>
                  )}
                </div>
                <div className="flex gap-4">
                  <div className="flex w-2/4 flex-col gap-1">
                    <p className="text-base font-medium">
                      <span className="text-secondaryRed">*</span> Image
                    </p>
                    <label
                      htmlFor="image-upload"
                      className="flex h-[120px] cursor-pointer flex-col items-center justify-center rounded-lg border-[1.5px] border-dashed border-secondary-subText px-4 py-6 text-secondary-subText"
                    >
                      <div className="flex w-[200px] flex-col items-center justify-center">
                        {imagePreview ? (
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="h-[100px] w-auto object-contain" 
                            />
                        ) : (
                            <>
                                <Icon
                                  name="Logout"
                                  variant={"fill"}
                                  className="h-6 w-6"
                                />
                                <p className="text-sm font-medium text-secondary-text">
                                  Drag and drop here to upload
                                </p>
                                <p className="text-xs text-[#616161]">
                                  png, .jpg, 1000x1000px
                                </p>
                            </>
                        )}
                        <input
                          type="file"
                          id="image-upload"
                          accept="image/png, image/jpeg"
                          className="hidden"
                          onChange={handleUploadImage}
                          ref={fileInputRef}
                        />
                        {errors.image && (
                          <p className="text-sm font-medium text-secondary-text">
                            {errors.image.message as string}
                          </p>
                        )}
                      </div>
                    </label>
                  </div>
                  <div className="flex w-2/4 flex-col gap-1">
                    <p className="text-base font-medium">
                      <span className="text-secondaryRed">*</span> Description
                    </p>
                    <textarea
                      className="h-full rounded-lg bg-input px-[16px] pb-4 pt-2"
                      placeholder="Ex: First community token on Zoken..."
                      {...register("description")}
                    />
                    {errors.description && (
                      <p className="ml-2 text-xs text-secondaryRed">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>
              <section className="flex flex-col gap-4">
                <div className="flex h-12 flex-col justify-between">
                  <h2 className="text-lg font-medium">
                    Add Social Links & Tags
                  </h2>
                  <p className="text-sm text-secondary-subText">
                    Max 32 characters in your name
                  </p>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-center gap-4">
                      <span className="min-w-[72px] text-base font-medium">
                        Website:
                      </span>
                      <Input
                        icon={<Icon name="web" />}
                        placeholder="https://"
                        className="h-[42px]"
                        {...register("websiteUrl")}
                      />
                    </div>
                    {errors.websiteUrl && (
                      <p className="ml-[88px] text-xs text-secondaryRed">
                        {errors.websiteUrl.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-center gap-4">
                      <span className="min-w-[72px] text-base font-medium">
                        Telegram:
                      </span>
                      <Input
                        icon={<Icon name="telegram" variant={"fill"} />}
                        placeholder="https://t.me/"
                        className="h-[42px]"
                        {...register("telegramUrl")}
                      />
                    </div>
                    {errors.telegramUrl && (
                      <p className="ml-[88px] text-xs text-secondaryRed">
                        {errors.telegramUrl.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-center gap-4">
                      <span className="min-w-[72px] text-base font-medium">
                        Discord:
                      </span>
                      <Input
                        icon={<Icon name="discord" />}
                        placeholder="https://"
                        className="h-[42px]"
                        {...register("discordUrl")}
                      />
                    </div>
                    {errors.discordUrl && (
                      <p className="ml-[88px] text-xs text-secondaryRed">
                        {errors.discordUrl.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-center gap-4">
                      <span className="min-w-[72px] text-base font-medium">
                        Twitter:
                      </span>
                      <Input
                        icon={<Icon name="web" />}
                        placeholder="https://"
                        className="h-[42px]"
                        {...register("xUrl")}
                      />
                    </div>
                    {errors.xUrl && (
                      <p className="ml-[88px] text-xs text-secondaryRed">
                        {errors.xUrl.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>
              {chainId !== SEPOLIA_ID ? (
                <Button
                  type="button"
                  className="w-full bg-red-500 hover:bg-red-600"
                  onClick={() => switchChain({ chainId: SEPOLIA_ID })}
                >
                  Running on Wrong Network. Switch to Sepolia
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  onClick={handleSubmit(onSubmit)}
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
              )}
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};
export default TokenCreator;
