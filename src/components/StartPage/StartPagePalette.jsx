import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateColorPaletteWithoutLocalStorage } from '../../reducers/settings';
import { StepDots } from './StepDots';
import './Start.css';

const PALETTES = [
  {
    id: 'dark',
    label: 'Dark',
    colors: ['#000000', '#1C1D1F', '#4a4d53'],
  },
  {
    id: 'light',
    label: 'Light',
    colors: ['#4a4d53', '#E7E9E8', '#F0F2F1'],
  },
  {
    id: 'teal',
    label: 'Teal',
    colors: ['#181C21', '#019399', '#1ECFD6'],
  },
  {
    id: 'earth',
    label: 'Earth',
    colors: ['#332929', '#755555', '#D28787'],
  },
];

export const StartPagePalette = ({ name, page, setPage }) => {
  const dispatch = useDispatch();
  const settingsState = useSelector(state => state.settings);

  const handleSelect = paletteId => {
    dispatch(
      updateColorPaletteWithoutLocalStorage({ colorPalette: paletteId })
    );
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return (
    <div className="start-page">
      <StepDots currentStep={1} />
      <header className="main-header">
        <div className="main-app-name">Hey, {name}!</div>
      </header>
      <h1 className="secondary-header">Pick a color palette</h1>

      <div className="start-page-input-wrapper">
        <div className="palette-swatches">
          {PALETTES.map(palette => (
            <button
              key={palette.id}
              className={`palette-swatch${settingsState.colorPalette === palette.id ? ' selected' : ''}`}
              onClick={() => handleSelect(palette.id)}
              aria-label={`${palette.label} color palette`}
              type="button"
            >
              <div className="palette-swatch-preview">
                {palette.colors.map((color, i) => (
                  <span key={i} style={{ backgroundColor: color }} />
                ))}
              </div>
              <span className="palette-swatch-label">{palette.label}</span>
            </button>
          ))}
        </div>

        <div className="start-page-button">
          <button className="app-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

StartPagePalette.propTypes = {
  name: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
