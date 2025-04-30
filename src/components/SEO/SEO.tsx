// src/components/SEO/SEO.tsx
import React from "react";
import { Helmet } from "react-helmet";

interface SEOProps {
	title?: string;
	description?: string;
	keywords?: string;
	ogType?: "website" | "article" | "profile";
	ogImage?: string;
	ogUrl?: string;
	twitterCard?: "summary" | "summary_large_image";
	canonicalUrl?: string;
	structuredData?: Record<string, any>;
	noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
	title = "Delta Edge Capital | Alternative Investments",
	description = "Delta Edge Capital is an alternate investment fund delivering consistent, risk-managed returns through proprietary trading systems. Discover how we scale precision into profit.",
	keywords = "investment, wealth management, financial growth, delta edge",
	ogType = "website",
	ogImage = "/images/og-default-image.png",
	ogUrl,
	twitterCard = "summary_large_image",
	canonicalUrl,
	structuredData,
	noIndex = false,
}) => {
	const siteUrl = "https://deltaedgecapital.co.uk";
	const fullUrl = ogUrl || canonicalUrl || siteUrl;
	const fullImageUrl = ogImage.startsWith("http")
		? ogImage
		: `${siteUrl}${ogImage}`;

	return (
		<Helmet>
			{/* Basic Metadata */}
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />

			{/* Canonical Link */}
			{canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

			{/* Open Graph / Facebook */}
			<meta property="og:type" content={ogType} />
			<meta property="og:url" content={fullUrl} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={fullImageUrl} />

			{/* Twitter */}
			<meta name="twitter:card" content={twitterCard} />
			<meta name="twitter:url" content={fullUrl} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={fullImageUrl} />

			{/* Robots */}
			{noIndex && <meta name="robots" content="noindex, nofollow" />}

			{/* Structured Data / JSON-LD */}
			{structuredData && (
				<script type="application/ld+json">
					{JSON.stringify(structuredData)}
				</script>
			)}
		</Helmet>
	);
};

export default SEO;
