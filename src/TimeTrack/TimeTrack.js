import React from 'react'
import './TimeTrack.css'

const TimeTrack = (props) => {

  const timeElapsed = (hours) => {
    const HOURS_IN_DAY = 8
    const DAYS_IN_WEEK = 5
    const WEEKS_IN_MONTH = 4
    const MONTHS_IN_YEAR = 12
    const timeElapsedObject = {
      hours: 0,
      days: 0,
      weeks: 0,
      months: 0,
      years: 0
    }

    if (hours < HOURS_IN_DAY) {
      timeElapsedObject.hours = hours
      return timeElapsedObject
    }

    const days = Math.floor(hours / HOURS_IN_DAY)
    const restHours = (hours - (days * HOURS_IN_DAY))
    if (days < DAYS_IN_WEEK) {
      timeElapsedObject.hours = restHours
      timeElapsedObject.days = days
      return timeElapsedObject
    }

    const weeks = Math.floor(days / DAYS_IN_WEEK)
    const restDays = (days - (weeks * DAYS_IN_WEEK))
    if (weeks < WEEKS_IN_MONTH) {
      timeElapsedObject.hours = restHours
      timeElapsedObject.days = restDays
      timeElapsedObject.weeks = weeks
      return timeElapsedObject
    }

    const months = Math.floor(weeks / WEEKS_IN_MONTH)
    const restWeeks = (weeks - (months * WEEKS_IN_MONTH))
    if (months < MONTHS_IN_YEAR) {
      timeElapsedObject.hours = restHours
      timeElapsedObject.days = restDays
      timeElapsedObject.weeks = restWeeks
      timeElapsedObject.months = months
      return timeElapsedObject
    }

    const years = Math.floor(months / MONTHS_IN_YEAR)
    const restMonths = (months - (years * MONTHS_IN_YEAR))
    timeElapsedObject.hours = restHours
    timeElapsedObject.days = restDays
    timeElapsedObject.weeks = restWeeks
    timeElapsedObject.months = restMonths
    timeElapsedObject.years = years
    return timeElapsedObject
  }

  const timeElapsedObject = timeElapsed(props.hours)

  return (
    <div className="TimeTrack">
      <div className="timetrack-grid">
        <span>
          <span>Year:</span><span>{timeElapsedObject.years + 1}</span>
        </span>
        <span>
          <span>Month:</span><span>{timeElapsedObject.months + 1}</span>
        </span>
        <span>
          <span>Week:</span><span>{timeElapsedObject.weeks + 1}</span>
        </span>
        <span>
          <span>Day:</span><span>{timeElapsedObject.days + 1}</span>
        </span>
        <span>
          <span>Hour:</span><span>{timeElapsedObject.hours + 1}</span>
        </span>
      </div>
      <hr />
      <button onClick={props.pauseToggleHandler}>
        {props.paused ? 'Resume' : 'Pause'}
      </button>
    </div>
  )
}

export default TimeTrack
