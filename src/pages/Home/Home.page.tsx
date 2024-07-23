import React, { useEffect } from "react";
import baffle from "baffle";
import "./home.page.css";
import { Navbar } from "../../components";
import "../About/About.style.css";
import { FaFacebookSquare, FaLinkedin, FaGithub} from "react-icons/fa";

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

function reveal() {
  const b = baffle("#sanjog-gaihre-title", {
    characters: "▒▒░ ▒>█▒░ <▒/▓░ ▒▒▓ ▒<▒▓█ ▓▓▒▒ █>█ >/░▒ █>▓░",
    speed: 150,
  });
  b.start();
  setTimeout(() => {
    b.stop();
    b.reveal(1000);
  }, 2000);
}

export function HomePage() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [response, setResponse] = React.useState<any>(null);
  useEffect(() => {
    reveal();
  }, []);

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
      <div className="home-page-wrapper">
        <h1 id="sanjog-gaihre-title">Sanjog Gaihre</h1>
      </div>
      <div className="about-wrapper">
        <h2>About</h2>
        <LoaderSkeleton loading={loading} error={error}>
          <div className="infos-wrapper">
            {response?.about?.descriptions?.map((des) => (
              <div dangerouslySetInnerHTML={{ __html: des }} />
            ))}
            <h2>Contact</h2>
            {response?.about?.infos?.map((info) => <p>{info}</p>)}
          </div>
        </LoaderSkeleton>
        <div className="footer-wrapper">
          <a
            href="https://www.facebook.com/san.jook.9"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookSquare size="24px" />
          </a>
          <a
            href="https://www.linkedin.com/in/sanjoggaihre0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size="24px" />
          </a>
          <a
            href="https://github.com/sanjoggaihre"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size="24px" />
          </a>
        </div>
      </div>
    </>
  );
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
