import GetInTouchForm from "./contactpage";

export const metadata = {
    title: "Contact Us | JEF UAE – Connect for Electrical Solutions",
    description:
        "Reach out to JEF UAE for inquiries, support, or collaboration. Our team is ready to assist you with tailored electrical and safety solutions.",
    keywords:
        "contact JEF UAE, electrical solutions, safety systems, customer support, business inquiries, JEF UAE contact",
    alternates: {
        canonical: "https://www.jeftechno.com/get-in-touch",
    },
    openGraph: {
        url: "https://www.jeftechno.com/get-in-touch",
        description:
            "Reach out to JEF UAE for inquiries, support, or collaboration. Our team is ready to assist you with tailored electrical and safety solutions.",
        siteName: "Contact Us | JEF UAE – Connect for Electrical Solutions",
        title: "Contact Us | JEF UAE – Connect for Electrical Solutions",
    },
};

export default function GetInTouchPage() {
    return (
        <GetInTouchForm />
    );
}
