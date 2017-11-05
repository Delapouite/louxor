// @flow

import { Component } from 'react'
import { button, div, i } from 'react-hyperscript-helpers'

type Props = {
	date: number,
	onPick: (number) => any,
}

type State = {
	decade: number,
	digit: number,
}

class YearPicker extends Component<Props, State> {
	constructor (...args: any) {
		super(...args)
		this.state = {
			decade: Math.trunc(this.props.date / 10),
			digit: Math.floor(this.props.date % 10),
		}
	}

	render () {
		const date = this.state.decade * 10 + this.state.digit
		const decades = [197, 198, 199, 200, 201]
		return (
			div('.year-picker', [
				div('.year-picker-decades', decades.map(d => div('.year-picker-decade', {
					className: Math.trunc(date / 10) === d ? 'selected' : '',
					onClick: () => this.setState({ decade: d })
				}, d))),

				div('.year-picker-digits', ([...Array(5)]).map((_, d) => div('.year-picker-digit', {
					className: Math.floor(date % 10) === d ? 'selected' : '',
					onClick: () => this.setState({ digit: d })
				}, d))),
				div('.year-picker-digits', ([...Array(5)]).map((_, d) => div('.year-picker-digit', {
					className: Math.floor(date % 10) === d + 5 ? 'selected' : '',
					onClick: () => this.setState({ digit: d + 5 })
				}, d + 5))),

				div('.year-picker-button', [
					button('.material-button', {
						onClick: () => this.props.onPick(this.state.decade * 10 + this.state.digit) },
						[ i('.material-icons', 'check_circle') ])
					]),
			])
		)
	}
}

export default YearPicker
