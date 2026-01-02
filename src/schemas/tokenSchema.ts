import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

const optionalUrl = z.url().optional().or(z.literal(""));

export const createTokenSchema = z.object({
  name: z.string().min(1, "Name is required"),
  symbol: z.string().min(1, "Symbol is required").max(8, ""),
  decimals: z.coerce.number().min(1).max(18),
  supply: z.coerce.number().positive(),
  amountPerMint: z.coerce.number().min(1, "Amount permint must be at least 1"),
  description: z.string().min(1, "description is required").max(500),
  websiteUrl: optionalUrl,
  telegramUrl: optionalUrl,
  xUrl: optionalUrl,
  discordUrl: optionalUrl,
  image: z
    .any()
    .refine((files) => files?.length > 0, "Image is required")
    .refine((files) => {
      return ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type);
    }, "Only jpg, and .png formats are supported")
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, "Max file size is 5MB."),
});

export type CreateTokenFormValues = z.infer<typeof createTokenSchema>;
