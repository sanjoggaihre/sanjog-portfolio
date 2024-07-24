import React from "react";
import { Navbar } from "../../components";
import "./Publications.style.css";

function LoaderSkeleton({
  loading,
  error,
  children,
}: {
  loading: boolean;
  error?: boolean;
  children: React.ReactNode;
}) {
  if (error) return <p>Something went wrong!</p>;
  if (loading) return <p>loading...</p>;
  return children;
}

function ScholarText({ text, link }: { text: string; link: string }) {
  if (typeof text !== "string" || typeof link !== "string") return null;

  return <a href={link}>[{text}]</a>;
}

export function PublicationsPage() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [response, setResponse] = React.useState<any>(null);

  React.useEffect(() => {
    fetch("/sanjog-portfolio/publications.json")
      .then((res) => res.json())
      .then((res) => setResponse(res))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div className="publications-wrapper">
        <h1>Publications</h1>
        <LoaderSkeleton loading={loading} error={error}>
          <>
            <ScholarText
              link={response?.googleScholarLink}
              text={response?.googleScholarText}
            />
            {response?.publications?.map((publication) => {
              return (
                <div className="publication-wrapper">
                  <h4>{publication?.title}</h4>
                  {publication?.descriptions?.map((description, index) => {
                    if (
                      publication?.descriptions?.length === index + 1 &&
                      typeof publication.link === "string"
                    )
                      return (
                        <div>
                          <p>{description}</p>
                          <a href={publication?.link}>[paper]</a>
                        </div>
                      );
                    return <p>{description}</p>;
                  })}
                </div>
              );
            })}
          </>
        </LoaderSkeleton>
      </div>
    </>
  );
}
