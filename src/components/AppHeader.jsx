export function AppHeader({
  preferences,
  translations,
  onChangeLanguage,
  onChangeWeightUnit,
}) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">{translations.header.eyebrow}</p>
        <h1>{translations.header.title}</h1>
      </div>

      <div className="preference-controls">
        <label className="preference-control">
          <span>{translations.header.language}</span>
          <select
            value={preferences.language}
            onChange={(event) => onChangeLanguage(event.target.value)}
          >
            <option value="en">{translations.header.english}</option>
            <option value="id">{translations.header.indonesia}</option>
          </select>
        </label>

        <label className="preference-control">
          <span>{translations.header.weightUnit}</span>
          <select
            value={preferences.weightUnit}
            onChange={(event) => onChangeWeightUnit(event.target.value)}
          >
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
        </label>
      </div>
    </header>
  );
}
