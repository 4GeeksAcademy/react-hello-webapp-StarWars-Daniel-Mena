import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Character = (props) => {

	const url = `/details/people/${props.id}`

	const [bgButton, setBgButton] = useState(false);
	const [bgIcon, setBgIcon] = useState(false)
	const [selcFav, setSelecFav] = useState(false)

	const { store, actions } = useContext(Context);

	useEffect(()=>{
		if (store.favourite.includes(props.name)) {
			setSelecFav(true)
			setBgIcon(true)
		}
		else{
			setSelecFav(false)
			setBgIcon(false)
		}
	}, [store.favourite])

	const buttonOver = () =>{
		setBgButton(true)
	}

	const buttonOut = () =>{
		setBgButton(false)
	}

	const iconOver = () =>{
		setBgIcon(true)
	}

	const iconOut = () =>{
		if(selcFav===false){
			setBgIcon(false)
		}
	}

	return (
		<div className="card border border-warning" style={{width: "18rem"}}>
			<img src="https://www.servithermic.cl/images/400X200.gif" className="card-img-top" alt="Character img"/>
			<div className="card-body">
				<h5 className="card-title mb-5">{props.name}</h5>
				<div className="d-flex justify-content-between">
					<Link to={url}>
						<button type="button" className={`btn ${bgButton==false ? "btn-outline-primary" : "btn-primary"}`} onMouseOver={buttonOver} onMouseOut={buttonOut}>
							Learn More!
						</button>
					</Link>
					<i className={`fa fa-2x fa-heart mt-1 me-1 ${bgIcon==false ? "text-primary": "text-warning"}`} onMouseOver={iconOver} onMouseOut={iconOut} onClick={() => {actions.addFavourite(props.name)}}></i>
				</div>
			</div>
		</div>
	);
};

Character.propTypes = { 
	key: PropTypes.string,
	name: PropTypes.string
}
