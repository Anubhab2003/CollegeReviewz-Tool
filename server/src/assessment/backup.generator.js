/**
 * Generates backup career paths if primary paths are risky or blocked
 */
export const generateBackupPaths = (careerResults) => {
    const backups = [];
  
    for (const career of careerResults) {
      if (career.tier === "GREEN") {
        // Primary career found → generate soft backups
        if (career.name.includes("MBBS")) {
          backups.push(
            "BSc Biology",
            "Paramedical Sciences",
            "Lab Technician"
          );
        }
  
        if (career.name.includes("Engineering")) {
          backups.push(
            "BSc Computer Science",
            "Diploma in Engineering",
            "IT Skill Certification"
          );
        }
      }
  
      if (career.tier === "YELLOW") {
        backups.push("General Degree + Skill Path");
      }
    }
  
    // Remove duplicates
    return [...new Set(backups)];
  };
  