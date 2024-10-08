import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import styles from "./WeddingHallInfo.module.css";
import { Report, ReviewForm } from "../components";
import { useRecoilState } from "recoil";
import { companyNoState, loginIdState } from "../../utils/RecoilData";
import KakaoMap from "../../utils/KakaoMap";

const WeddingHallInfo = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const params = useParams();
	const productNo = params.productNo; // URL에서 상품 번호 가져오기
	const companyNo = params.companyNo; // URL에서 회사 번호 가져오기
	const [product, setProduct] = useState({});
	const [productComment, setProductComment] = useState([]);
	const [loginId, setLoginId] = useRecoilState(loginIdState);
	const [company, setCompany] = useState({ companyNo: "", companyName: "", companyAddr: "" });
	const navigator = useNavigate();
	useEffect(() => {
		axios
			.get(`${backServer}/product/productInfo/${productNo}`)
			.then((res) => {
				console.log(res);
				setProduct(res.data.product);

				// 회사 정보가 제대로 응답되는지 확인 후 설정
				if (res.data.company) {
					setCompany({
						companyNo: res.data.company.companyNo,
						companyName: res.data.company.companyName, // 회사명이 없을 경우 빈 문자열로 대체
						companyAddr: res.data.company.companyAddr, // 주소가 없을 경우 빈 문자열로 대체
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [productNo, companyNo, loginId]);

	useEffect(() => {
		axios
			.get(`${backServer}/productComment/${productNo}`)
			.then((res) => {
				console.log(res);
				setProductComment(res.data || []); // 데이터가 없을 경우 빈 배열로 설정
			})
			.catch((err) => {
				console.log(err);
			});
	}, [productNo]); // 주의: setProductComment를 여기에 넣지 않음
	//console.log(productComment);

	const NumberFormatter = ({ number }) => {
		const formattedNumber = new Intl.NumberFormat("ko-KR").format(number);
		return <span>{formattedNumber}</span>;
	};

	return (
		<section className={styles["product-view-wrap"]}>
			<div className={styles["product-title"]}>
				<h3>웨딩홀 상세보기</h3>
			</div>
			<div className={styles["product-view-content"]}>
				<div className={styles["product-view-info"]}>
					<div className={styles["product-thumbnail"]}>
						<img
							src={product.productImg ? `${backServer}/product/image/${product.productImg}` : "/image/default_img.png"}
							alt={product.productName}
						/>
					</div>
					<div className={styles["product-view-preview"]}>
						<div className={styles["product-report"]}>
							<Link to="/product/hallList">
								<h5>뒤로가기/</h5>
							</Link>
							<button>
								<Report companyNo={company.companyNo} />
							</button>
						</div>
						<table className={styles["product-tbl"]}>
							<tbody>
								<tr>
									<th style={{ width: "20%" }}>회사명</th>
									<td style={{ width: "30%" }}>{company?.companyName || ""}</td>
								</tr>
								<tr>
									<th style={{ width: "20%" }}>상품명</th>
									<td style={{ width: "30%" }}>{product.productName}</td>
								</tr>
								<tr>
									<th style={{ width: "20%" }}>대관료</th>
									<td colSpan={4}>
										<NumberFormatter number={product.coronation} />원
									</td>
								</tr>
								<tr>
									<th style={{ width: "20%" }}>1인 식대</th>
									<td colSpan={4}>
										<NumberFormatter number={product.diningRoom} /> 원
									</td>
								</tr>
								<tr>
									<th style={{ width: "20%" }}>최대 수용 인원</th>
									<td colSpan={4}>{product.numberPeople} 명</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className={styles["product-btn-zone"]}>
					<button type="button" className={styles["btn"]}>
						<Link to="/consult/consult/" state={{ productNo: productNo }}>
							상담하기
						</Link>
					</button>
					<button type="button" className={styles["btn"]}>
						<Link to={`/product/weddingHall/${productNo}`}>예약하기</Link>
					</button>
				</div>
				<div className={styles["product-content-wrap"]}>
					<h3>상세보기</h3>
					{product.productContent ? <Viewer initialValue={product.productContent} /> : "상세보기가 없습니다."}
				</div>
				<br />
				<div>
					<ReviewList productNo={productNo} productComment={productComment} />
				</div>
				<br />
				<div className={styles["product-map-view"]}>
					<h3>회사 위치</h3>
					{company.companyAddr ? <Viewer initialValue={company.companyAddr} /> : "회사위치 정보가 없습니다."}
					<div>{company.companyAddr ? <KakaoMap address={company.companyAddr} /> : ""}</div>
				</div>
			</div>
		</section>
	);
};

const ReviewList = (props) => {
	const backServer = process.env.REACT_APP_BACK_SERVER; // 서버 주소
	const productNo = props.productNo;
	const [reviews, setReviews] = useState([]); // 리뷰 리스트 상태
	const [productComment, setProductComment] = useState([]);

	useEffect(() => {
		axios
			.get(`${backServer}/productComment/${productNo}`)
			.then((res) => {
				console.log(res);
				setProductComment(res.data || []); // 데이터가 없을 경우 빈 배열로 설정
			})
			.catch((err) => {
				console.log(err);
			});
	}, [backServer, productNo]); // 주의: setProductComment를 여기에 넣지 않음
	console.log(productComment);
	// 별점 렌더링 함수
	const renderStars = (rating) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(<FaStar key={i} color={i <= rating ? "gold" : "lightgray"} />);
		}
		return stars;
	};
	return (
		<div className={styles["review-list"]}>
			<h3>리뷰 보기</h3>
			{productComment.length > 0 ? (
				productComment.map((review) => (
					<div key={review.productCommentNo} className={styles["review-item"]}>
						<div className={styles["review-content"]}>
							{/* 별점 */}
							<div className={styles["review-rating"]}>
								{/* 별점 표시 */}
								{renderStars(review.rating)}
							</div>
							{/* 작성 날짜 */}
							<span className={styles["review-date"]}>작성일: {review.creationDate}</span>
							{/* 리뷰 내용 */}
							<p>{review.review}</p>
							{/* 리뷰 이미지 */}
							{review.imageUrl && (
								<div className={styles["review-image"]}>
									<img
										src={`${backServer}/${review.imageUrl}`} // 이미지 경로
										alt="리뷰 이미지"
									/>
								</div>
							)}
						</div>
					</div>
				))
			) : (
				<p>아직 등록된 리뷰가 없습니다.</p>
			)}
		</div>
	);
};
export default WeddingHallInfo;
