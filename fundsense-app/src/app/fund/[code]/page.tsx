import type { Metadata } from "next";
import FundDetailClient from "./FundDetailClient";

type FundApiResponse = {
  meta?: {
    scheme_name?: string;
  };
  data?: Array<{
    nav?: string;
  }>;
};

type PageProps = {
  params: {
    code: string;
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const code = params.code;
  try {
    const res = await fetch(`https://api.mfapi.in/mf/${code}`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = (await res.json()) as FundApiResponse;
    const title = data?.meta?.scheme_name || "FundSense — Fund Details";
    const nav = data?.data?.[0]?.nav;
    const description = nav ? `Current NAV: ₹${nav}` : "Current NAV unavailable";

    return {
      title,
      description,
    };
  } catch {
    return {
      title: "FundSense — Fund Details",
      description: "Current NAV unavailable",
    };
  }
}

export default function FundDetailPage() {
  return <FundDetailClient />;
}
