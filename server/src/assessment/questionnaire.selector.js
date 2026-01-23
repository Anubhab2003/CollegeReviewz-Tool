import class9 from "./questionnaires/class9.js";
import class10 from "./questionnaires/class10.js";
import class11 from "./questionnaires/class11.js";
import class12 from "./questionnaires/class12.js";

export const selectQuestionnaire = (currentClass) => {
  switch (currentClass) {
    case "Class 9":
      return class9;

    case "Class 10":
      return class10;

    case "Class 11":
      return class11;

    case "Class 12":
      return class12;

    default:
      return class11; // safe academic default
  }
};
