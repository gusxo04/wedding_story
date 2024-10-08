import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./member.css";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useRecoilState } from "recoil";
import { companyNoState, loginIdState, memberCodeState, memberTypeState } from "../utils/RecoilData";
import SearchId from "./SearchId";
import SearchPw from "./SearchPw";

const Login = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const navigate = useNavigate();
	const [loginId, setLoginId] = useRecoilState(loginIdState);
	const [memberType, setMemberType] = useRecoilState(memberTypeState);
	const [memberCode, setMemberCode] = useRecoilState(memberCodeState);
	const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
	const [memberNo, setMemberNo] = useRecoilState(loginIdState);
	const [isModal1Open, setIsModal1Open] = useState(false);
	const [isModal2Open, setIsModal2Open] = useState(false);
	const [member, setMember] = useState({
		memberId: "",
		memberPw: "",
	});
	const changeInput = (e) => {
		const name = e.target.name;
		setMember({ ...member, [name]: e.target.value });
	};
	const login = () => {
		if (member.memberId === "" || member.memberPw === "") {
			Swal.fire({
				text: "아이디 또는 패스워드를 확인해 주세요.",
				icon: "info",
			});
			return;
		}
		axios
			.post(`${backServer}/member/login`, member)
			.then((res) => {
				console.log(res.data);
				if (res.data.memberType !== 4) {
					setLoginId(res.data.memberId);
					setMemberType(res.data.memberType);
					setMemberCode(res.data.memberCode);
					setCompanyNo(res.data.companyNo);
					setMemberNo(res.data.memberNo);
					axios.defaults.headers.common["Authorization"] = res.data.accessToken;
					window.localStorage.setItem("refreshToken", res.data.refreshToken);
					if (res.data.memberType === 0 || res.data.memberType === 3) {
						navigate("/admin");
					} else if (res.data.memberType === 1) {
						navigate("/");
					} else if (res.data.memberType === 2) {
						navigate("/company");
					}
				} else if (res.data.memberType === 4) {
					Swal.fire({
						text: "탈퇴한 회원입니다.",
						icon: "info",
					});
				}
			})
			.catch((err) => {
				console.log(err);
				Swal.fire({
					text: "아이디 또는 패스워드를 확인해 주세요.",
					icon: "info",
				});
			});
	};
	const closeModal = () => {
		setIsModal1Open(false);
		setIsModal2Open(false);
	};
	return (
		<main className="login-wrap">
			<div className="login-wrap-content">
				<div>
					<div className="login-title">
						<div>
							<h2>MEMBER</h2>
							<h1>로그인</h1>
						</div>
					</div>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							login();
						}}
					>
						<div className="login-inputbox">
							<div>
								<div className="login-input">
									<input type="text" name="memberId" placeholder="아이디" onChange={changeInput} value={member.memberId} />
								</div>
								<div className="login-input">
									<input type="password" name="memberPw" placeholder="비밀번호" onChange={changeInput} value={member.memberPw} />
								</div>
							</div>
						</div>
						<div className="login-button">
							<div>
								<button className="login-btn">LOGIN</button>
							</div>
						</div>
					</form>
					<div className="login-linkBox">
						<Link to="/join/agree">회원가입</Link>
						<span>|</span>
						<span
							onClick={() => {
								setIsModal1Open(true);
							}}
							style={{ cursor: "pointer" }}
						>
							아이디 찾기
						</span>
						<span>|</span>
						<span
							onClick={() => {
								setIsModal2Open(true);
							}}
							style={{ cursor: "pointer" }}
						>
							비밀번호 찾기
						</span>
					</div>
					{/* 
					<div className="login-simple-line">
						<div>
							<div className="joinLine2"></div>
							<div className="login-simple-info">
								<p>간편 로그인</p>
							</div>
							<div className="joinLine2"></div>
						</div>
					</div>*/}
				</div>
			</div>
			{/* 모달 */}
			{isModal1Open ? (
				<div className="login-searchMember-wrap">
					<div>
						<span className="login-searchMember-close" onClick={closeModal}>
							&times;
						</span>
						<div className="login-searchMember-content">
							<SearchId />
						</div>
					</div>
				</div>
			) : isModal2Open ? (
				<div className="login-searchMember-wrap">
					<div>
						<span className="login-searchMember-close" onClick={closeModal}>
							&times;
						</span>
						<div className="login-searchMember-content">
							<SearchPw setIsModal2Open={setIsModal2Open} />
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</main>
	);
};
export default Login;
