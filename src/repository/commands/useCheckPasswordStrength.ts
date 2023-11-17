import { useMemo } from "react";

export enum PasswordChecks {
  HAS_NUMBER = "HAS_NUMBER",
  HAS_SPECIAL_CHAR = "HAS_SPECIAL_CHAR",
  HAS_UPPERCASE = "HAS_UPPERCASE",
  HAS_LOWERCASE = "HAS_LOWERCASE",
  IS_12_CHARS = "IS_12_CHARS",
}

export const PasswordChecksLabels = {
  [PasswordChecks.HAS_NUMBER]: "Password must contain at least one number",
  [PasswordChecks.HAS_UPPERCASE]: "Password must contain at least one uppercase letter",
  [PasswordChecks.HAS_LOWERCASE]: "Password must contain at least one lowercase letter",
  [PasswordChecks.HAS_SPECIAL_CHAR]: "Password must contain at least one special character",
  [PasswordChecks.IS_12_CHARS]: "Password must be at least 12 characters long",
};

const checks = [
  {
    name: PasswordChecks.HAS_NUMBER,
    regex: /\d+/,
  },
  {
    name: PasswordChecks.HAS_UPPERCASE,
    regex: /[A-Z]+/,
  },
  {
    name: PasswordChecks.HAS_LOWERCASE,
    regex: /[a-z]+/,
  },
  {
    name: PasswordChecks.HAS_SPECIAL_CHAR,
    regex: /\W+/,
  },
  {
    name: PasswordChecks.IS_12_CHARS,
    regex: /.{12,}/,
  },
];

export default function useCheckPasswordStrength(password: string) {
  const executedChecks = useMemo(() => (
    checks.map((check) => ({
      name: check.name,
      passed: check.regex.test(password),
    }))
  ), [password]);

  const failedChecks = executedChecks.filter((check) => !check.passed);

  const isStrong = failedChecks.length === 0;

  return {
    executedChecks,
    isStrong,
    failedChecks,
  };
}