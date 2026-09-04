import Blog from "./MainBlogPage";

export const metadata = {
    title: 'Latest Insights & Expert Updates | JEF UAE Blog on Electrical Solutions',
    description:
        "Stay informed with JEF UAE's latest blog posts on electrical safety, grounding solutions, and industry trends. Expert insights to enhance your knowledge.",
    keywords:
        'JEF UAE blog, electrical safety, grounding solutions, industry trends, expert insights, electrical engineering, safety standards',
    alternates: {
        canonical: 'https://www.jeftechno.com/blogs',
    },
    openGraph: {
        url: 'https://www.jeftechno.com/blogs',
        description:
            "Stay informed with JEF UAE's latest blog posts on electrical safety, grounding solutions, and industry trends. Expert insights to enhance your knowledge.",
        siteName: 'Latest Insights & Expert Updates | JEF UAE Blog on Electrical Solutions',
    },
}

export default function BlogPage() {
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.jeftechno.com/' // or jeftechno.com depending on region
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blogs',
                item: 'https://www.jeftechno.com/blogs'
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <Blog />
        </>
    );
}
