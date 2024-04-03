export function stringToHandle(inputString) {
  // Convert the input string to lowercase
  const lowercaseString = inputString.toLowerCase();

  // Replace spaces with dashes
  return lowercaseString.replace(/ /g, "-");
}
export const removePhraseFromTitle = (title, phraseToRemove) => {
  if (!title || typeof title !== "string") {
    throw new Error("Title must be a valid string");
  }

  if (!phraseToRemove || typeof phraseToRemove !== "string") {
    throw new Error("Phrase to remove must be a valid string");
  }

  const lowercaseTitle = title.toLowerCase();
  const lowercasePhraseToRemove = phraseToRemove.toLowerCase();

  // Replace the lowercase phrase with an empty string
  const result = lowercaseTitle.replace(lowercasePhraseToRemove, "").trim();

  // Convert the result back to the original title's case
  return result;
};

export const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
