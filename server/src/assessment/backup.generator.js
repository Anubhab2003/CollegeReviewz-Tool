// assessment/backup.generator.js

export const generateBackups = (signals) => {
  const backups = [];

  if (signals.ACADEMIC < 60)
    backups.push("Diploma or vocational programs");

  if (signals.RISK < 60)
    backups.push("Skill-based certifications");

  if (signals.FINANCE < 50)
    backups.push("Earn-while-you-learn programs");

  if (signals.DISCIPLINE < 60)
    backups.push("Short-term job-oriented courses");

  if (backups.length === 0)
    backups.push("General degree with internships");

  return backups;
};
