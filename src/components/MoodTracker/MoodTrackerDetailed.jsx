import { useDispatch, useSelector } from 'react-redux';
import {
  setEnergyLevel,
  setMoodLevel,
  setOverwhelmedLevel,
} from '../../reducers/mood';
import { getYesterdayDate, getRecentDays } from '../../helpers';
import { DashLine } from '../../assets/SVGElements';
import { EmptyState } from '../EmptyState';
import { WeekDots } from '../WeekDots';
import './MoodTrackerDetailed.css';

export const MoodTrackerDetailed = () => {
  const dispatch = useDispatch();
  const mood = useSelector(state => state.mood);
  const yesterdayDate = getYesterdayDate();

  const historical = useSelector(state => state.historical.historicalData);

  const dataYesterday = historical[yesterdayDate];

  const handleUpdateMoodLevel = moodLevel => {
    dispatch(setMoodLevel({ moodLevel }));
    dispatch({ type: 'SAVE_DATA' });
  };

  const handleUpdateEnergyLevel = energyLevel => {
    dispatch(setEnergyLevel({ energyLevel }));
    dispatch({ type: 'SAVE_DATA' });
  };

  const handleUpdateOverwhelmedLevel = overwhelmedLevel => {
    dispatch(setOverwhelmedLevel({ overwhelmedLevel }));
    dispatch({ type: 'SAVE_DATA' });
  };

  const historicalMoodData = Object.entries(historical).reduce(
    (acc, curr) => {
      acc.count += 1;
      const moodLevels = curr[1].mood;
      if (moodLevels != null) {
        acc.mood += parseInt(moodLevels.moodLevel);
        acc.energy += parseInt(moodLevels.energyLevel);
        acc.overwhelmed += parseInt(moodLevels.overwhelmedLevel);
      }
      return acc;
    },
    {
      mood: 0,
      energy: 0,
      overwhelmed: 0,
      count: 0,
    }
  );

  let generMood;
  let dataYesterdayMood;
  let dataYesterdayEnergy;
  let dataYesterdayOver;
  let totalYesMood;

  if (dataYesterday != null) {
    dataYesterdayMood = dataYesterday.mood.moodLevel;
    dataYesterdayEnergy = dataYesterday.mood.energyLevel;
    dataYesterdayOver = dataYesterday.mood.overwhelmedLevel;
    totalYesMood = dataYesterdayMood + dataYesterdayEnergy - dataYesterdayOver;

    if (totalYesMood === 4) {
      generMood = 'stable';
    } else if (totalYesMood > 4) {
      generMood = 'up';
    } else {
      generMood = 'down';
    }
  }

  let generMoodFive;
  let dataMoodFive;
  let dataEnergyFive;
  let dataOverFive;
  let totalMoodFive;

  if (historicalMoodData.count != 0) {
    dataMoodFive = Math.round(
      historicalMoodData.mood / historicalMoodData.count
    );
    dataEnergyFive = Math.round(
      historicalMoodData.energy / historicalMoodData.count
    );
    dataOverFive = Math.round(
      historicalMoodData.overwhelmed / historicalMoodData.count
    );
    totalMoodFive = dataMoodFive + dataEnergyFive - dataOverFive;

    if (totalMoodFive === 4) {
      generMoodFive = 'stable';
    } else if (totalMoodFive > 4) {
      generMoodFive = 'up';
    } else {
      generMoodFive = 'down';
    }
  }

  const withHistoricalData =
    dataYesterday != null && historicalMoodData.count != 0;

  // Build 7-day dot data — normalize composite mood score to 0-1
  // composite = mood + energy - overwhelmed, range: -3 to 9
  const recentDays = getRecentDays(historical);
  const weekDots = recentDays.map(day => {
    if (!day.data || !day.data.mood) return { dayLabel: day.dayLabel, value: 0 };
    const m = day.data.mood;
    const composite = parseInt(m.moodLevel) + parseInt(m.energyLevel) - parseInt(m.overwhelmedLevel);
    return {
      dayLabel: day.dayLabel,
      value: Math.max(0, Math.min(1, (composite + 3) / 12)),
      display: `mood ${m.moodLevel}, energy ${m.energyLevel}, stress ${m.overwhelmedLevel}`,
    };
  });

  return (
    <div className="main-wrapper">
      <div className="app-container">
        <header className="main-header">
          <div className="main-app-name">. MOOD</div>
        </header>
        <h2 className="secondary-header">How are you feeling today?</h2>
        <div className="today-tile-wrapper"></div>
        <div className="range-mood">
          <div className="range-mood-label">Mood Level: {mood.moodLevel}</div>
          <div className="range-slider-wrapper">
            <span className="range-emoji">low</span>
            <input
              type="range"
              className="custom-range"
              aria-label="mood level input"
              min={1}
              max={5}
              onChange={e => handleUpdateMoodLevel(e.target.value)}
              value={mood.moodLevel}
            />
            <span className="range-emoji">high</span>
          </div>
        </div>
        <div className="range-mood">
          <div className="range-mood-label">Energy Level: {mood.energyLevel}</div>
          <div className="range-slider-wrapper">
            <span className="range-emoji">low</span>
            <input
              type="range"
              className="custom-range"
              aria-label="energy level input"
              min={1}
              max={5}
              onChange={e => handleUpdateEnergyLevel(e.target.value)}
              value={mood.energyLevel}
            />
            <span className="range-emoji">high</span>
          </div>
        </div>
        <div className="range-mood">
          <div className="range-mood-label">Overwhelmed Level: {mood.overwhelmedLevel}</div>
          <div className="range-slider-wrapper">
            <span className="range-emoji">low</span>
            <input
              type="range"
              className="custom-range"
              aria-label="overwhelmed level input"
              min={1}
              max={5}
              onChange={e => handleUpdateOverwhelmedLevel(e.target.value)}
              value={mood.overwhelmedLevel}
            />
            <span className="range-emoji">high</span>
          </div>
        </div>
        {withHistoricalData ? (
          <>
            <WeekDots days={weekDots} label="Last 7 days" />
            <DashLine />
            <div className="mood-history">
              {dataYesterday != null && (
                <div className="mood-history-yesterday">
                  Yesterday&apos;s data:
                  <ul>
                    <li>general mood: {generMood}</li>
                    <li>mood: {dataYesterdayMood} / 5</li>
                    <li>energy: {dataYesterdayEnergy} / 5</li>
                    <li>overwhelmed: {dataYesterdayOver} / 5</li>
                  </ul>
                </div>
              )}
              {historicalMoodData.count != 0 && (
                <div className="mood-history-overall">
                  Overall data:
                  <ul>
                    <li>general mood: {generMoodFive}</li>
                    <li>mood: {dataMoodFive} / 5</li>
                    <li>energy: {dataEnergyFive} / 5</li>
                    <li>overwhelmed: {dataOverFive} / 5</li>
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <EmptyState message="Track your mood daily — your patterns and trends will appear here." />
        )}
      </div>
    </div>
  );
};
