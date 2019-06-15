import React from 'react'
import './TimeTrack.css'

const TimeTrack = (props) => {

  const timeElapsed = (hours) => {
    const HOURS_IN_DAY = 8
    const DAYS_IN_WEEK = 5
    const WEEKS_IN_MONTH = 4
    const MONTHS_IN_YEAR = 12

    if (hours < HOURS_IN_DAY) {
      return hours + ' hours'
    }

    const days = Math.floor(hours / HOURS_IN_DAY)
    const restHours = (hours - (days * HOURS_IN_DAY))
    if (days < DAYS_IN_WEEK) {
      return days + ' days, ' + restHours + ' hours'
    }

    const weeks = Math.floor(days / DAYS_IN_WEEK)
    const restDays = (days - (weeks * DAYS_IN_WEEK))
    if (weeks < WEEKS_IN_MONTH) {
      return weeks + ' weeks, ' + restDays + ' days, ' + restHours + ' hours'
    }

    const months = Math.floor(weeks / WEEKS_IN_MONTH)
    const restWeeks = (weeks - (months * WEEKS_IN_MONTH))
    if (months < MONTHS_IN_YEAR) {
      return months + ' months, ' + restWeeks + ' weeks, ' + restDays + ' days, ' + restHours + ' hours'
    }

    const years = Math.floor(months / MONTHS_IN_YEAR)
    const restMonths = (months - (years * MONTHS_IN_YEAR))
    return years + ' years, ' + restMonths + ' months, ' + restWeeks + ' weeks, ' + restDays + ' days, ' + restHours + ' hours'
  }

  return (
    <div>
      Time elapsed: {timeElapsed(props.hours)}
      <button onClick={props.pauseToggleHandler}>
        {props.paused ? 'Resume' : 'Pause'}
      </button>
    </div>
  )
}

export default TimeTrack
