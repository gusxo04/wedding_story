import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { loginNoState } from "../utils/RecoilData";
import { cancelPay } from "./conventionRefund";
import ConventionLoading from "./ConventionLoading";

const RefundTicket = (props) => {

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const backUrl = "convention/refund";
  
  const {
    closeAlert,
    payment,
    isPayment,
    setIsPayment,
  } = props;

  const [memberNoState, setMemberNoState] = useRecoilState(loginNoState);
  const [refundReason, setRefundReason] = useState("");
  const [refundStatus, setRefundStatus] = useState(false);

  const reasonRef = useRef(null);

  const [result, setResult] = useState(-1);
  const refundTicket = () => {
    setRefundStatus(true);
    cancelPay(payment, backUrl, setResult, refundReason);
  }

  useEffect(() => {
    if(result === 0){
      Swal.fire({
        title : "박람회 환불",
        text : "잠시후 다시 시도해주세요",
        confirmButtonColor : "var(--main1)",
        confirmButtonText : "확인"
      })
      closeAlert(0, true);
    }
    else if(result === 1){
      setIsPayment(!isPayment);
      Swal.fire({
        title : "박람회 환불",
        text : "환불 완료",
        confirmButtonColor : "var(--main1)",
        confirmButtonText : "확인"
      })
      closeAlert(0, true);
      setRefundStatus(false);
    }
  }, [result]);
  
  
  return (
    <div className="convention-member-alert-wrap convention-refund-wrap" id="convention-close-screen" onClick={closeAlert}>
      <div className="convention-refund-alert-wrap">
        <div className="convention-refund-title df-basic">
          <span>박람회 티켓 환불</span>
        </div>

        <div className="convention-refund-content">
          <div className="convention-refund-span df-basic">
            {refundStatus ?
            <span>환불에는 다소 시간이 소요될 수 있습니다.</span>
            :
            <span>티켓 환불 사유</span>
            }
          </div>

          <div className="convention-refund-reason df-basic">
            <textarea id="refund-text" value={refundReason} ref={reasonRef} onChange={(e) => {
              setRefundReason(e.target.value);
              if(reasonRef.current.scrollHeight > reasonRef.current.clientHeight){
                reasonRef.current.style.borderRadius = "20px 0px 0px 20px";
              }
              else if(reasonRef.current.scrollHeight == reasonRef.current.clientHeight){
                reasonRef.current.style.borderRadius = "20px";
              }
            }}></textarea>
            {refundStatus ?
            <div id="convention-loading">
              <ConventionLoading loadingTime={0} />
            </div>
            :
            ""
            }
          </div>
          
        </div>

        <div className="convention-refund-btn df-basic">
          <button id="refund-btn" className="main-btn" onClick={refundTicket}>환불하기</button>
        </div>

      </div>
    </div>
  )
}
export default RefundTicket