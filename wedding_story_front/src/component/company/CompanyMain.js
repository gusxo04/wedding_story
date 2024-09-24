import { Route, Routes } from "react-router-dom";
import CompanyJoin from "./CompanyJoin";
import "./company.css";
import CompanyInfo from "./CompanyInfo";

const CompanyMain = () => {
  return (
    <div className="company-wrap">
      <div className="side-info">
        <section className="section">
          <div className="side-info-content">사이드 정보 테스트</div>
        </section>
      </div>
      <section className="content-wrap">
        <Routes>
          <Route path="join" element={<CompanyJoin />} />
          <Route path="info" element={<CompanyInfo />} />
        </Routes>
      </section>
    </div>
  );
};
export default CompanyMain;
