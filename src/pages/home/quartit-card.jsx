import { useNavigate } from "react-router-dom";

export default function QuartitCard(props) {
  const navigate = useNavigate();

  return (
    <>
      <div className={props.breackPoint} >
        <div className="card px-3 py-4 mx-2" >
          <h5 className="card-title text-truncate">{props.title}</h5>

          <div className="row card-img-top" style={{height:'16rem'}}>
            <img className="w-50" src={props.image1} alt="" style={{height:'7rem'}}
             onClick={() => {
               navigate(`/products/category/${props.navigation}`);
             }}
            />

            <img className="w-50" src={props.image2} alt="" style={{height:'7rem'}}
             onClick={() => {
                navigate(`/products/category/${props.navigation}`);
              }}
            />

            <img className="w-50" src={props.image3} alt="" style={{height:'7rem'}}
            onClick={() => {
                navigate(`/products/category/${props.navigation}`);
              }}
            />

            <img className="w-50" src={props.image4} alt="" style={{height:'7rem'}}
            onClick={() => {
                navigate(`/products/category/${props.navigation}`);
              }}
            />
          </div>
          <div className="card-body pt-2 pb-lg-1">
            <a
              onClick={() => {
                navigate(`/products/category/${props.navigation}`);
              }}
              className="card-link text-decoration-none text-truncate"
            >
              {props.body}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
