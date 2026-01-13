const Questionnaire = ({ question, answer, onSelect }) => {
  return (
    <div style={{ marginBottom: 25 }}>
      <p><strong>{question.id}. {question.text}</strong></p>

      {question.options.map((opt, idx) => {
        const label =
          typeof opt === "string" ? opt : opt.label;

        return (
          <label key={idx} style={{ display: "block" }}>
            <input
              type="radio"
              checked={answer === idx}
              onChange={() => onSelect(idx)}
            />
            {" "}{label}
          </label>
        );
      })}
    </div>
  );
};

export default Questionnaire;
