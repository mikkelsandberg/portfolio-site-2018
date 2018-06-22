import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./WorkHeader.css";

class WorkHeader extends Component {
	render() {
		const { workLabel, workTitle } = this.props;

		return (
			<header className="workDetails__header">
				<nav className="workDetails__header__nav">
					<Link to="/my-work" className="workDetails__header__nav__link">
						Back to my work
					</Link>
				</nav>
				<h2 className="workDetails__header__label">{workLabel}</h2>
				<h1 className="workDetails__header__title">{workTitle}</h1>
			</header>
		);
	}
}

export default WorkHeader;