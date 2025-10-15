import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ascent." },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];
      const parsedResumes = resumes?.map((resume) => JSON.parse(resume.value) as Resume);
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex flex-col">
      <Navbar />

      <section className="main-section flex-grow">
        <div className="page-heading py-16 text-center">
          <h2>Welcome to Ascent.</h2>
          {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check personalized feedback.</h2>
          )}
        </div>

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section flex flex-wrap justify-center gap-6 px-4">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="relative mt-32 overflow-hidden">
        {/* Decorative top border with glow */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-white blur-sm opacity-50"></div>
        
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-[#0a0a0a] to-transparent"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-8 py-16">
          {/* Main content */}
          <div className="flex flex-col items-center gap-12">
            
            {/* Branding with decorative elements */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative">
                <h3 className="text-5xl font-bold text-gradient tracking-tight">Ascent.</h3>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
              </div>
              <p className="text-neutral-400 text-lg max-w-md italic">
                Get smart feedback OF your resume FOR your dream job
              </p>
            </div>

            {/* Social links with stylish boxes */}
            <div className="flex flex-wrap justify-center gap-4">
              {/* GitHub */}
              <a
                href="https://github.com/psypherion/ascent"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3 px-6 py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border border-neutral-800 rounded-full hover:border-white transition-all duration-500 glow-subtle hover:glow-box"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm text-neutral-400 group-hover:text-white transition-colors font-medium">GitHub</span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/ongbongchhong"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3 px-6 py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border border-neutral-800 rounded-full hover:border-white transition-all duration-500 glow-subtle hover:glow-box"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-sm text-neutral-400 group-hover:text-white transition-colors font-medium">Instagram</span>
              </a>

              {/* Twitter/X */}
              <a
                href="https://twitter.com/psypherion"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3 px-6 py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border border-neutral-800 rounded-full hover:border-white transition-all duration-500 glow-subtle hover:glow-box"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-sm text-neutral-400 group-hover:text-white transition-colors font-medium">Twitter</span>
              </a>

              {/* Email */}
              <a
                href="mailto:sayan84c@gmail.com"
                className="group relative flex items-center gap-3 px-6 py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border border-neutral-800 rounded-full hover:border-white transition-all duration-500 glow-subtle hover:glow-box"
                aria-label="Email"
              >
                <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-neutral-400 group-hover:text-white transition-colors font-medium">Email</span>
              </a>
            </div>

            {/* Divider */}
            <div className="w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent"></div>

            {/* Bottom section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full max-w-4xl text-sm">
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">Powered by</span>
                <a 
                  href="https://docs.puter.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-neutral-300 transition-colors font-semibold relative group"
                >
                  Puter.js ⚡️
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
                </a>
              </div>
              
              <p className="text-neutral-500 text-xs">
                © {new Date().getFullYear()} Ascent. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}