import React, { Component } from 'react';
import WorkImages from '../WorkImages/WorkImages';
import WorkDescription from '../WorkDescription/WorkDescription';
import Header from '../Header/Header';
import NotFound from '../NotFound/NotFound';
import './WorkDetails.css';
import PropTypes from 'prop-types';

class WorkDetails extends Component {
	componentDidMount() {
		this.props.scrollToTop();
	}

	findWorkItem = (item, matchItem) => {
		let formattedName = `${this.props.formatText(
			item.workLabel
		)}-${this.props.formatText(item.workTitle)}`;

		return formattedName === matchItem;
	};

	getIndexOfWorkItem = () => {
		const { workData } = this.props;
		const { workName } = this.props.match.params;
		let index;

		index = workData.findIndex(item => {
			return this.findWorkItem(item, workName);
		});

		return index;
	};

	filteredWork = () => {
		const { workData } = this.props;
		const workItemObj = {
			prev: (this.getIndexOfWorkItem() + workData.length - 1) % workData.length,
			current: this.getIndexOfWorkItem(),
			next: (this.getIndexOfWorkItem() + 1) % workData.length,
		};

		return workItemObj;
	};

	showWork = () => {
		if (this.filteredWork().current === -1) {
			return (
				<section className="contentWrapper">
					<Header text="Not Found" />
					<NotFound />
				</section>
			);
		} else {
			const { workData, formatText } = this.props;
			const { filteredWork } = this;
			const {
				workLabel,
				workTitle,
				images,
				description,
				skills,
				links,
			} = workData[filteredWork().current];

			const prevFormatted = `${formatText(
				workData[filteredWork().prev].workLabel
			)}-${formatText(workData[filteredWork().prev].workTitle)}`;

			const nextFormatted = `${formatText(
				workData[filteredWork().next].workLabel
			)}-${formatText(workData[filteredWork().next].workTitle)}`;

			return (
				<section className="workDetails">
					<WorkImages
						images={images}
						workLabel={workLabel}
						workTitle={workTitle}
					/>
					<WorkDescription
						workTitle={workTitle}
						workLabel={workLabel}
						description={description}
						skills={skills}
						links={links}
						currentNum={filteredWork().current + 1}
						numItems={workData.length}
						linkToPrev={prevFormatted}
						linkToNext={nextFormatted}
					/>
				</section>
			);
		}
	};

	render() {
		return this.showWork();
	}
}

WorkDetails.propTypes = {
	scrollToTop: PropTypes.func.isRequired,
	formatText: PropTypes.func.isRequired,
	workData: PropTypes.array.isRequired,
};

export default WorkDetails;
