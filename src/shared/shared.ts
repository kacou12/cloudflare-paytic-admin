// Define a generic interface for the structure of the enum values
interface EnumValue {
  name: string;
  color: string;
  textColor: string;
  enumName: string; // This is the property we'll compare against the searchName
}

// Define a generic type for the enum object itself
// It's an object where keys are strings and values are of type EnumValue
type GenericDataEnum = {
  [key: string]: EnumValue;
};

/**
 * Dynamically finds a key in a given data enum based on a normalized search name.
 * The function performs a case-insensitive and accent-insensitive comparison.
 *
 * @param searchName The name to search for (e.g., 'En attente').
 * @param dataEnum The enum object to search within (e.g., RequestStatusEnum).
 * @returns The key of the matching enum entry (e.g., 'ATTEMPT') or null if not found.
 */
export const  findEnumDataByName =(searchName: string, dataEnum: GenericDataEnum): string | null  =>{
  if (!searchName) {
    return null;
  }

  // Normalize the search text (lowercase, no accents)
  const normalizedSearch = searchName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Iterate over the entries (key-value pairs) of the provided dataEnum
  for (const [key, value] of Object.entries(dataEnum)) {
    // Ensure the value has the 'name' property before proceeding
    if (value && typeof value.enumName === 'string') {
      // Normalize the name from the enum entry for case-insensitive and accent-insensitive comparison
      const normalizedName = value.enumName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      if (normalizedName === normalizedSearch) {
        return key; // Return the key (e.g., 'ATTEMPT') if a match is found
      }
    }
  }

  return null; // Return null if no matching entry is found
}
