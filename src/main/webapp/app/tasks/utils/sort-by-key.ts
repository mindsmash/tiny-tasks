// Errors.
const ERROR_REQUIRES_AT_LEAST_ONE_KEY = 'provide at least one key to sort by';
const ERROR_KEY_LENGTH_INVALID = 'a key was provided as an empty string';
const ERROR_DESC_KEY_LENGTH_INVALID = 'a descending key was missing the key name';
const ERROR_OBJECT_DOESNT_CONTAIN_KEY = 'a key you are attempting to sort by is not on all objects';

/**
 *  Recursive function to sort values by their keys.
 */
const sortByKey = <T>(a: T, b: T, ...keys: string[]): number => {
    // Get first key in array.
    let key = keys.shift();

    // Make sure we have a valid key name.
    if (!key.length) {
        throw new Error(ERROR_KEY_LENGTH_INVALID);
    }

    // Default to ascending order.
    let desc = false;

    // Check for descending sort.
    if (key.charAt(0) === '-') {
        // Make sure key has a name as well as the minus sign.
        if (key.length < 2) {
            throw new Error(ERROR_DESC_KEY_LENGTH_INVALID);
        }

        // Remove minus from key name.
        key = key.substr(1);

        // Flag as descending order.
        desc = true;
    }

    // Make sure the objects both have the key. We make sure
    // to check this after we have removed the minus sign.
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        throw new Error(ERROR_OBJECT_DOESNT_CONTAIN_KEY);
    }

    // Determine checks based on asc / desc.
    const direction = (desc) ? -1 : 1;

    // Perform bubble sort based on the values.
    if (a[key] > b[key]) {
        return 1 * direction;
    }
    if (a[key] < b[key]) {
        return -1 * direction;
    }

    // Special case just for checkboxes
    if(key == "checked"){
        return a[key] == false ? 1 : -1;
    }

    // The values of the current key are equal, so if we still
    // have keys to check recursively, check the next key.
    if (keys.length) {
        return sortByKey(a, b, ...keys);
    }

    // All keys returned and no more sorting needed.
    return 0;
};

/**
 * Wrapper sort function for the recursive one.
 */
export const sortByKeys = <T>(data: T[], ...keys: string[]): T[] => {
    // Make sure we have at least one key to sort by.
    if (!keys.length) {
        throw new Error(ERROR_REQUIRES_AT_LEAST_ONE_KEY);
    }

    // Sort data.
    data.sort((a: T, b: T): number => {
        return sortByKey(a, b, ...keys);
    });

    // Return sorted data.
    return data;
};