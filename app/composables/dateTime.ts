export const toNaturalDateTime = (date: string) => {
  const dateObject = new Date(date)
  return Intl.DateTimeFormat('CS-CZ', {dateStyle: 'medium', timeStyle: 'short'}).format(dateObject)
}
