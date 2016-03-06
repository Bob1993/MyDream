import React from 'react'

export default class Garden extends React.Component {
	constructor (props) {
		super (props)
		this.starting = this._getStartTime()
		this.state = {
			shownTimes: this._timeElapse(this.starting)
		}

	}

	_getStartTime () {
		let starting = new Date()
		starting.setFullYear(2015, 1, 20)
		starting.setHours(0)
		starting.setMinutes(0)
		starting.setSeconds(0)
		starting.setMilliseconds(0)
		return starting
	}

	_timeElapse (date) {
		let current = Date()
		let seconds = (Date.parse(current) - Date.parse(date)) / 1000 // 计算出秒总秒数
		let days = Math.floor(seconds / (3600 * 24)) // 向下取整(因为js中，／是计算准确近似值的，不是取整运算)
		seconds = seconds % ( 3600 * 24 )
		let hours = Math.floor (seconds / 3600)
		if (hours < 10) {
			hours = '0' + hours
		}
		seconds = seconds % 3600
		let minutes = Math.floor(seconds / 60)
		if (minutes < 10) {
			minutes = '0' + minutes
		}
		seconds = seconds % 60
		if (seconds < 10) {
			seconds = '0' + seconds
		}
		return [days, hours, minutes, seconds] // shown times
	}

	componentDidMount () {
		this.interval = setInterval(() => {
			this.setState({
				shownTimes: this._timeElapse(this.starting)
			})
		}, 1000)
	}

	componentWillUnmount () {
    clearInterval(this.interval)
  }

	render () {
		return (
			<div>
				<span>{this.state.shownTimes[0]}</span> days &nbsp;
				<span>{this.state.shownTimes[1]}</span> hours &nbsp;
				<span>{this.state.shownTimes[2]}</span> minutes &nbsp;
				<span>{this.state.shownTimes[3]}</span> seconds &nbsp;
			</div>
		)
	}
}