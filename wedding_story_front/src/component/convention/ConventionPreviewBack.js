import { Viewer } from "@toast-ui/react-editor";
import { useState } from "react";

const ConventionPreviewBack = (props) => {

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const {
    imgStyle,
    conventionTitle,
    conventionContent,
    conventionStart,
    conventionEnd,
    conventionPrice,
    conventionLimit,
    conventionTime,
    showImage,
    conventionImg
  } = props;

  const [fixedPrice, setFixedPrice] = useState(conventionPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

  // console.log(props);
  
  return (
    <div className="back-main-wrap">
      <div className="back-image-zone">
        {showImage ? 
        <img id="back-image" src={showImage} />
        : 
        conventionImg ? 
        <img id="back-image" src={`${backServer}/convention/image/${conventionImg}`} />
        :
        <img id="back-image" src="/image/default_img.png" />
        }
      </div>

      <div className="back-inner-img-zone">
        <div className="back-info-title">
          <div className="back-title">{conventionTitle}</div>
        </div>

        <div className="back-info-date">
          <div>일정 : {conventionStart} ~ {conventionEnd} <br /> 시간 : {conventionTime}</div>
        </div>
        
        <div className="back-info-price">
          <div>가격 : {fixedPrice}원</div>
        </div>

        <div className="back-info-limit">
          <div>정원 : {conventionLimit}명</div>
        </div>

        <div className="back-info-content">
          {conventionContent ? 
          <Viewer initialValue={conventionContent} />
          : 
          ""}
        </div>

      </div>
      
    </div>
  )
}
export default ConventionPreviewBack