export const round = (n, dc) => {
  const d = Math.pow(10, dc);
  return Math.round((n + Number.EPSILON) * d) / d;
};

export const isEmail = (email) => {
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
  if (email.match(mailFormat)) {
    return true;
  } else {
    return false;
  }
};

export const checkPassword = (password) => {
  const passwordFormat =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if (password.match(passwordFormat)) {
    return true;
  } else {
    return false;
  }
};

export const isNotEmpty = (value) => {
  if (value.length === 0) {
    return false;
  } else {
    return true;
  }
};

export const matchTwoValues = (value1, value2) => {
  if (value1 === value2) {
    return true;
  } else {
    return false;
  }
};

export const formatCurrency = (number, currency, type = undefined) => {
  const CURRENCY_FORMATTER = new Intl.NumberFormat(type, {
    currency,
    style: 'currency'
  });
  return CURRENCY_FORMATTER.format(number);
};

export const formatNumber = (number, type = undefined) => {
  const NUMBER_FORMATTER = new Intl.NumberFormat(type);
  return NUMBER_FORMATTER.format(number);
};

export const formatCompactNumber = (number, type = undefined) => {
  const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat(type, {
    notation: 'compact'
  });
  return COMPACT_NUMBER_FORMATTER.format(number);
};

export const formatRelativeDate = (toDate, fromDate = new Date()) => {
  const DIVISIONS = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
    { amount: 4.34524, name: 'weeks' },
    { amount: 12, name: 'months' },
    { amount: Number.POSITIVE_INFINITY, name: 'years' }
  ];

  const RELATIVE_DATE_FORMATTER = new Intl.RelativeTimeFormat(undefined, {
    numeric: 'auto'
  });

  let duration = (toDate - fromDate) / 1000;

  for (let i = 0; i <= DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return RELATIVE_DATE_FORMATTER.format(
        Math.round(duration),
        division.name
      );
    }
    duration /= division.amount;
  }
};
