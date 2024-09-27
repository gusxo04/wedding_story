import { Route, Routes } from "react-router-dom";
import CompanyJoin from "./CompanyJoin";
import "./company.css";
import CompanyInfo from "./CompanyInfo";
import CompanyProduct from "./CompanyProduct";
import CompanyHeader from "../common/CompanyHeader";
import { useRecoilState } from "recoil";
import { companyNoState } from "../utils/RecoilData";
import CompanyNoNull from "./CompanyNoNull";

const CompanyMain = () => {
  const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
  console.log(companyNo);
  return (
    <>
      <div className="company-wrap">
        <div className="side-info">
          <section className="section">
            <div className="side-info-content">사이드 정보 테스트</div>
          </section>
        </div>

        <section className="content-wrap">
          <Routes>
            <Route path="null" element={<CompanyNoNull />} />
            <Route path="join" element={<CompanyJoin />} />
            <Route path="info" element={<CompanyInfo />} />
            <Route path="product" element={<CompanyProduct />} />
          </Routes>
        </section>
      </div>
    </>
  );
};
export default CompanyMain;
