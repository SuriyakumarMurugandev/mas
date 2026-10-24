import { useState } from "react";
import { Image, Row } from "antd";
import SignUpCard from "./SignUpCard";
import CompanyTypeSelection from "./CompanyTypeSelection";
import RegistrationSuccess from "./RegistrationSuccess";
import background from "../assets/signup-back.png";
import Logo from "../assets/Logowhite.png";
import "./AuthPages.css";

const SignUp = () => {
  const [companyType, setCompanyType] = useState(null);
  const [companyAdded, setCompanyAdded] = useState(false);

  return (
    <main className="auth-page signup-page" style={{ "--auth-background": `url(${background})` }}>
      <div className="auth-background-overlay" />
      <a className="signup-logo" href="/" aria-label="OneOrbit home">
        <Image src={Logo} preview={false} alt="OneOrbit" />
      </a>

      <div className="signup-content-wrap">
        <div className="signup-page-heading">
          <span className="auth-eyebrow"><span /> GET YOUR BUSINESS CONNECTED</span>
          <h1>Let’s build your <span>workspace.</span></h1>
          <p>Choose your business type to get started with OneOrbit.</p>
        </div>

        <Row justify="center" className="signup-content-row">
          <div className="signup-content-inner">
            {!companyType && !companyAdded && <CompanyTypeSelection onSelect={setCompanyType} />}
            {companyType && !companyAdded && (
              <SignUpCard companyType={companyType} onSuccess={() => setCompanyAdded(true)} onBack={() => setCompanyType(null)} />
            )}
            {companyAdded && <RegistrationSuccess />}
          </div>
        </Row>
      </div>
      <div className="auth-footer-note signup-footer-note">OneOrbit <span>✳</span> Your workday, better connected.</div>
    </main>
  );
};

export default SignUp;
