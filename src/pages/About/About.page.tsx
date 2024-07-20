import React from "react";
import { Navbar } from "../../components";
import "./About.style.css";

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



export function AboutPage() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [response, setResponse] = React.useState<any>(null);

  React.useEffect(() => {
    fetch("/public/about.json")
      .then((res) => res.json())
      .then((res) => setResponse(res))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div className="about-wrapper">
        <h1>About</h1>
        <LoaderSkeleton loading={loading} error={error}>
          <div className="infos-wrapper">
            {response?.about?.infos?.map((info) => <p>{info}</p>)}
            {response?.about?.descriptions?.map((des) => (
              <div dangerouslySetInnerHTML={{ __html: des }} />
            ))}
          </div>
        </LoaderSkeleton>
      </div>
    </>
  );
}
