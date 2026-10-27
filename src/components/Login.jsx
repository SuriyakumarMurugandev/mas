import { Row } from "antd";
import LoginCard from "./LoginCard";
import "./AuthPages.css";
import { useEffect } from "react";

const background = require("../assets/handshake-businessmen-1.png");

const Login = () =>{
  // useEffect(() => {
  //   clearAuthStorage()
  // }, []);

  // const clearAuthStorage = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("subscription");
  //   localStorage.removeItem("branches");
  //   localStorage.removeItem("activeBranch");
  // };
  return (
  <main className="auth-page login-page" style={{ "--auth-background": `url(${background})` }}>
    <div className="auth-background-overlay" />
    <a className="auth-brand" href="/" aria-label="OneOrbit home">
      <span className="auth-brand-mark">✳</span>
      <span>oneorbit<span className="brand-period">.</span></span>
    </a>

    <Row className="auth-layout login-layout" align="middle" gutter={[40, 32]}>
      <section className="auth-intro fade-in-up">
        <span className="auth-eyebrow"><span /> ONE WORKSPACE. MANY POSSIBILITIES.</span>
        <h1>Your Workday <span>Starts Here.</span></h1>
        <p>Bring your businesses, branches and people together with one clear, connected management experience.</p>
        <div className="auth-trust">
          <span className="trust-check">✓</span>
          <span><strong>One portal. Every operation.</strong><small>Built for clarity, collaboration and control.</small></span>
        </div>
      </section>

      <section className="auth-card-column fade-in-up">
        <LoginCard />
      </section>
    </Row>
    <div className="auth-footer-note">A smarter way to manage your business network <span>✳</span></div>
  </main>
)
};

export default Login;
