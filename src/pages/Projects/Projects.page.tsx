import React from "react";
import { Navbar } from "../../components";
import "./Projects.style.css";

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

export function ProjectsPage() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [response, setResponse] = React.useState<any>(null);

  React.useEffect(() => {
    fetch("/public/projects.json")
      .then((res) => res.json())
      .then((res) => setResponse(res))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div className="projects-wrapper">
        <h1>Projects</h1>
        <LoaderSkeleton loading={loading} error={error}>
          {response?.projects?.map((project) => {
            return (
              <div className="project-wrapper">
                <h4>{project?.title}</h4>
                {project?.descriptions?.map((description, index) => {
                  if (
                    project?.descriptions?.length === index + 1 &&
                    typeof project.link === "string"
                  )
                    return (
                      <div>
                        <p>{description}</p>
                        <a href={project?.link}>[link]</a>
                      </div>
                    );
                  return <p>{description}</p>;
                })}
              </div>
            );
          })}
        </LoaderSkeleton>
      </div>
    </>
  );
}
