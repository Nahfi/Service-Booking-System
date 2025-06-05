import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import favicon from "../../../assets/images/favicon/vite.svg";
    
const SEO = ({
    title = "QukMsg",
    description = "QukMsg - Your Messaging Solution",
    keywords = "",
    canonicalUrl = "",
    ogImage = "",
    ogType = "website",
}) => {
    const site_name: string = "QukMsg";
    const faviconUrl: string = favicon; 
    const themeColor: string = "#106aeb";

    console.log(faviconUrl);
    
    
    return (
        <Helmet>
            <html lang="en" dir="ltr" />
            <title>{`${title} | ${site_name}`}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}

            <meta charset="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />

            <meta name="theme-color" content={themeColor} />
            {/* Canonical URL */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Open Graph Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            {ogImage && <meta property="og:image" content={ogImage} />}
            <meta property="og:site_name" content="QukMsg" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {ogImage && <meta name="twitter:image" content={ogImage} />}

            {/* Favicon */}
            {faviconUrl && (
                // <link rel="shortcut icon" href={faviconUrl} alt="favicon" />
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href={faviconUrl}
                    alt="favicon"
                />
            )}
        </Helmet>
    );
};

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    canonicalUrl: PropTypes.string,
    ogImage: PropTypes.string,
    ogType: PropTypes.string,
};

export default SEO;
